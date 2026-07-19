export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business_name, email, industry, enquiries_per_week } = req.body;

  if (!name || !business_name || !email || !industry || !enquiries_per_week) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  // 1. Save to Supabase
  try {
    const dbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, business_name, email, industry, enquiries_per_week }),
    });

    if (!dbRes.ok) {
      const err = await dbRes.text();
      console.error('Supabase error:', err);
      return res.status(500).json({ error: 'Failed to save application' });
    }
  } catch (err) {
    console.error('Supabase error:', err);
    return res.status(500).json({ error: err.message });
  }

  // 2. Send confirmation email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Halo <onboarding@resend.dev>',
          to: email,
          subject: 'Your Halo early access application',
          html: `
            <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#333;">
              <div style="margin-bottom:32px;">
                <span style="font-size:22px;font-weight:600;color:#111;">halo</span>
              </div>
              <h1 style="font-size:24px;font-weight:600;color:#111;margin-bottom:12px;">Application received.</h1>
              <p style="font-size:15px;line-height:1.7;color:#555;margin-bottom:24px;">
                Hi ${name},
              </p>
              <p style="font-size:15px;line-height:1.7;color:#555;margin-bottom:24px;">
                Thanks for applying for early access to Halo. We've received your application for <strong>${business_name}</strong> and will review it within 2–3 business days.
              </p>
              <p style="font-size:15px;line-height:1.7;color:#555;margin-bottom:24px;">
                If you're a good fit, we'll be in touch to arrange a short call and walk you through getting started.
              </p>
              <p style="font-size:15px;line-height:1.7;color:#555;margin-bottom:32px;">
                In the meantime, feel free to explore the demo on the Halo website.
              </p>
              <div style="border-top:1px solid #eee;padding-top:24px;font-size:13px;color:#999;">
                The Halo team<br/>
                <a href="https://halo-app-v1.vercel.app" style="color:#E8945A;text-decoration:none;">halo-app-v1.vercel.app</a>
              </div>
            </div>
          `,
        }),
      });
    } catch (err) {
      // Email failure shouldn't block the success response
      console.error('Resend error:', err);
    }
  }

  return res.status(200).json({ success: true });
}

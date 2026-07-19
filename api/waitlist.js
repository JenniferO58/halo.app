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

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, business_name, email, industry, enquiries_per_week }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase error:', err);
      return res.status(500).json({ error: 'Failed to save application' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return res.status(500).json({ error: err.message });
  }
}

import { useState, useEffect, useRef, useContext, createContext } from "react";
import { Bot, Zap, MessageSquare, Layers, ArrowRight, Check, ChevronDown, Sun, Moon, Search, Bell, Send, Play, LayoutDashboard, Settings, MoreHorizontal, Copy, RefreshCw, AlertCircle, X, Eye, EyeOff, Menu, Plus, Calendar } from "lucide-react";

const useW = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const fn = () => setW(window.innerWidth); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);
  return w;
};
const useFade = () => {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return [ref, vis];
};

const DARK = { isDark:true, page:"#0A0A0A", nav:"rgba(10,10,10,0.92)", surface:"#111", raised:"#171717", input:"#161616", border:"#1F1F1F", borderH:"#2A2A2A", text:"#EDEDED", sub:"#777", muted:"#444", accent:"#E8945A", accentBg:"rgba(232,148,90,0.1)", accentBd:"rgba(232,148,90,0.22)", green:"#4ADE80", greenBg:"rgba(74,222,128,0.08)", yellow:"#FBBF24", yellowBg:"rgba(251,191,36,0.08)", red:"#F87171", redBg:"rgba(248,113,113,0.08)", blue:"#60A5FA", blueBg:"rgba(96,165,250,0.08)", purple:"#A78BFA", purpleBg:"rgba(167,139,250,0.08)", grid:"rgba(255,255,255,0.035)", sbBg:"#0A0A0A", sbBd:"#161616" };
const LIGHT = { isDark:false, page:"#FAFAFA", nav:"rgba(250,250,250,0.92)", surface:"#FFF", raised:"#F5F5F5", input:"#F2F2F2", border:"#E8E8E8", borderH:"#C8C8C8", text:"#111", sub:"#666", muted:"#AAA", accent:"#C4723A", accentBg:"rgba(196,114,58,0.08)", accentBd:"rgba(196,114,58,0.22)", green:"#16A34A", greenBg:"rgba(22,163,74,0.08)", yellow:"#D97706", yellowBg:"rgba(217,119,6,0.08)", red:"#DC2626", redBg:"rgba(220,38,38,0.08)", blue:"#2563EB", blueBg:"rgba(37,99,235,0.08)", purple:"#7C3AED", purpleBg:"rgba(124,58,237,0.08)", grid:"rgba(0,0,0,0.035)", sbBg:"#111", sbBd:"#1A1A1A" };
const Ctx = createContext(DARK);
const T_ = () => useContext(Ctx);
const scrollTo = id => { const c = document.querySelector("[data-scroll]"); const el = document.getElementById(id); if (c && el) c.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }); };

const EVENTS0 = [
  { id:1, ch:"whatsapp", name:"Sarah Mitchell", av:"SM", elapsed:"2m",  intent:"BOOKING",   urgency:"MEDIUM", status:"AUTO",      conf:96, preview:"Any slots Friday for a cut and colour?", msg:"Hi, do you have availability this Friday for a cut and colour?", reply:"Hi Sarah! We have Friday at 2pm or 4pm. Which suits you?", action:"CREATE_BOOKING", summary:"Booking Friday Cut and Colour", data:{ Service:"Cut and Colour", Day:"Friday" } },
  { id:2, ch:"email",    name:"James Okafor",   av:"JK", elapsed:"14m", intent:"INVOICE",   urgency:"MEDIUM", status:"AUTO",      conf:99, preview:"Please send an invoice for last Tuesday.", msg:"Hi, please could you send an invoice for last Tuesday's deep tissue massage?", reply:"Hi James! Of course, your invoice is on its way now.", action:"CREATE_INVOICE", summary:"Invoice Deep Tissue Massage", data:{ Service:"Deep Tissue", Date:"Tue 8 Apr" } },
  { id:3, ch:"instagram",name:"@glowupldn",     av:"GL", elapsed:"32m", intent:"ENQUIRY",   urgency:"LOW",    status:"AUTO",      conf:91, preview:"Do you do lash lifts? How much?", msg:"Do you do lash lifts? How much?", reply:"Hey! Yes we do. Lash lifts are £45 and take about 45 mins. Want me to check availability?", action:"REPLY", summary:"Instagram DM lash lift pricing", data:{} },
  { id:4, ch:"whatsapp", name:"Luke Morrison",  av:"LM", elapsed:"2h",  intent:"COMPLAINT", urgency:"HIGH",   status:"ESCALATED", conf:38, preview:"I want a refund. Been waiting 3 days.", msg:"I want to cancel my appointment and I want a full refund. Been waiting 3 days for a response and this is unacceptable.", reply:null, action:"ESCALATE", summary:"Refund request — 3 day delay", data:{} },
];
const CH = { whatsapp:{icon:"WA",label:"WhatsApp"}, email:{icon:"EM",label:"Email"}, web:{icon:"WB",label:"Web"}, telegram:{icon:"TG",label:"Telegram"}, instagram:{icon:"IG",label:"Instagram"}, form:{icon:"FM",label:"Form"} };
const INTG = [
  { name:"WhatsApp Business",      icon:"WA", ck:"green",  live:true,  detail:"+44 7700 900 123",      desc:"Receive and classify inbound customer messages via Meta Cloud API." },
  { name:"WhatsApp Notifications", icon:"WN", ck:"green",  live:true,  detail:"Connected to your number", desc:"Halo notifies you on WhatsApp when a message needs your approval." },
  { name:"Instagram DMs",          icon:"IG", ck:"purple", live:true,  detail:"@yourbusiness",           desc:"Respond to Instagram Direct Messages automatically." },
  { name:"Gmail",                  icon:"GM", ck:"blue",   live:true,  detail:"hello@yourbusiness.com",  desc:"Read and classify inbound emails automatically." },
  { name:"Web Form",               icon:"WF", ck:"green",  live:true,  detail:"form.yourbusiness.com",   desc:"Get notified instantly when someone fills out a contact form." },
  { name:"Web Widget",             icon:"WW", ck:"accent", live:true,  detail:"Active on site",           desc:"Embeddable AI chat widget. Halo handles enquiries 24/7." },
  { name:"Google Calendar",        icon:"GC", ck:"red",    live:true,  detail:"jennifer@gmail.com",       desc:"Two-way booking sync. Confirmed appointments land in your calendar." },
  { name:"Telegram Bot",           icon:"TB", ck:"blue",   live:false, desc:"Optional: receive owner notifications via Telegram.", optional:true },
];
const NAV = [
  { label:"Features", page:"features", id:"features-top" },
  { label:"Demo",     page:"demo",     id:"top" },
  { label:"Pricing",  page:"pricing",  id:"top" },
];
const PRICING = [
  {
    name:"Starter", tag:"Your First AI Employee", mo:29, yr:23, pop:false,
    bestFor:"Solo business owners who want to stop spending evenings replying to customers.",
    saves:"Around 5–8 hours per week.",
    desc:"One AI employee, ready from day one. No setup fees, no technical knowledge needed.",
    features:[
      "14-day free trial — no credit card required",
      "300 AI Events per month",
      "WhatsApp Business integration",
      "Email integration",
      "AI message drafting",
      "Automatic enquiry classification",
      "Confidence-based automation",
      "One-tap approval via WhatsApp",
      "Business tone and FAQ setup",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name:"Growth", tag:"Your AI Office Manager", mo:69, yr:55, pop:true,
    bestFor:"Businesses receiving enquiries every day who want the complete automation experience.",
    saves:"Around 8–12 hours per week.",
    desc:"Everything in Starter, plus the tools growing businesses need to run on autopilot.",
    features:[
      "Everything in Starter",
      "Unlimited AI Events",
      "Instagram integration",
      "Website chat integration",
      "Google Calendar sync",
      "Automatic appointment booking",
      "Invoice generation",
      "Payment reminders",
      "Halo Memory",
      "AI Assistant",
      "Custom business reports",
      "Review request automation",
      "Priority support",
      "3 workspaces",
    ],
  },
  {
    name:"Agency", tag:"Scale Every Client", mo:null, yr:null, pop:false,
    bestFor:"Agencies, consultants, and businesses managing multiple locations or clients.",
    saves:"Hours across every client account while standardising operations.",
    desc:"Everything in Growth, built for teams managing multiple businesses from one place.",
    features:[
      "Everything in Growth",
      "Unlimited workspaces",
      "White-label platform",
      "Team permissions",
      "Shared reporting dashboard",
      "Client management",
      "Dedicated onboarding",
      "API access (coming soon)",
      "Dedicated account manager",
    ],
  },
];
const FAQS = [
  { q:"What if Halo gets something wrong?", a:"Halo uses a confidence score on every message. At 80% confidence or above, it acts automatically — no input needed from you. Between 50 and 79%, it sends you a one-tap WhatsApp approval before anything goes out. Below 50%, it escalates directly to you. The vast majority of messages are handled automatically. You only hear from Halo when it genuinely needs you — and every decision is logged so you can always see exactly why Halo acted the way it did." },
  { q:"What is Halo Memory?", a:"Halo Memory is how your AI employee learns your business. It stores your tone of voice, pricing, services, FAQs, cancellation policies, customer history, and preferences — so every reply it writes sounds like you wrote it, not a generic bot. The more you use Halo, the better it gets at representing your business." },
  { q:"Does Halo send invoices automatically?", a:"Yes. When a customer requests an invoice, Halo generates it from your service list and pricing and sends it automatically. You stay in the loop through your business reports. For higher-value invoices, you can set an approval threshold — anything above it (say £500) will come to you for a one-tap review before it sends. You decide where that line is, and you can change it any time in settings." },
  { q:"What are Business Reports?", a:"Halo sends you a regular summary of everything it has handled — bookings taken, invoices sent, enquiries resolved, complaints escalated, and hours saved. You choose the cadence: daily, every two days, weekly, fortnightly, or monthly. Reports arrive via WhatsApp or email, whichever you prefer." },
  { q:"What type of businesses is Halo built for?", a:"Any UK service business that deals with customer messages — enquiries, bookings, invoices, and complaints. Halo is used by hair and beauty studios, personal trainers, wellness clinics, tradespeople, tutors, photographers, dog groomers, and many others. If your day involves taking appointments or sending invoices, Halo can handle the communication layer." },
  { q:"Does Halo work with WhatsApp Business?", a:"Yes. Halo connects directly to WhatsApp Business via the Meta Cloud API. Once connected, all incoming messages are classified and handled automatically. Setup takes about 5 minutes." },
  { q:"What happens after my 14-day trial?", a:"You will be asked to choose a plan. If you do not, your account pauses — no charges, no data deleted. You can reactivate any time. We do not do surprise billing." },
  { q:"Can I customise how Halo responds?", a:"Absolutely. Halo Memory stores your exact tone of voice, service descriptions, pricing, policies, and preferences. Your AI employee replies the way you would reply — not with generic AI text. You can also set which types of messages auto-handle and which come to you for approval." },
  { q:"Is my customers' data secure?", a:"All data is encrypted in transit and at rest. Halo is GDPR compliant. Customer messages are processed to generate responses and are never used to train AI models. You can export or delete all data at any time." },
  { q:"How long does setup take?", a:"Most businesses are live in under 10 minutes. Connect your first channel, add your services and pricing to Halo Memory, and your AI employee starts responding. There is nothing to install and no technical knowledge required." },
];
const TESTIMONIALS = [
  { name:"Sophie Adeyemi", role:"Owner, Lumi Hair Studio, London", quote:"I used to spend 45 minutes every morning going through WhatsApps and emails. Halo now handles 80% of it automatically. My first booking came through at 6am while I was asleep.", av:"SA" },
  { name:"Marcus Webb", role:"Personal Trainer, Manchester", quote:"The WhatsApp notifications are what got me. I approve a reply in one tap between sets and it is done. Clients think I am incredibly responsive. They have no idea it is Halo.", av:"MW" },
  { name:"Dr. Priya Nair", role:"Founder, Clarity Wellness Clinic, Birmingham", quote:"We handle 200+ enquiries a week. Before Halo we had a part-time admin. Now it is just me and Halo, and the response quality is better than it has ever been.", av:"PN" },
];
const COMPARISON = [
  { f:"Responds to enquiries",    manual:"You, manually",  bot:"Basic auto-reply",  halo:"In your tone, in context" },
  { f:"Books appointments",       manual:"You, manually",  bot:"No",                halo:"With calendar sync" },
  { f:"Creates invoices",         manual:"You, manually",  bot:"No",                halo:"Automatically" },
  { f:"Confidence-based routing", manual:"No",             bot:"No",                halo:"80%+ auto · edge cases to you · <50% escalate" },
  { f:"Remembers your business",  manual:"Just you",       bot:"No",                halo:"Halo Memory — always learning" },
  { f:"Sends business reports",   manual:"Never",          bot:"No",                halo:"Daily, weekly, or monthly" },
  { f:"Notifications to owner",   manual:"Every message",  bot:"No",                halo:"Only when it matters" },
];
const getIC = (T, i) => ({ BOOKING:{text:T.blue,bg:T.blueBg}, ENQUIRY:{text:T.accent,bg:T.accentBg}, INVOICE:{text:T.purple,bg:T.purpleBg}, COMPLAINT:{text:T.red,bg:T.redBg}, GENERAL:{text:T.sub,bg:T.raised} }[i] || {text:T.sub,bg:T.raised});
const getSC = (T, s) => ({ PENDING:{text:T.yellow,bg:T.yellowBg,label:"Needs approval"}, AUTO:{text:T.green,bg:T.greenBg,label:"Auto-handled"}, ESCALATED:{text:T.red,bg:T.redBg,label:"Escalated"}, DONE:{text:T.accent,bg:T.accentBg,label:"Sent"}, DISMISSED:{text:T.muted,bg:T.raised,label:"Dismissed"} }[s] || {text:T.muted,bg:T.raised,label:s});
const ACTION_LABELS = { REPLY:"Send Reply", CREATE_BOOKING:"Create Booking", CREATE_INVOICE:"Create Invoice", ESCALATE:"Escalate" };
const INVOICE_PROMPT = "You are a billing assistant. Return ONLY valid JSON (no markdown): {invoiceNumber,date,dueDate,lineItems:[{description,quantity,unitPrice,total}],subtotal,tax,total}. Realistic UK service pricing.";
const CLF_SYS = "Return ONLY valid JSON, no markdown, no backticks. Fields: intent (BOOKING|ENQUIRY|INVOICE|COMPLAINT|GENERAL), confidence (0-100), urgency (LOW|MEDIUM|HIGH), summary (string), suggestedReply (string), suggestedAction (REPLY|CREATE_BOOKING|CREATE_INVOICE|ESCALATE).";
const AI_SYS = "You are Halo, an AI employee for small UK service businesses. You write in the business's own tone using their services, pricing, policies, and customer history stored in Halo Memory. Help with customer communications, bookings, invoices, pricing, complaints, and business strategy. Be concise, warm, and practical. Keep responses under 120 words.";


const callAI = async (body) => {
  // Try proxy first (Vercel deployment)
  try {
    const r = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    if (r.ok) return r.json();
  } catch(e) {}
  // Fall back to direct API (Claude artifacts)
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(body)
  });
  return r.json();
};

const FadeIn = ({ children, delay = 0, y = 22 }) => {
  const [ref, vis] = useFade();
  return <div ref={ref} style={{ opacity:vis?1:0, transform:vis?`translateY(0)`:`translateY(${y}px)`, transition:`opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>{children}</div>;
};
const Dot = ({ color }) => <span style={{ width:6, height:6, borderRadius:"50%", background:color, display:"inline-block", flexShrink:0 }}/>;
const Chip = ({ label, color, bg }) => <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:4, color, background:bg, whiteSpace:"nowrap", display:"inline-block" }}>{label}</span>;
const ThemeBtn = ({ isDark, onToggle }) => {
  const T = T_(); const [h, setH] = useState(false);
  return <button onClick={onToggle} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ width:36, height:36, borderRadius:8, border:`1px solid ${h?T.borderH:T.border}`, background:h?T.raised:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:h?T.text:T.sub, transition:"all 0.15s", flexShrink:0 }}>{isDark ? <Sun size={14}/> : <Moon size={14}/>}</button>;
};

const AnnouncementBar = ({ onSignup }) => {
  const T = T_(); const [vis, setVis] = useState(true);
  if (!vis) return null;
  const businesses = ["hair studios", "personal trainers", "wellness clinics", "tradespeople", "tutors"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1) % businesses.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background:T.isDark?"#1A0F07":"#FEF3DC", borderBottom:`1px solid ${T.accentBd}`, padding:"9px 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:10, position:"relative" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:T.accent }} className="halo-pulse"/>
        <span style={{ fontSize:12, color:T.isDark?"#E8C4A0":"#92400E", fontWeight:500 }}>
          Now trusted by 200+ UK service businesses —{" "}
          <span style={{ color:T.accent, fontWeight:600 }}>{businesses[idx]}</span>
          {" "}and more. Your AI employee is ready in under 10 minutes.
        </span>
      </div>
      <button onClick={onSignup} style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:12, fontWeight:600, color:T.accent, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", textDecoration:"underline", textUnderlineOffset:2, whiteSpace:"nowrap" }}>
        Claim yours <ArrowRight size={11}/>
      </button>
      <button onClick={() => setVis(false)} style={{ position:"absolute", right:14, background:"none", border:"none", cursor:"pointer", color:T.muted }}><X size={13}/></button>
    </div>
  );
};

const SiteNav = ({ isDark, onToggle, onSignin, onSignup, screen, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = document.querySelector("[data-scroll]");
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);
  const blur = scrolled || open;
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:blur?T.nav:"transparent", backdropFilter:blur?"blur(16px)":"none", borderBottom:`1px solid ${blur?T.border:"transparent"}`, transition:"all 0.3s" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:`0 ${mob?18:28}px`, height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }} onClick={() => onNav({ page:"website", id:"top" })}>
          <div style={{ width:28, height:28, borderRadius:7, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={15} color="#000" strokeWidth={2.5}/></div>
          <span style={{ fontSize:18, fontWeight:600, color:T.text, fontFamily:"DM Serif Display,serif", letterSpacing:"-0.01em" }}>halo</span>
        </div>
        {!mob && (
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            {NAV.map(n => {
              const active = screen === n.page && n.page !== "website";
              return (
                <NavLink key={n.label} label={n.label} active={active} onClick={() => onNav(n)}/>
              );
            })}
          </div>
        )}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <ThemeBtn isDark={isDark} onToggle={onToggle}/>
          {!mob && <>
            <button onClick={onSignin} style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:7, cursor:"pointer", fontSize:13.5, color:T.sub, fontFamily:"inherit" }}>Sign in</button>
            <button onClick={onSignup} style={{ padding:"8px 18px", background:T.accent, border:"none", borderRadius:7, cursor:"pointer", fontSize:13.5, fontWeight:600, color:"#000", fontFamily:"inherit" }}>Get started free</button>
          </>}
          {mob && <button onClick={() => setOpen(v => !v)} style={{ width:36, height:36, borderRadius:8, border:`1px solid ${T.border}`, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.sub }}>{open ? <X size={16}/> : <Menu size={16}/>}</button>}
        </div>
      </div>
      {mob && open && (
        <div style={{ borderTop:`1px solid ${T.border}`, padding:"16px 18px 20px", background:T.nav, backdropFilter:"blur(16px)" }}>
          {NAV.map(n => <button key={n.label} onClick={() => { onNav(n); setOpen(false); }} style={{ display:"block", width:"100%", textAlign:"left", padding:"12px 0", background:"none", border:"none", borderBottom:`1px solid ${T.border}`, fontSize:15, color:T.sub, cursor:"pointer", fontFamily:"inherit" }}>{n.label}</button>)}
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:16 }}>
            <button onClick={() => { setOpen(false); onSignin(); }} style={{ padding:"12px", borderRadius:8, border:`1px solid ${T.border}`, background:"transparent", fontSize:15, color:T.text, cursor:"pointer", fontFamily:"inherit" }}>Sign in</button>
            <button onClick={() => { setOpen(false); onSignup(); }} style={{ padding:"12px", borderRadius:8, border:"none", background:T.accent, fontSize:15, fontWeight:600, color:"#000", cursor:"pointer", fontFamily:"inherit" }}>Get started free</button>
          </div>
        </div>
      )}
    </nav>
  );
};
const NavLink = ({ label, active, onClick }) => {
  const T = T_(); const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding:"6px 12px", background:active?T.accentBg:"transparent", border:"none", cursor:"pointer", fontSize:13.5, color:active?T.accent:h?T.text:T.sub, fontFamily:"inherit", borderRadius:6, fontWeight:active?500:400, transition:"all 0.15s" }}>
      {label}
    </button>
  );
};

const Hero = ({ onSignup, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <section id="top" style={{ padding:`${mob?90:110}px ${mob?20:28}px ${mob?60:80}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"35%", left:"50%", transform:"translate(-50%,-50%)", width:mob?300:700, height:mob?200:400, background:`radial-gradient(ellipse,${T.accent}12 0%,transparent 65%)`, pointerEvents:"none" }}/>
      <div style={{ position:"relative", maxWidth:820, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:99, border:`1px solid ${T.accentBd}`, background:T.accentBg, marginBottom:mob?22:32 }}>
            <Zap size={11} color={T.accent}/><span style={{ fontSize:12.5, color:T.accent, fontWeight:500 }}>Your AI employee · UK service businesses</span>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <h1 style={{ fontSize:`clamp(${mob?"36px":"48px"},7.5vw,88px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:mob?16:22, fontFamily:"DM Serif Display,serif" }}>
            Meet Halo.<br/><span style={{ color:T.accent }}>Your AI employee.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={160}>
          <p style={{ fontSize:mob?16:18, color:T.sub, lineHeight:1.75, maxWidth:520, margin:`0 auto ${mob?28:40}px` }}>
            Halo reads every message, handles what it can, and sends you a one-tap approval for the rest — all in your tone, using your prices and policies. Get 8–12 hours back every week and the peace of mind that nothing is ever missed.
          </p>
        </FadeIn>
        <FadeIn delay={220}>
          <div style={{ display:"flex", flexDirection:mob?"column":"row", gap:12, justifyContent:"center", marginBottom:mob?32:44 }}>
            <button onClick={onSignup} style={{ padding:"14px 30px", background:T.accent, border:"none", borderRadius:9, cursor:"pointer", fontSize:15, fontWeight:600, color:"#000", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:mob?"100%":"auto" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Start free — no card needed <ArrowRight size={15}/>
            </button>
            <button onClick={() => onNav({page:"pricing",id:"top"})} style={{ padding:"14px 30px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:9, cursor:"pointer", fontSize:15, color:T.sub, fontFamily:"inherit", width:mob?"100%":"auto" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderH;e.currentTarget.style.color=T.text;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>
              See pricing
            </button>
          </div>
        </FadeIn>

        {/* Social proof strip */}
        <FadeIn delay={280}>
          <div style={{ display:"flex", flexDirection:mob?"column":"row", alignItems:"center", justifyContent:"center", gap:mob?16:32, marginBottom:mob?36:52 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ display:"flex" }}>
                {["SA","MW","PN","JL","RK"].map((av,i) => (
                  <div key={i} style={{ width:28, height:28, borderRadius:"50%", background:T.accentBg, border:`2px solid ${T.page}`, marginLeft:i===0?0:-8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:T.accent, zIndex:5-i, position:"relative" }}>{av}</div>
                ))}
              </div>
              <span style={{ fontSize:13.5, color:T.sub }}><span style={{ color:T.text, fontWeight:600 }}>200+</span> UK businesses using Halo</span>
            </div>
            {!mob && <div style={{ width:1, height:20, background:T.border }}/>}
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ display:"flex", gap:2 }}>{[0,1,2,3,4].map(i => <span key={i} style={{ color:"#FBBF24", fontSize:14 }}>★</span>)}</div>
              <span style={{ fontSize:13.5, color:T.sub }}><span style={{ color:T.text, fontWeight:600 }}>4.9</span> from 86 reviews</span>
            </div>
            {!mob && <div style={{ width:1, height:20, background:T.border }}/>}
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:T.green }} className="halo-pulse"/>
              <span style={{ fontSize:13.5, color:T.sub }}>Live in <span style={{ color:T.text, fontWeight:600 }}>under 10 minutes</span></span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const INDUSTRIES = [
  { label:"Hair and Beauty",    icon:null, msg:"Hi! Any slots this Friday for a cut and colour?",                                   reply:"Hi Sarah! We have Friday at 2pm or 4pm — which works best for you? I'll confirm straight away." },
  { label:"Personal Training",  icon:null, msg:"What are your monthly PT packages, and do you have any slots this week?",            reply:"Hi! PT packages start from £55/session — 6 for £295 or 12 for £550. I have Tuesday 6pm and Thursday 7am free. Want me to book you in?" },
  { label:"Wellness and Clinics",icon:null, msg:"Hi, I'd like to book a deep tissue massage. How much is it and when are you free?",  reply:"Hi! Deep tissue is £65 for 60 mins. I have slots Wednesday at 2pm and Friday at 11am — which suits you?" },
  { label:"Tradespeople",       icon:null, msg:"Can you give me a quote for a boiler service and fit me in this week if possible?",   reply:"Hi! I can come out Thursday or Friday — does either work? I'll confirm the quote once I've had a look." },
  { label:"Tutors",             icon:null, msg:"Do you have GCSE maths availability this week, and how much do you charge?",          reply:"Hi! GCSE maths is £45/hour. I have Tuesday 4pm and Wednesday 5pm free — want me to book one of those?" },
  { label:"And many more",      icon:null, msg:"Any business that takes bookings, sends invoices, or deals with customer enquiries.", reply:"Whatever your service, if customers send you messages, Halo can handle the ops layer. Photographers, nutritionists, dog groomers, consultants — all welcome." },
];

const ConfidenceSection = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const tiers = [
    { range:"80% +", label:"Auto-send", color:T.green, bg:T.greenBg, desc:"Halo replies instantly. No input needed from you. Bookings, pricing questions, confirmations, and standard enquiries handled before you even see them." },
    { range:"50–79%", label:"Approval needed", color:T.yellow, bg:T.yellowBg, desc:"Genuinely ambiguous or higher-stakes situations only. Halo sends one WhatsApp message with the draft reply and context. One tap to approve, edit, or dismiss. That's it." },
    { range:"Below 50%", label:"Escalate to you", color:T.red, bg:T.redBg, desc:"Complex, sensitive, or unusual situations come straight to you with full context. Halo never guesses when the stakes are high." },
  ];
  return (
    <section id="confidence" style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?40:56 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Confidence-Based Automation</p>
            <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>Your AI employee knows when to act<br/>and when to ask.</h2>
            <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.7, maxWidth:540, margin:"0 auto" }}>Every message is scored for confidence before Halo acts. High confidence means it handles it. Lower confidence means you get a one-tap approval. Nothing slips through the gaps.</p>
          </div>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
          {tiers.map((tier, i) => (
            <FadeIn key={i} delay={i*80}>
              <div style={{ padding:"28px 24px", borderRadius:14, border:`1px solid ${tier.color}30`, background:tier.bg, display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ fontSize:mob?22:28, fontWeight:700, color:tier.color, fontFamily:"DM Serif Display,serif" }}>{tier.range}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:tier.color, background:`${tier.color}18`, padding:"4px 12px", borderRadius:99, letterSpacing:"0.04em" }}>{tier.label}</span>
                </div>
                <p style={{ fontSize:14, color:T.sub, lineHeight:1.7, margin:0 }}>{tier.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={160}>
          <p style={{ textAlign:"center", fontSize:13.5, color:T.muted, marginTop:28 }}>Every decision is logged in your dashboard with a full confidence score and reasoning — so you can always see exactly why Halo did what it did.</p>
        </FadeIn>
      </div>
    </section>
  );
};

const HaloMemorySection = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const items = [
    { label:"Your tone of voice", desc:"Halo replies the way you would. Warm, professional, direct — whatever your style, it learns and maintains it." },
    { label:"Services and pricing", desc:"Every service, package, and price point is stored. Halo quotes accurately without you ever having to intervene." },
    { label:"FAQs and policies", desc:"Cancellation terms, opening hours, what you do and don't offer. Halo answers common questions confidently." },
    { label:"Customer history", desc:"Returning customers get recognised. Halo knows they've booked before, what they usually ask for, and how they like to be spoken to." },
    { label:"Preferences and notes", desc:"Anything you want Halo to know, it remembers. The more you teach it, the better it represents your business." },
  ];
  return (
    <section id="memory" style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?36:52 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 12px", borderRadius:99, background:T.accentBg, border:`1px solid ${T.accentBd}`, marginBottom:18 }}>
              <Bot size={12} color={T.accent}/>
              <span style={{ fontSize:11.5, color:T.accent, fontWeight:600, letterSpacing:"0.05em" }}>HALO MEMORY</span>
            </div>
            <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:16, fontFamily:"DM Serif Display,serif" }}>An AI employee that actually knows your business.</h2>
            <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.7, maxWidth:560, margin:"0 auto" }}>Halo Memory stores everything that makes your business yours — so every reply sounds like you wrote it, not a generic AI. The more Halo learns, the more confidently it acts on your behalf.</p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<900?"1fr 1fr":"repeat(3,1fr)", gap:12 }}>
            {items.map((item, i) => (
              <div key={i} style={{ padding:"20px", borderRadius:10, border:`1px solid ${T.border}`, background:T.surface, display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:T.accent, flexShrink:0, marginTop:7 }}/>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:600, color:T.text, marginBottom:4 }}>{item.label}</div>
                  <div style={{ fontSize:13, color:T.sub, lineHeight:1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const BusinessReportsSection = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const cadences = ["Daily","Every two days","Weekly","Fortnightly","Monthly"];
  const REPORT_DATA = [
    { msgs:"47",    bookings:"12",  invoices:"8",   escalated:"3",  hours:"9.5h" },
    { msgs:"94",    bookings:"25",  invoices:"17",  escalated:"5",  hours:"19h" },
    { msgs:"328",   bookings:"84",  invoices:"56",  escalated:"18", hours:"66h" },
    { msgs:"660",   bookings:"169", invoices:"114", escalated:"36", hours:"133h" },
    { msgs:"1,420", bookings:"364", invoices:"244", escalated:"78", hours:"285h" },
  ];
  const [active, setActive] = useState(2);
  const d = REPORT_DATA[active];
  return (
    <section id="reports" style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?36:52 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Business Reports</p>
            <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>Your business, summarised<br/>on your schedule.</h2>
            <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.7, maxWidth:520, margin:"0 auto" }}>Halo sends you a regular report of everything it handled — bookings taken, invoices sent, enquiries resolved, complaints escalated, and time saved. Delivered via WhatsApp or email, whenever you want it.</p>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
            {cadences.map((c, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ padding:"8px 18px", borderRadius:99, border:`1px solid ${active===i?T.accent:T.border}`, background:active===i?T.accentBg:"transparent", color:active===i?T.accent:T.sub, cursor:"pointer", fontSize:13.5, fontWeight:active===i?600:400, fontFamily:"inherit", transition:"all 0.15s" }}>
                {c}
              </button>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <div style={{ maxWidth:560, margin:"0 auto", background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.raised }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:T.accent }}/>
                <span style={{ fontSize:13, fontWeight:600, color:T.text }}>Halo {cadences[active]} Report</span>
              </div>
              <span style={{ fontSize:12, color:T.muted }}>via WhatsApp · 8:00am</span>
            </div>
            <div style={{ padding:"20px" }}>
              {[
                { label:"Messages handled", value:d.msgs,      color:T.accent },
                { label:"Bookings confirmed", value:d.bookings, color:T.green },
                { label:"Invoices sent", value:d.invoices,      color:T.purple },
                { label:"Escalated to you", value:d.escalated,  color:T.yellow },
                { label:"Hours saved", value:d.hours,           color:T.blue },
              ].map((row, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
                  <span style={{ fontSize:13.5, color:T.sub }}>{row.label}</span>
                  <span style={{ fontSize:15, fontWeight:700, color:row.color, fontFamily:"DM Serif Display,serif" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const IndustryStrip = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [active, setActive] = useState(0);
  const cur = INDUSTRIES[active];
  return (
    <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?36:52 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Built for service businesses</p>
            <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>
              If customers message you, Halo handles it.
            </h2>
            <p style={{ fontSize:mob?15:17, color:T.sub, maxWidth:480, margin:"0 auto", lineHeight:1.7 }}>
              Halo works for any UK service business. Here are a few examples — but the list goes on.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:mob?32:40 }}>
            {INDUSTRIES.map((ind, i) => {
              const on = active === i;
              return (
                <IndustryTab key={i} label={ind.label} active={on} onClick={() => setActive(i)}/>
              );
            })}
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:mob?24:40, alignItems:"center" }} key={active}>
            <div className="halo-fadein">
              <div style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:10 }}>
                  <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius:"13px 13px 3px 13px", background:T.accent, color:"#000", fontSize:14, lineHeight:1.65 }}>{cur.msg}</div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:T.accentBg, border:`1px solid ${T.accentBd}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Bot size={14} color={T.accent} strokeWidth={2}/>
                  </div>
                  <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius:"13px 13px 13px 3px", background:T.raised, color:T.text, fontSize:14, lineHeight:1.65, border:`1px solid ${T.border}` }}>
                    {cur.reply}
                  </div>
                </div>
              </div>
            </div>
            <div className="halo-fadein" style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ fontSize:mob?22:28, fontWeight:600, color:T.text, fontFamily:"DM Serif Display,serif", lineHeight:1.2 }}>
                {cur.label === "And many more"
                  ? "Any service business. Any message type."
                  : `Built for ${cur.label.toLowerCase()} businesses.`}
              </div>
              <p style={{ fontSize:mob?14:15.5, color:T.sub, lineHeight:1.75 }}>
                {cur.label === "And many more"
                  ? "Photographers, nutritionists, dog groomers, tutors, consultants — if you take appointments, send invoices, or deal with customer enquiries, Halo can handle the ops layer."
                  : `The same enquiries, bookings, and admin requests land in your inbox every day. Halo handles them before you've had your coffee.`}
              </p>
              {cur.label !== "And many more" && (
                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                  {["Enquiries answered automatically","Bookings created in your calendar","Invoices generated and sent"].map((pt, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:18, height:18, borderRadius:"50%", background:T.greenBg, border:`1px solid ${T.green}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Check size={10} color={T.green} strokeWidth={2.5}/>
                      </div>
                      <span style={{ fontSize:14, color:T.sub }}>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const IndustryTab = ({ label, active, onClick }) => {
  const T = T_(); const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:"flex", alignItems:"center", padding:"8px 16px", borderRadius:99, border:`1px solid ${active?T.accent:h?T.borderH:T.border}`, background:active?T.accentBg:h?T.raised:"transparent", cursor:"pointer", fontFamily:"inherit", fontSize:13.5, fontWeight:active?600:400, color:active?T.accent:h?T.text:T.sub, transition:"all 0.18s", whiteSpace:"nowrap" }}>
      {label}
    </button>
  );
};


const WhyHalo = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?40:56 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Why Halo</p>
            <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>Not a chatbot. Not a platform.<br/>An AI employee.</h2>
            <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.7, maxWidth:560, margin:"0 auto" }}>Built for any UK service business that deals with customer messages — hair studios, personal trainers, clinics, tradespeople, tutors, and dozens more. Halo surrounds your operations and quietly handles the work that was eating your day.</p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", margin:`0 -${mob?20:28}px`, padding:`0 ${mob?20:28}px` }}>
            <div style={{ border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden", minWidth:480 }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", background:T.raised, borderBottom:`1px solid ${T.border}` }}>
              {[null, {l:"Manual"}, {l:"Generic chatbot"}, {l:"Halo",accent:true}].map((h, i) => (
                <div key={i} style={{ padding:mob?"10px 8px":"14px 20px", textAlign:"center", borderLeft:i>0?`1px solid ${T.border}`:"none", background:i===3?T.accentBg:"transparent" }}>
                  {h && <div style={{ fontSize:mob?11:13, fontWeight:700, color:h.accent?T.accent:T.text }}>{h.l}</div>}
                </div>
              ))}
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", borderBottom:i<COMPARISON.length-1?`1px solid ${T.border}`:"none" }}>
                <div style={{ padding:mob?"10px 8px":"14px 20px", fontSize:mob?11:13.5, color:T.text, fontWeight:500 }}>{row.f}</div>
                {[{val:row.manual,j:0},{val:row.bot,j:1},{val:row.halo,j:2}].map(({val,j}) => {
                  const isHalo = j===2;
                  const isNo   = val==="No";
                  const isNA   = val==="N/A";
                  return (
                    <div key={j} style={{ padding:mob?"10px 6px":"14px 20px", textAlign:"center", borderLeft:`1px solid ${T.border}`, background:isHalo?T.accentBg:"transparent", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                      {isNo || isNA
                        ? <span style={{ color:T.muted, fontSize:mob?12:14 }}>—</span>
                        : <><div style={{ width:14, height:14, borderRadius:"50%", background:isHalo?T.greenBg:T.raised, border:`1px solid ${isHalo?T.green+"40":T.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={8} color={isHalo?T.green:T.muted} strokeWidth={2.5}/></div><span style={{ fontSize:mob?10:13, color:isHalo?T.green:T.sub, fontWeight:isHalo?600:400 }}>{val}</span></>
                      }
                    </div>
                  );
                })}
              </div>
            ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const PreviewEvRow = ({ ev, sel, onClick }) => {
  const T = T_(); const [h, setH] = useState(false); const sc = getSC(T, ev.status); const on = sel?.id === ev.id;
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding:"11px 14px", cursor:"pointer", borderBottom:`1px solid ${T.border}`, background:on?T.accentBg:h?T.raised:"transparent", borderLeft:`2px solid ${on?T.accent:"transparent"}`, transition:"all 0.1s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:13, fontWeight:500, color:T.text }}>{ev.name}</span>
        <span style={{ fontSize:11, color:T.muted }}>{ev.elapsed}</span>
      </div>
      <p style={{ margin:"0 0 6px", fontSize:12, color:T.sub, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ev.preview}</p>
      <div style={{ display:"flex", gap:5, alignItems:"center" }}>
        <Dot color={sc.text}/><span style={{ fontSize:11, color:T.muted }}>{sc.label}</span>
        {ev.urgency==="HIGH" && <span style={{ fontSize:10.5, color:T.red, background:T.redBg, padding:"1px 5px", borderRadius:4, fontWeight:600 }}>Urgent</span>}
      </div>
    </div>
  );
};

const PreviewEventsView = ({ events, setEvents }) => {
  const T = T_(); const [sel, setSel] = useState(events[0]);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const cur = events.find(e => e.id === sel?.id) || events[0];
  const cIC = getIC(T, cur?.intent); const cSC = getSC(T, cur?.status); const cCH = CH[cur?.ch] || CH.web;
  const approve = () => { setEditing(false); setEvents(p => p.map(e => e.id===cur.id ? {...e, status:"DONE"} : e)); };
  const dismiss = () => { setEditing(false); setEvents(p => p.map(e => e.id===cur.id ? {...e, status:"DISMISSED"} : e)); };
  const startEdit = () => { setEditText(cur.reply || ""); setEditing(true); };
  const saveEdit = () => { setEvents(p => p.map(e => e.id===cur.id ? {...e, reply:editText} : e)); setEditing(false); };

  // Reset edit state when switching events
  const handleSelect = ev => { setSel(ev); setEditing(false); };

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden" }}>
      <div style={{ width:250, borderRight:`1px solid ${T.border}`, overflowY:"auto", flexShrink:0 }}>
        {events.slice(0,7).map(ev => <PreviewEvRow key={ev.id} ev={ev} sel={sel} onClick={() => handleSelect(ev)}/>)}
      </div>
      {cur && (
        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
          <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:8 }}>{cur.name}</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
            <Chip label={cCH.label} color={T.sub} bg={T.raised}/>
            <Chip label={cur.intent.charAt(0)+cur.intent.slice(1).toLowerCase()} color={cIC.text} bg={cIC.bg}/>
            <Chip label={cSC.label} color={cSC.text} bg={cSC.bg}/>
          </div>
          <div style={{ fontSize:13.5, color:T.text, background:T.raised, padding:"12px 14px", borderRadius:8, lineHeight:1.75, marginBottom:14, border:`1px solid ${T.border}`, borderLeft:`3px solid ${T.accent}` }}>{cur.msg}</div>

          {/* Reply — static or editable */}
          {cur.reply && !editing && (
            <div style={{ fontSize:13.5, color:T.text, background:T.raised, padding:"12px 14px", borderRadius:8, lineHeight:1.75, marginBottom:14, border:`1px solid ${T.border}`, borderLeft:`3px solid ${T.green}` }}>{cur.reply}</div>
          )}
          {editing && (
            <div style={{ marginBottom:14 }}>
              <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={3}
                style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:`1px solid ${T.accent}`, background:T.raised, color:T.text, fontSize:13.5, outline:"none", resize:"none", fontFamily:"inherit", lineHeight:1.7, boxSizing:"border-box" }}/>
              <div style={{ display:"flex", gap:8, marginTop:8 }}>
                <button onClick={saveEdit} style={{ flex:1, padding:"8px 14px", background:T.accent, border:"none", borderRadius:7, color:"#000", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Save changes</button>
                <button onClick={() => setEditing(false)} style={{ padding:"8px 13px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:7, color:T.sub, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>Cancel</button>
              </div>
            </div>
          )}

          {(cur.status === "PENDING" || cur.status === "ESCALATED") && (
            <div style={{ background:"#0A1A0E", borderRadius:8, padding:"12px 14px", marginBottom:14, border:"1px solid rgba(37,209,102,0.12)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
                <div style={{ width:14, height:14, borderRadius:"50%", background:"#25D166", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Bot size={8} color="#fff" strokeWidth={2.5}/></div>
                <span style={{ fontSize:10, fontWeight:600, color:"#25D166", letterSpacing:"0.04em" }}>{cur.status === "ESCALATED" ? "ESCALATION ALERT SENT" : "WHATSAPP NOTIFICATION SENT"}</span>
                <span style={{ marginLeft:"auto", fontSize:10, color:"#2A5A3A" }}>Delivered</span>
              </div>
              <div style={{ background:"#132018", borderRadius:"3px 8px 8px 8px", padding:"9px 12px" }}>
                <div style={{ fontSize:12.5, color:"#A0D4B0", lineHeight:1.7 }}>
                  <strong style={{ color:"#DCF8E4" }}>New {cur.intent}</strong>{cur.urgency==="HIGH"?" - Urgent":" - "+cur.urgency}<br/>
                  <span style={{ color:"#2A7A3A" }}>Summary: </span>{cur.summary}
                </div>
              </div>
            </div>
          )}

          {cur.status === "PENDING" && !editing && (
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={approve} style={{ flex:1, padding:"9px 14px", background:T.accent, border:"none", borderRadius:7, color:"#000", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Check size={13}/> Send reply</button>
              {cur.reply && <button onClick={startEdit} style={{ padding:"9px 13px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:7, color:T.sub, cursor:"pointer", fontFamily:"inherit", fontSize:13, display:"flex", alignItems:"center", gap:5 }}><Copy size={12}/> Edit</button>}
              <button onClick={dismiss} style={{ padding:"9px 13px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:7, color:T.sub, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>Dismiss</button>
            </div>
          )}
          {cur.status === "DONE" && <div style={{ padding:"10px 14px", borderRadius:7, background:T.accentBg, border:`1px solid ${T.accent}22`, display:"flex", gap:8, alignItems:"center" }}><Check size={14} color={T.accent}/><span style={{ fontSize:13, color:T.accent }}>Reply sent</span></div>}
          {cur.status === "DISMISSED" && <div style={{ padding:"10px 14px", borderRadius:7, background:T.raised, border:`1px solid ${T.border}`, display:"flex", gap:8, alignItems:"center" }}><X size={14} color={T.muted}/><span style={{ fontSize:13, color:T.muted }}>Dismissed</span></div>}
          {cur.status === "AUTO" && <div style={{ padding:"10px 14px", borderRadius:7, background:T.greenBg, border:`1px solid ${T.green}22`, display:"flex", gap:8, alignItems:"center" }}><Check size={14} color={T.green}/><span style={{ fontSize:13, color:T.green }}>Handled automatically</span></div>}
          {cur.status === "ESCALATED" && <div style={{ padding:"10px 14px", borderRadius:7, background:T.redBg, border:`1px solid ${T.red}22` }}><span style={{ fontSize:13, color:T.red }}>Escalated — contact customer directly</span></div>}
        </div>
      )}
    </div>
  );
};

const ExChip = ({ text, onSelect }) => {
  const T = T_();
  const [h, setH] = useState(false);
  return (
    <button onClick={() => onSelect(text)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize:12, padding:"4px 10px", borderRadius:5, fontFamily:"inherit", border:`1px solid ${h?T.accent:T.border}`, background:h?T.accentBg:"transparent", color:h?T.accent:T.sub, cursor:"pointer", transition:"all 0.12s" }}>
      {text.length>36 ? text.slice(0,36)+"..." : text}
    </button>
  );
};

const EX_MSGS = ["Can I book a haircut this Saturday at 2pm?","Please send me an invoice for last Tuesday","I want a refund, been waiting 3 days","What are your prices for deep tissue massage?"];

const PreviewPipelineView = () => {
  const T = T_();
  const [msg, setMsg] = useState("");
  const [phase, setPhase] = useState(-1);
  const [res, setRes] = useState(null);
  const [focused, setFocused] = useState(false);
  const STEPS = [{ icon:"📥", label:"Received" }, { icon:"🧠", label:"Classifying" }, { icon:"✍️", label:"Generating reply" }, { icon:"📲", label:"Building notification" }];
  const getFallback = (text) => {
    const t = text.toLowerCase();
    if (t.includes("refund") || t.includes("cancel") || t.includes("complaint") || t.includes("waiting") || t.includes("unhappy")) return { intent:"COMPLAINT", confidence:42, urgency:"HIGH", suggestedAction:"ESCALATE", suggestedReply:null, summary:"Customer complaint requiring direct response" };
    if (t.includes("invoice") || t.includes("bill") || t.includes("receipt") || t.includes("payment")) return { intent:"INVOICE", confidence:97, urgency:"MEDIUM", suggestedAction:"CREATE_INVOICE", suggestedReply:"Hi! Of course, your invoice is on its way now.", summary:"Invoice request" };
    if (t.includes("book") || t.includes("appointment") || t.includes("slot") || t.includes("availability") || t.includes("available") || t.includes("saturday") || t.includes("friday") || t.includes("monday") || t.includes("tuesday") || t.includes("wednesday") || t.includes("thursday")) return { intent:"BOOKING", confidence:94, urgency:"HIGH", suggestedAction:"CREATE_BOOKING", suggestedReply:"Hi! Let me check availability for you — I'll confirm a slot shortly.", summary:"Booking request" };
    if (t.includes("price") || t.includes("cost") || t.includes("how much") || t.includes("charge") || t.includes("fee")) return { intent:"ENQUIRY", confidence:88, urgency:"LOW", suggestedAction:"REPLY", suggestedReply:"Hi! Happy to share our pricing — what service are you interested in?", summary:"Pricing enquiry" };
    return { intent:"ENQUIRY", confidence:82, urgency:"LOW", suggestedAction:"REPLY", suggestedReply:"Hi! Thanks for getting in touch. How can I help you today?", summary:"General enquiry" };
  };
  const run = async () => {
    if (!msg.trim() || phase >= 0) return;
    setRes(null); setPhase(0);
    await new Promise(r => setTimeout(r, 400)); setPhase(1);
    try {
      const d = await callAI({ model:"claude-sonnet-4-5", max_tokens:500, system:CLF_SYS, messages:[{ role:"user", content:"Customer message: " + msg }] });
      const raw = d.content?.find(b => b.type==="text")?.text || "{}";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      const result = (parsed && parsed.intent) ? parsed : getFallback(msg);
      await new Promise(r => setTimeout(r, 350)); setPhase(2);
      await new Promise(r => setTimeout(r, 400)); setPhase(3);
      await new Promise(r => setTimeout(r, 300)); setPhase(4);
      setRes(result);
    } catch {
      await new Promise(r => setTimeout(r, 350)); setPhase(2);
      await new Promise(r => setTimeout(r, 400)); setPhase(3);
      await new Promise(r => setTimeout(r, 300)); setPhase(4);
      setRes(getFallback(msg));
    }
  };
  const reset = () => { setPhase(-1); setRes(null); };
  const iC = res ? getIC(T, res.intent) : null;
  const UC = { HIGH:T.red, MEDIUM:T.yellow, LOW:T.green };
  return (
    <div style={{ height:"100%", overflowY:"auto", padding:"18px 20px" }}>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
        {EX_MSGS.map((ex, i) => <ExChip key={i} text={ex} onSelect={t => { setMsg(t); reset(); }}/>)}
      </div>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} disabled={phase>-1&&phase<4} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Or type any customer message..." rows={3}
        style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:`1px solid ${focused?T.accent:T.border}`, background:T.raised, color:T.text, fontSize:13.5, outline:"none", resize:"none", fontFamily:"inherit", lineHeight:1.6, boxSizing:"border-box", marginBottom:10, transition:"border-color 0.15s" }}/>
      <button onClick={phase===4?reset:run} disabled={!msg.trim()&&phase===-1}
        style={{ width:"100%", padding:"10px", borderRadius:8, fontFamily:"inherit", background:phase===4?T.raised:msg.trim()?T.accent:T.raised, border:`1px solid ${phase===4?T.border:msg.trim()?T.accent:T.border}`, color:phase===4?T.sub:msg.trim()?"#000":T.muted, fontSize:13.5, fontWeight:500, cursor:msg.trim()||phase===4?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transition:"all 0.15s", marginBottom:14 }}>
        {phase===-1&&<><Play size={13}/> Run pipeline</>}
        {phase>=0&&phase<4&&<><RefreshCw size={13} style={{animation:"halo-spin 0.8s linear infinite"}}/> Classifying...</>}
        {phase===4&&<><RefreshCw size={13}/> Run again</>}
      </button>
      {phase >= 0 && (
        <div style={{ display:"grid", gridTemplateColumns:res&&phase===4?"1fr 1fr":"1fr", gap:12 }}>
          <div style={{ background:T.raised, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            {STEPS.map((s, i) => { const done=phase>i, active=phase===i; return (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:i<3?12:0 }}>
                <div style={{ width:28, height:28, borderRadius:7, flexShrink:0, background:done?T.greenBg:active?T.accentBg:T.surface, border:`1px solid ${done?T.green+"40":active?T.accent+"40":T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, transition:"all 0.3s" }}>
                  {done ? <Check size={12} color={T.green} strokeWidth={2.5}/> : s.icon}
                </div>
                <span style={{ fontSize:13, fontWeight:active||done?500:400, color:done?T.green:active?T.accent:T.muted, transition:"color 0.3s", flex:1 }}>{s.label}</span>
                {active && <div style={{ display:"flex", gap:3 }}>{[0,1,2].map(j => <div key={j} style={{ width:4, height:4, borderRadius:"50%", background:T.accent, opacity:0.6, animation:`halo-bounce 0.9s ease-in-out ${j*0.12}s infinite` }}/>)}</div>}
              </div>
            ); })}
          </div>
          {res && phase===4 && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ background:T.raised, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:10 }}>
                  {[{l:"Intent",v:res.intent,c:iC?.text||T.accent},{l:"Confidence",v:res.confidence+"%",c:res.confidence>=80?T.green:res.confidence>=50?T.yellow:T.red},{l:"Urgency",v:res.urgency,c:UC[res.urgency]||T.sub},{l:"Action",v:(res.suggestedAction||"").replace(/_/g," "),c:T.accent}].map(f => (
                    <div key={f.l} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:6, padding:"8px 10px" }}>
                      <div style={{ fontSize:9, color:T.muted, marginBottom:3, textTransform:"uppercase", letterSpacing:"0.05em" }}>{f.l}</div>
                      <div style={{ fontSize:12, color:f.c, fontWeight:600 }}>{f.v}</div>
                    </div>
                  ))}
                </div>
                {res.suggestedReply && <div style={{ fontSize:12.5, color:T.text, lineHeight:1.65, borderLeft:`2px solid ${T.green}`, paddingLeft:10 }}>{res.suggestedReply}</div>}
              </div>
              {res.confidence >= 80 ? (
                <div style={{ background:T.greenBg, borderRadius:10, padding:"12px 14px", border:`1px solid ${T.green}22`, display:"flex", alignItems:"center", gap:8 }}>
                  <Check size={14} color={T.green}/>
                  <span style={{ fontSize:13, color:T.green, fontWeight:500 }}>Auto-handled — {res.confidence}% confident. No input needed from you.</span>
                </div>
              ) : res.confidence >= 50 ? (
                <div style={{ background:"#0A1A0E", borderRadius:10, padding:"12px 14px", border:"1px solid rgba(37,209,102,0.12)" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:"#3A8A4A", letterSpacing:"0.06em", marginBottom:7 }}>WHATSAPP NOTIFICATION SENT</div>
                  <div style={{ fontSize:12.5, color:"#A0D4B0", lineHeight:1.65 }}>
                    <strong style={{ color:"#DCF8E4" }}>Needs your approval</strong> — {res.confidence}% confident<br/>
                    <span style={{ color:"#2A7A3A" }}>Action: </span>{ACTION_LABELS[res.suggestedAction]||res.suggestedAction}
                  </div>
                </div>
              ) : (
                <div style={{ background:T.redBg, borderRadius:10, padding:"12px 14px", border:`1px solid ${T.red}22` }}>
                  <div style={{ fontSize:10, fontWeight:600, color:T.red, letterSpacing:"0.06em", marginBottom:4 }}>ESCALATED TO YOU</div>
                  <div style={{ fontSize:12.5, color:T.red, lineHeight:1.65 }}>Below 50% confident — complex or sensitive. Halo has flagged this for your direct attention.</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AI_PROMPTS = ["Draft a polite no-show follow-up","Write a 48-hour cancellation policy","How do I increase repeat bookings?","Write an overdue invoice reminder"];

const PromptChip = ({ text, onSend }) => {
  const T = T_();
  const [h, setH] = useState(false);
  return (
    <button onClick={() => onSend(text)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding:"10px 13px", borderRadius:8, border:`1px solid ${h?T.accent:T.border}`, background:h?T.accentBg:T.surface, cursor:"pointer", textAlign:"left", fontSize:13, color:T.text, lineHeight:1.5, fontFamily:"inherit", transition:"all 0.15s" }}>
      {text}
    </button>
  );
};

const PreviewAssistantView = () => {
  const T = T_();
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const [focused, setFocused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, load]);

  const send = async text => {
    if (!text.trim() || load) return;
    const m = [...msgs, { role:"user", content:text }];
    setMsgs(m); setInp(""); setLoad(true);
    try {
      const d = await callAI({ model:"claude-sonnet-4-5", max_tokens:600, system:AI_SYS, messages:m });
      setMsgs(p => [...p, { role:"assistant", content:d.content?.find(b=>b.type==="text")?.text || "Something went wrong." }]);
    } catch {
      setMsgs(p => [...p, { role:"assistant", content:"Connection error — please try again." }]);
    }
    setLoad(false);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div ref={scrollRef} style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        {msgs.length === 0 ? (
          <div>
            <p style={{ fontSize:13, color:T.sub, marginBottom:12 }}>Try a quick prompt:</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {AI_PROMPTS.map((p, i) => <PromptChip key={i} text={p} onSend={send}/>)}
            </div>
          </div>
        ) : (
          <>
            {msgs.map((m, i) => (
              <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", marginBottom:12, gap:8, alignItems:"flex-start" }}>
                {m.role==="assistant" && (
                  <div style={{ width:24, height:24, borderRadius:6, background:T.accentBg, border:`1px solid ${T.accentBd}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                    <Bot size={12} color={T.accent} strokeWidth={2}/>
                  </div>
                )}
                <div style={{ maxWidth:"74%", padding:"10px 13px", borderRadius:10, background:m.role==="user"?T.accent:T.raised, color:m.role==="user"?"#000":T.text, border:m.role==="assistant"?`1px solid ${T.border}`:"none", fontSize:13.5, lineHeight:1.7, whiteSpace:"pre-wrap" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {load && (
              <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, borderRadius:6, background:T.accentBg, border:`1px solid ${T.accentBd}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Bot size={12} color={T.accent} strokeWidth={2}/>
                </div>
                <div style={{ padding:"11px 14px", borderRadius:10, background:T.raised, border:`1px solid ${T.border}`, display:"flex", gap:4, alignItems:"center" }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:T.accent, opacity:0.6, animation:`halo-bounce 1.1s ease-in-out ${i*0.15}s infinite` }}/>)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ padding:"12px 16px 14px", borderTop:`1px solid ${T.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
          <textarea value={inp} onChange={e => setInp(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); send(inp); }}}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Ask Halo anything..." rows={2}
            style={{ flex:1, padding:"9px 12px", borderRadius:8, border:`1px solid ${focused?T.accent:T.border}`, background:T.raised, color:T.text, fontSize:13.5, outline:"none", resize:"none", fontFamily:"inherit", lineHeight:1.6, boxSizing:"border-box", transition:"border-color 0.15s" }}/>
          <button onClick={() => send(inp)} disabled={!inp.trim()||load}
            style={{ width:40, height:40, borderRadius:8, flexShrink:0, background:inp.trim()&&!load?T.accent:T.raised, border:`1px solid ${inp.trim()&&!load?T.accent:T.border}`, cursor:inp.trim()&&!load?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
            <Send size={14} color={inp.trim()&&!load?"#000":T.muted}/>
          </button>
        </div>
      </div>
    </div>
  );
};

const NOTIF_EXAMPLES = [
  { name:"Sarah Mitchell", ch:"WhatsApp", msg:"Hi! Any slots this Friday for a cut and colour?", intent:"BOOKING", conf:96, reply:"Hi Sarah! We have Friday at 2pm or 4pm — which works best for you? I'll confirm straight away.", av:"SM", handled:true },
  { name:"James Okafor",   ch:"Email",    msg:"Please send over an invoice for last Tuesday's deep tissue massage.", intent:"INVOICE", conf:99, reply:"Hi James! Of course, your invoice is attached. Let me know if you have any questions.", av:"JK", handled:true },
  { name:"@glowupldn",     ch:"Instagram",msg:"Do you do lash lifts? How much?", intent:"ENQUIRY", conf:91, reply:"Hey! Yes, lash lifts are £45 and take about 45 mins. Want me to check availability for you?", av:"GL", handled:true },
  { name:"Priya Sharma",   ch:"WhatsApp", msg:"Hi, my highlights from last week came out really brassy — I'm not happy with them. Can I come back in for a correction? Would there be a charge?", intent:"COMPLAINT", conf:58, reply:"Hi Priya, I'm really sorry to hear that. I'd love to make it right — let me check availability for a correction appointment. Could I ask you to send a photo so we can see what we're working with?", av:"PS", handled:false },
  { name:"Luke Morrison",  ch:"WhatsApp", msg:"I want to cancel my appointment and I want a full refund. Been waiting 3 days for a response and this is unacceptable.", intent:"COMPLAINT", conf:38, reply:null, av:"LM", handled:false, escalated:true },
];

const PreviewNotificationsView = () => {
  const T = T_();
  const [approved, setApproved] = useState(false);

  // The one that needs approval — service quality complaint, owner decides on free correction
  const flagged = NOTIF_EXAMPLES[3];
  const autoHandled = NOTIF_EXAMPLES.filter(n => n.handled);

  return (
    <div style={{ height:"100%", overflowY:"auto", padding:"16px 18px" }}>

      {/* Today's summary — the main message */}
      <div style={{ background:T.raised, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px", marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:T.sub, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>Today so far</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
          {[
            { n:"47", label:"Messages handled", color:T.green },
            { n:"2",  label:"Bookings confirmed", color:T.accent },
            { n:"3",  label:"Invoices sent", color:T.purple },
            { n:"1",  label:"Needs your input", color:T.yellow },
          ].map((s,i) => (
            <div key={i} style={{ background:T.page, borderRadius:8, padding:"10px 12px", border:`1px solid ${T.border}` }}>
              <div style={{ fontSize:20, fontWeight:700, color:s.color, fontFamily:"DM Serif Display,serif", lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:11, color:T.muted, marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {autoHandled.map((n,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:99, background:T.greenBg, border:`1px solid ${T.green}20` }}>
              <Check size={10} color={T.green} strokeWidth={2.5}/>
              <span style={{ fontSize:11, color:T.green }}>{n.name} · {n.intent.toLowerCase()}</span>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:99, background:T.greenBg, border:`1px solid ${T.green}20` }}>
            <Check size={10} color={T.green} strokeWidth={2.5}/>
            <span style={{ fontSize:11, color:T.green }}>+44 more handled</span>
          </div>
        </div>
      </div>

      {/* The one notification */}
      <div style={{ fontSize:11, fontWeight:700, color:T.yellow, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background:T.yellow }}/>
        1 message needs your approval
      </div>

      <div style={{ background:"#0A0A0A", borderRadius:16, overflow:"hidden", border:"1px solid #222" }}>
        {/* Notification header */}
        <div style={{ padding:"12px 14px 10px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid #2A2A2A" }}>
          <div style={{ width:30, height:30, borderRadius:8, background:"#128C7E", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>H</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>Halo · Needs you</div>
            <div style={{ fontSize:11, color:"#666" }}>78% confident · {flagged.ch}</div>
          </div>
          <div style={{ fontSize:10, color:"#555" }}>now</div>
        </div>

        <div style={{ padding:"12px 14px" }}>
          <div style={{ fontSize:11, fontWeight:600, color:"#888", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>From {flagged.name}</div>
          <div style={{ fontSize:13, color:"#DDD", lineHeight:1.6, background:"#1C1C1E", borderRadius:8, padding:"10px 12px", marginBottom:10 }}>
            "{flagged.msg}"
          </div>
          <div style={{ background:"#0A1A0E", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(37,209,102,0.15)", marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#25D166", marginBottom:4 }}>Halo's draft</div>
            <div style={{ fontSize:12.5, color:"#A0D4A8", lineHeight:1.6 }}>{flagged.reply}</div>
          </div>

          {!approved ? (
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setApproved(true)}
                style={{ flex:2, padding:"11px", background:"#128C7E", border:"none", borderRadius:8, cursor:"pointer", fontSize:13.5, fontWeight:700, color:"#fff", fontFamily:"inherit" }}>
                ✓ Send reply
              </button>
              <button style={{ flex:1, padding:"11px", background:"#2C2C2E", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, color:"#AAA", fontFamily:"inherit" }}>
                Edit
              </button>
            </div>
          ) : (
            <div style={{ padding:"12px", background:"#0A1A0E", borderRadius:8, textAlign:"center", border:"1px solid rgba(37,209,102,0.2)" }}>
              <div style={{ fontSize:13, color:"#25D166", fontWeight:600 }}>✓ Reply sent to {flagged.name}</div>
              <div style={{ fontSize:11, color:"#555", marginTop:4 }}>That's the only approval you needed today.</div>
            </div>
          )}
        </div>
      </div>

      <p style={{ fontSize:12, color:T.muted, textAlign:"center", marginTop:14, lineHeight:1.6 }}>
        Halo handled 47 messages automatically today.<br/>You were asked once.
      </p>
    </div>
  );
};


const PreviewTabBtn = ({ label, active, onClick }) => {
  const T = T_();
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding:"7px 16px", borderRadius:7, border:"none", cursor:"pointer", fontSize:13, fontWeight:active?600:400, fontFamily:"inherit", background:active?T.surface:h?T.raised:"transparent", color:active?T.text:h?T.text:T.sub, boxShadow:active?(T.isDark?"0 1px 4px rgba(0,0,0,0.4)":"0 1px 4px rgba(0,0,0,0.1)"):"none", transition:"all 0.18s", whiteSpace:"nowrap" }}>
      {label}
    </button>
  );
};

const PREVIEW_TABS = [
  { id:"notifications", label:"Owner notifications" },
  { id:"events",        label:"Events feed" },
  { id:"pipeline",      label:"Pipeline test" },
  { id:"assistant",     label:"AI Assistant" },
];

const ProductPreview = ({ events, setEvents }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [tab, setTab] = useState("notifications");
  return (
    <section style={{ padding:`${mob?48:96}px ${mob?16:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?28:52 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Live demo</p>
            <h2 style={{ fontSize:`clamp(${mob?"24px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:14 }}>Try it yourself.</h2>
            <p style={{ fontSize:mob?14:17, color:T.sub, maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>
              {mob
                ? "See how owner notifications work. Rotate your phone or open on a laptop for the full experience."
                : "This is the real product. Try the notification flow, approve an event, run the pipeline, or ask your AI employee a question."
              }
            </p>
            {mob && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:12, padding:"5px 12px", borderRadius:99, background:T.raised, border:`1px solid ${T.border}` }}>
                <span style={{ fontSize:11.5, color:T.muted }}>📱 Rotate for full demo  ·  💻 Best on desktop</span>
              </div>
            )}
          </div>
        </FadeIn>
        <FadeIn delay={100} y={32}>
          {mob ? (
            // Mobile: show notifications view directly, no chrome
            <div style={{ background:T.page, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden", maxWidth:400, margin:"0 auto" }}>
              <div style={{ background:T.raised, borderBottom:`1px solid ${T.border}`, padding:"11px 16px", display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:T.green, animation:"halo-pulse 2s ease-in-out infinite" }}/>
                <span style={{ fontSize:12, color:T.sub }}>Owner Notifications</span>
              </div>
              <div style={{ height:560, background:T.page, overflowY:"auto" }}>
                <PreviewNotificationsView/>
              </div>
            </div>
          ) : (
            // Desktop: full tabbed interface
            <div style={{ background:T.page, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden", boxShadow:T.isDark?"0 32px 80px rgba(0,0,0,0.5)":"0 32px 80px rgba(0,0,0,0.1)" }}>
              <div style={{ background:T.raised, borderBottom:`1px solid ${T.border}`, padding:"11px 18px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>{["#F87171","#FBBF24","#4ADE80"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.75 }}/>)}</div>
                <div style={{ flex:1, background:T.surface, border:`1px solid ${T.border}`, borderRadius:7, padding:"5px 12px", display:"flex", alignItems:"center", gap:7, maxWidth:280, margin:"0 auto" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:T.green, flexShrink:0 }}/>
                  <span style={{ fontSize:12, color:T.sub }}>app.halo.ai/dashboard</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:T.green, animation:"halo-pulse 2s ease-in-out infinite" }}/>
                  <span style={{ fontSize:11, color:T.green, fontWeight:600 }}>Live</span>
                </div>
              </div>
              <div style={{ background:T.raised, borderBottom:`1px solid ${T.border}`, padding:"8px 16px", display:"flex", gap:4, overflowX:"auto" }}>
                {PREVIEW_TABS.map(t => (
                  <PreviewTabBtn key={t.id} label={t.label} active={tab===t.id} onClick={() => setTab(t.id)}/>
                ))}
              </div>
              <div style={{ height:520, background:T.page, overflow:"hidden" }}>
                {tab==="notifications" && <PreviewNotificationsView/>}
                {tab==="events"        && <PreviewEventsView events={events} setEvents={setEvents}/>}
                {tab==="pipeline"      && <PreviewPipelineView/>}
                {tab==="assistant"     && <PreviewAssistantView/>}
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

const BUSINESS_TYPES = ["Hair and beauty studios","Personal trainers","Wellness clinics","Tradespeople","Tutors and coaches","Photographers","Dog groomers","Physiotherapists","Massage therapists","Yoga studios"];

const FeaturesTeaserStrip = ({ onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const cards = [
    { label:"Confidence-Based Automation", desc:"80%+ confident? Auto-sends. Genuinely ambiguous? One-tap approval. Complex? Escalated to you.", page:"features", id:"confidence" },
    { label:"Halo Memory", desc:"Your tone, prices, policies, and customer history — stored and used in every reply.", page:"features", id:"memory" },
    { label:"Business Reports", desc:"A regular summary of everything Halo handled, delivered to WhatsApp or email on your schedule.", page:"features", id:"reports" },
    { label:"Live Demo", desc:"Try the real product — approve an event, run the pipeline, or ask Halo a question.", page:"demo", id:"top" },
  ];
  return (
    <section style={{ padding:`${mob?56:80}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?28:40 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>What Halo does</p>
            <h2 style={{ fontSize:`clamp(${mob?"24px":"28px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>Explore everything your AI employee can do.</h2>
            <button onClick={() => onNav({page:"features",id:"features-top"})} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13.5, color:T.accent, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              See all features <ArrowRight size={13}/>
            </button>
          </div>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<900?"1fr 1fr":"repeat(4,1fr)", gap:12 }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i*60}>
              <div onClick={() => onNav({page:c.page, id:c.id})} style={{ padding:"22px 20px", borderRadius:12, border:`1px solid ${T.border}`, background:T.page, cursor:"pointer", transition:"all 0.18s", display:"flex", flexDirection:"column", gap:10, height:"100%" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.background=T.accentBg;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.page;}}>
                <div style={{ fontSize:14, fontWeight:600, color:T.text }}>{c.label}</div>
                <div style={{ fontSize:13, color:T.sub, lineHeight:1.6, flex:1 }}>{c.desc}</div>
                <div style={{ display:"flex", alignItems:"center", gap:5, color:T.accent, fontSize:12.5, fontWeight:500 }}>Learn more <ArrowRight size={11}/></div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoPage = ({ isDark, onToggle, onSignin, onSignup, onBookDemo, onNav, events, setEvents }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <div style={{ background:T.page, height:"100vh", display:"flex", flexDirection:"column", overflowX:"hidden" }}>
      <AnnouncementBar onSignup={onSignup}/>
      <SiteNav isDark={isDark} onToggle={onToggle} onSignin={onSignin} onSignup={onSignup} screen="demo" onNav={onNav}/>
      <div data-scroll="" style={{ flex:1, overflowY:"auto", overflowX:"hidden", WebkitOverflowScrolling:"touch" }}>
        <section id="top" style={{ padding:`${mob?80:100}px ${mob?20:28}px ${mob?40:56}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
            <FadeIn><button onClick={() => onNav({page:"website",id:"top"})} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:T.sub, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", marginBottom:28 }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.sub}><ArrowRight size={12} style={{transform:"rotate(180deg)"}}/> Back to home</button></FadeIn>
            <FadeIn delay={40}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:99, border:`1px solid ${T.accentBd}`, background:T.accentBg, marginBottom:22 }}>
                <Play size={11} color={T.accent}/><span style={{ fontSize:12.5, color:T.accent, fontWeight:500 }}>Live demo — the real product</span>
              </div>
            </FadeIn>
            <FadeIn delay={60}>
              <h1 style={{ fontSize:`clamp(${mob?"34px":"44px"},5vw,68px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:16, fontFamily:"DM Serif Display,serif" }}>
                Try Halo.<br/><span style={{ color:T.accent }}>Right now.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p style={{ fontSize:mob?15:18, color:T.sub, lineHeight:1.75, maxWidth:480, margin:"0 auto 36px" }}>
                Select an event and approve or edit the reply, run the pipeline on any customer message, or ask your AI employee a question. This is the real product — not a mockup.
              </p>
            </FadeIn>
            <FadeIn delay={160}>
              <button onClick={onSignup} style={{ padding:"13px 28px", background:T.accent, border:"none", borderRadius:9, cursor:"pointer", fontSize:15, fontWeight:600, color:"#000", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8 }}
                onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Start free — no card needed <ArrowRight size={15}/>
              </button>
            </FadeIn>
          </div>
        </section>
        <section style={{ padding:`0 ${mob?12:28}px ${mob?64:96}px` }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <ProductPreview events={events} setEvents={setEvents}/>
          </div>
        </section>
        <CtaSection onSignup={onSignup} onBookDemo={onBookDemo}/>
        <SiteFooter onNav={onNav}/>
      </div>
    </div>
  );
};

const IndustryTicker = () => {
  const T = T_();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i+1) % BUSINESS_TYPES.length); setFade(true); }, 200);
    }, 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:99, background:T.raised, border:`1px solid ${T.border}` }}>
      <div style={{ width:5, height:5, borderRadius:"50%", background:T.green, flexShrink:0 }} className="halo-pulse"/>
      <span style={{ fontSize:13, color:T.muted }}>Built for</span>
      <span style={{ fontSize:13, color:T.text, fontWeight:600, opacity:fade?1:0, transition:"opacity 0.2s ease", minWidth:200, display:"inline-block" }}>{BUSINESS_TYPES[idx]}</span>
      <span style={{ fontSize:13, color:T.muted }}>and more</span>
    </div>
  );
};

const Testimonials = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center", marginBottom:mob?40:60 }}>
          <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Testimonials</p>
          <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>Real businesses. Real results.</h2>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:12, marginBottom:8, flexWrap:"wrap" }}>
            <div style={{ display:"flex", gap:2 }}>{[0,1,2,3,4].map(j => <span key={j} style={{ color:"#FBBF24", fontSize:16 }}>★</span>)}</div>
            <span style={{ fontSize:14, color:T.sub }}><span style={{ color:T.text, fontWeight:600 }}>4.9 out of 5</span> — from 86 verified reviews</span>
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginTop:18 }}><IndustryTicker/></div>
        </div></FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i*100}>
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"28px", display:"flex", flexDirection:"column", gap:18 }}>
                <div style={{ display:"flex", gap:2 }}>{[0,1,2,3,4].map(j => <span key={j} style={{ color:"#FBBF24", fontSize:14 }}>★</span>)}</div>
                <p style={{ fontSize:15, color:T.text, lineHeight:1.75, flex:1, margin:0 }}>"{t.quote}"</p>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:T.accentBg, border:`1px solid ${T.accentBd}`, color:T.accent, fontWeight:700, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{t.av}</div>
                  <div><div style={{ fontSize:13.5, fontWeight:600, color:T.text }}>{t.name}</div><div style={{ fontSize:12, color:T.muted, marginTop:1 }}>{t.role}</div></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = ({ onSignup }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center", marginBottom:mob?36:56 }}>
          <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Pricing</p>
          <h2 style={{ fontSize:`clamp(${mob?"28px":"32px"},4vw,52px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:24 }}>Simple, transparent pricing.</h2>
          <div style={{ display:"inline-flex", alignItems:"center", gap:0, background:T.surface, border:`1px solid ${T.border}`, borderRadius:99, padding:"5px" }}>
            {["Monthly","Annual"].map((l, i) => {
              const on = (i===0&&!annual)||(i===1&&annual);
              return <button key={l} onClick={() => setAnnual(i===1)} style={{ padding:"7px 18px", borderRadius:99, border:"none", cursor:"pointer", fontSize:13.5, fontWeight:500, fontFamily:"inherit", background:on?T.accent:"transparent", color:on?"#000":T.sub, transition:"all 0.2s", display:"flex", alignItems:"center", gap:6 }}>{l}{i===1&&<span style={{ fontSize:10.5, fontWeight:700, padding:"2px 6px", borderRadius:99, background:on?"rgba(0,0,0,0.15)":T.greenBg, color:on?"#000":T.green }}>Save 20%</span>}</button>;
            })}
          </div>
        </div></FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
          {PRICING.map((plan, i) => {
            const price = annual ? plan.yr : plan.mo;
            return (
              <FadeIn key={plan.name} delay={i*80}>
                <div style={{ padding:"32px", borderRadius:14, border:`1px solid ${plan.pop?T.accent:T.border}`, background:plan.pop?T.accentBg:T.surface, position:"relative", display:"flex", flexDirection:"column" }}>
                  {plan.pop && <div style={{ position:"absolute", top:18, right:18, fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99, background:T.accent, color:"#000", letterSpacing:"0.05em" }}>POPULAR</div>}
                  <div style={{ fontSize:11, fontWeight:700, color:T.accent, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{plan.name}</div>
                  <div style={{ fontSize:mob?17:20, fontWeight:700, color:T.text, marginBottom:12, fontFamily:"DM Serif Display,serif", lineHeight:1.2 }}>{plan.tag}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:10 }}>
                    {price ? <><span style={{ fontSize:44, fontWeight:700, color:T.text, fontFamily:"DM Serif Display,serif", lineHeight:1 }}>£{price}</span><span style={{ fontSize:14, color:T.sub }}>/mo</span></> : <span style={{ fontSize:32, fontWeight:700, color:T.text, fontFamily:"DM Serif Display,serif" }}>Custom</span>}
                  </div>
                  <p style={{ fontSize:13.5, color:T.sub, lineHeight:1.6, marginBottom:20 }}>{plan.desc}</p>
                  <button onClick={onSignup} style={{ width:"100%", padding:"11px", borderRadius:8, border:`1px solid ${plan.pop?T.accent:T.border}`, background:plan.pop?T.accent:"transparent", color:plan.pop?"#000":T.text, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit", marginBottom:18 }}>{price ? "Start free trial" : "Contact us"}</button>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {plan.features.map(f => <div key={f} style={{ display:"flex", gap:10, alignItems:"flex-start" }}><Check size={13} color={T.green} style={{ marginTop:2, flexShrink:0 }}/><span style={{ fontSize:13.5, color:T.sub, lineHeight:1.5 }}>{f}</span></div>)}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={200}>
          <div style={{ marginTop:28, display:"flex", alignItems:"center", justifyContent:"center", gap:mob?16:32, flexWrap:"wrap" }}>
            {[
              { icon:Check, text:"14-day free trial on all plans" },
              { icon:Check, text:"No credit card required" },
              { icon:Check, text:"Cancel anytime — no lock-in" },
              { icon:Check, text:"Live in under 10 minutes" },
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
                <div style={{ width:16, height:16, borderRadius:"50%", background:T.greenBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Check size={9} color={T.green} strokeWidth={2.5}/>
                </div>
                <span style={{ fontSize:13, color:T.sub }}>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const HaloSetupSection = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const steps = [
    { n:"01", q:"Business name and industry", a:"Halo learns who you are and what kind of business it's representing." },
    { n:"02", q:"Services and prices", a:"Every service, package, and price point — so Halo quotes accurately without you." },
    { n:"03", q:"Opening hours", a:"Halo only offers availability during your actual working hours." },
    { n:"04", q:"Cancellation and refund policy", a:"Halo handles these questions confidently, in your own words." },
    { n:"05", q:"Tone of voice", a:"Formal, friendly, casual — Halo writes the way you write." },
    { n:"06", q:"FAQs", a:"Anything customers ask regularly, Halo answers for you." },
  ];
  return (
    <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:mob?40:60 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Halo Setup</p>
            <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>Up and running in 10 minutes.<br/>Not 10 days.</h2>
            <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.7, maxWidth:520, margin:"0 auto" }}>When you join Halo, you answer a simple onboarding questionnaire. Halo builds your business profile automatically — no settings to configure, no technical knowledge required.</p>
          </div>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i*60}>
              <div style={{ padding:"24px", borderRadius:12, border:`1px solid ${T.border}`, background:T.page }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.accent, letterSpacing:"0.08em", marginBottom:12 }}>{s.n}</div>
                <div style={{ fontSize:14.5, fontWeight:600, color:T.text, marginBottom:8 }}>{s.q}</div>
                <div style={{ fontSize:13.5, color:T.sub, lineHeight:1.6 }}>{s.a}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={200}>
          <p style={{ textAlign:"center", fontSize:13.5, color:T.muted, marginTop:32 }}>Answer 6 questions. Halo builds your profile. Your AI employee starts working the same day.</p>
        </FadeIn>
      </div>
    </section>
  );
};

const AboutPage = ({ isDark, onToggle, onSignin, onSignup, onBookDemo, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <div style={{ background:T.page, height:"100vh", display:"flex", flexDirection:"column", overflowX:"hidden" }}>
      <AnnouncementBar onSignup={onSignup}/>
      <SiteNav isDark={isDark} onToggle={onToggle} onSignin={onSignin} onSignup={onSignup} screen="about" onNav={onNav}/>
      <div data-scroll="" style={{ flex:1, overflowY:"auto", overflowX:"hidden", WebkitOverflowScrolling:"touch" }}>

        {/* Hero */}
        <section id="top" style={{ padding:`${mob?80:110}px ${mob?20:28}px ${mob?56:80}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:`radial-gradient(ellipse,${T.accent}12 0%,transparent 65%)`, pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:720, margin:"0 auto" }}>
            <FadeIn>
              <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:18 }}>About Halo</p>
            </FadeIn>
            <FadeIn delay={60}>
              <h1 style={{ fontSize:`clamp(${mob?"34px":"44px"},5.5vw,72px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:mob?20:28, fontFamily:"DM Serif Display,serif" }}>
                Built for the business owner<br/>who does everything.
              </h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p style={{ fontSize:mob?16:19, color:T.sub, lineHeight:1.8, maxWidth:580, margin:"0 auto" }}>
                Halo exists because running a service business is relentless. You're the owner, the operator, the accountant, and the customer service team — all at once. Every hour spent replying to messages is an hour not spent on the work that actually earns.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding:`${mob?56:80}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
          <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:mob?40:80, alignItems:"center" }}>
            <FadeIn>
              <div>
                <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Our mission</p>
                <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:20 }}>Give every small business the ops team they could never afford.</h2>
                <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.8, marginBottom:16 }}>Large businesses have operations managers, admin assistants, and customer service teams. Small businesses have the owner's phone. Halo changes that.</p>
                <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.8 }}>We're building the first AI employee purpose-built for UK service businesses — one that reads every message, knows your business inside out, and handles the repetitive work so you can focus on the part only you can do.</p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[
                  { n:"200+", label:"UK businesses using Halo", desc:"Hair studios, personal trainers, clinics, tradespeople, tutors and more." },
                  { n:"8–12h", label:"Saved per business per week", desc:"Hours given back to owners who were drowning in messages." },
                  { n:"<10min", label:"Average setup time", desc:"Answer 6 questions. Your AI employee starts the same day." },
                ].map((s, i) => (
                  <div key={i} style={{ padding:"20px 24px", borderRadius:12, border:`1px solid ${T.border}`, background:T.page }}>
                    <div style={{ fontSize:mob?28:36, fontWeight:700, color:T.accent, fontFamily:"DM Serif Display,serif", lineHeight:1, marginBottom:6 }}>{s.n}</div>
                    <div style={{ fontSize:14, fontWeight:600, color:T.text, marginBottom:4 }}>{s.label}</div>
                    <div style={{ fontSize:13, color:T.sub, lineHeight:1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding:`${mob?56:80}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <FadeIn>
              <div style={{ textAlign:"center", marginBottom:mob?40:56 }}>
                <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>What we believe</p>
                <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1 }}>The principles behind Halo.</h2>
              </div>
            </FadeIn>
            <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<900?"1fr 1fr":"repeat(3,1fr)", gap:14 }}>
              {[
                { title:"Owner in control, always", body:"Halo never sends something the owner wouldn't. Every automated reply reflects the business's tone, policies, and voice — and anything uncertain comes to the owner first." },
                { title:"Simplicity over features", body:"We don't build features for features' sake. Every part of Halo exists because a real business owner needed it. If it adds complexity without adding value, it doesn't ship." },
                { title:"Built for trust", body:"Customers talking to a Halo-powered business should feel like they're talking to a fast, caring, professional team. If it ever feels like a bot, we haven't done our job." },
              ].map((v, i) => (
                <FadeIn key={i} delay={i*80}>
                  <div style={{ padding:"28px 24px", borderRadius:12, border:`1px solid ${T.border}`, background:T.surface }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:T.accent, marginBottom:18 }}/>
                    <h3 style={{ fontSize:16, fontWeight:600, color:T.text, marginBottom:10, lineHeight:1.3 }}>{v.title}</h3>
                    <p style={{ fontSize:13.5, color:T.sub, lineHeight:1.7, margin:0 }}>{v.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <CtaSection onSignup={onSignup} onBookDemo={onBookDemo}/>
        <SiteFooter onNav={onNav}/>
      </div>
    </div>
  );
};

const PricingPage = ({ isDark, onToggle, onSignin, onSignup, onBookDemo, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [annual, setAnnual] = useState(false);
  return (
    <div style={{ background:T.page, height:"100vh", display:"flex", flexDirection:"column" }}>
      <AnnouncementBar onSignup={onSignup}/>
      <SiteNav isDark={isDark} onToggle={onToggle} onSignin={onSignin} onSignup={onSignup} screen="pricing" onNav={onNav}/>
      <div data-scroll="" style={{ flex:1, overflowY:"auto", overflowX:"hidden", WebkitOverflowScrolling:"touch" }}>
        {/* Hero */}
        <section id="top" style={{ padding:`${mob?80:110}px ${mob?20:28}px ${mob?48:64}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:mob?300:700, height:300, background:`radial-gradient(ellipse,${T.accent}12 0%,transparent 65%)`, pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:760, margin:"0 auto" }}>
            <FadeIn>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:99, border:`1px solid ${T.accentBd}`, background:T.accentBg, marginBottom:24 }}>
                <Zap size={11} color={T.accent}/><span style={{ fontSize:12.5, color:T.accent, fontWeight:500 }}>No contracts. Cancel anytime.</span>
              </div>
            </FadeIn>
            <FadeIn delay={60}>
              <h1 style={{ fontSize:`clamp(${mob?"36px":"44px"},6vw,72px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:mob?16:20, fontFamily:"DM Serif Display,serif" }}>
                Hire your AI employee<br/><span style={{ color:T.accent }}>from £29 a month.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p style={{ fontSize:mob?16:18, color:T.sub, lineHeight:1.75, maxWidth:480, margin:"0 auto 32px" }}>
                No HR. No sick days. No salary reviews. Just a reliable AI employee who handles your customer communications, bookings, and invoices — every day, all day.
              </p>
            </FadeIn>
            <FadeIn delay={160}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:0, background:T.surface, border:`1px solid ${T.border}`, borderRadius:99, padding:"5px" }}>
                {["Monthly","Annual — save 20%"].map((l, i) => {
                  const on = (i===0&&!annual)||(i===1&&annual);
                  return <button key={l} onClick={() => setAnnual(i===1)} style={{ padding:"8px 20px", borderRadius:99, border:"none", cursor:"pointer", fontSize:13.5, fontWeight:500, fontFamily:"inherit", background:on?T.accent:"transparent", color:on?"#000":T.sub, transition:"all 0.2s" }}>{l}</button>;
                })}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Pricing cards */}
        <section style={{ padding:`0 ${mob?20:28}px ${mob?64:96}px` }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":w<1024?"1fr 1fr":"repeat(3,1fr)", gap:16 }}>
              {PRICING.map((plan, i) => {
                const price = annual ? plan.yr : plan.mo;
                return (
                  <FadeIn key={plan.name} delay={i*80}>
                    <div style={{ padding:"32px", borderRadius:16, border:`2px solid ${plan.pop?T.accent:T.border}`, background:plan.pop?T.accentBg:T.surface, position:"relative", display:"flex", flexDirection:"column", height:"100%" }}>
                      {plan.pop && <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", fontSize:10.5, fontWeight:700, padding:"4px 14px", borderRadius:"0 0 10px 10px", background:T.accent, color:"#000", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>⭐ MOST POPULAR</div>}
                      <div style={{ marginTop:plan.pop?16:0 }}>
                        <div style={{ fontSize:10.5, fontWeight:700, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{plan.name}</div>
                        <div style={{ fontSize:mob?19:22, fontWeight:700, color:T.text, fontFamily:"DM Serif Display,serif", lineHeight:1.2, marginBottom:16 }}>{plan.tag}</div>
                        <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:8 }}>
                          {price ? <><span style={{ fontSize:48, fontWeight:700, color:T.text, fontFamily:"DM Serif Display,serif", lineHeight:1 }}>£{price}</span><span style={{ fontSize:15, color:T.sub }}>/mo</span></> : <span style={{ fontSize:34, fontWeight:700, color:T.text, fontFamily:"DM Serif Display,serif" }}>Custom</span>}
                        </div>
                        <p style={{ fontSize:13.5, color:T.sub, lineHeight:1.6, marginBottom:20 }}>{plan.desc}</p>
                        {/* Best for + saves */}
                        <div style={{ background:T.raised, borderRadius:8, padding:"12px 14px", marginBottom:20, border:`1px solid ${T.border}` }}>
                          <div style={{ fontSize:11, fontWeight:700, color:T.sub, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:6 }}>Best for</div>
                          <div style={{ fontSize:13, color:T.text, lineHeight:1.5, marginBottom:10 }}>{plan.bestFor}</div>
                          <div style={{ fontSize:11, fontWeight:700, color:T.green, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>You'll save</div>
                          <div style={{ fontSize:13, color:T.green, fontWeight:500 }}>{plan.saves}</div>
                        </div>
                        <button onClick={onSignup} style={{ width:"100%", padding:"13px", borderRadius:9, border:`1px solid ${plan.pop?T.accent:T.border}`, background:plan.pop?T.accent:"transparent", color:plan.pop?"#000":T.text, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit", marginBottom:24 }}
                          onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                          {price ? "Start 14-day free trial" : "Contact us"}
                        </button>
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {plan.features.map((f, fi) => (
                            <div key={fi} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                              <Check size={13} color={T.green} style={{ marginTop:3, flexShrink:0 }}/>
                              <span style={{ fontSize:13.5, color:fi===0&&plan.name!=="Starter"?T.accent:T.sub, fontWeight:fi===0&&plan.name!=="Starter"?500:400, lineHeight:1.5 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
            {/* Trust pills */}
            <FadeIn delay={200}>
              <div style={{ marginTop:36, display:"flex", alignItems:"center", justifyContent:"center", gap:mob?14:32, flexWrap:"wrap" }}>
                {["14-day free trial on all plans","No credit card required","Cancel anytime","Live in under 10 minutes"].map((t, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:T.greenBg, display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={9} color={T.green} strokeWidth={2.5}/></div>
                    <span style={{ fontSize:13, color:T.sub }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* AI Events explanation */}
        <section style={{ padding:`${mob?48:72}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.raised }}>
          <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
            <FadeIn>
              <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>What's an AI Event?</p>
              <h2 style={{ fontSize:`clamp(${mob?"24px":"28px"},3.5vw,44px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:16 }}>You're charged for the work Halo does.<br/>Not just the messages it reads.</h2>
              <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.7, marginBottom:36 }}>An AI Event is any action Halo takes on your behalf. One plan, one number. No hidden per-channel charges.</p>
            </FadeIn>
            <FadeIn delay={80}>
              <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(3,1fr)", gap:10 }}>
                {[
                  { label:"Incoming WhatsApp message" },
                  { label:"Incoming email" },
                  { label:"Booking confirmation" },
                  { label:"Invoice generated" },
                  { label:"Payment reminder sent" },
                  { label:"AI-generated reply" },
                ].map((ev, i) => (
                  <div key={i} style={{ padding:"14px 16px", borderRadius:10, border:`1px solid ${T.border}`, background:T.surface, display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", background:T.accent, flexShrink:0 }}/>
                    <span style={{ fontSize:13, color:T.text, lineHeight:1.4 }}>{ev.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <HaloSetupSection/>
        <FaqSection/>
        <CtaSection onSignup={onSignup} onBookDemo={onBookDemo}/>
        <SiteFooter onNav={onNav}/>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center", marginBottom:mob?40:56 }}>
          <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>FAQ</p>
          <h2 style={{ fontSize:`clamp(${mob?"26px":"30px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1, marginBottom:12 }}>Common questions, answered.</h2>
          <span style={{ display:"inline-block", fontSize:12.5, color:T.muted, background:T.raised, border:`1px solid ${T.border}`, borderRadius:99, padding:"3px 12px" }}>{FAQS.length} questions</span>
        </div></FadeIn>
        {FAQS.map((faq, i) => (
          <FadeIn key={i} delay={i*30}>
            <div style={{ borderBottom:`1px solid ${T.border}` }}>
              <button onClick={() => setOpen(open===i?null:i)} style={{ width:"100%", padding:"20px 0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                <span style={{ fontSize:mob?14.5:16, fontWeight:500, color:T.text, lineHeight:1.4 }}>{faq.q}</span>
                <div style={{ width:28, height:28, borderRadius:7, background:open===i?T.accentBg:T.raised, border:`1px solid ${open===i?T.accentBd:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:open===i?T.accent:T.muted, transition:"all 0.2s" }}>
                  <Plus size={13} style={{ transform:open===i?"rotate(45deg)":"none", transition:"transform 0.25s" }}/>
                </div>
              </button>
              <div style={{ overflow:"hidden", maxHeight:open===i?500:0, opacity:open===i?1:0, transition:"max-height 0.35s ease, opacity 0.3s ease" }}>
                <p style={{ margin:"0 0 20px", fontSize:mob?14:15, color:T.sub, lineHeight:1.8, paddingRight:44 }}>{faq.a}</p>
              </div>
              {/* Peek at next question when this one is collapsed */}
              {open===null && i===2 && (
                <div style={{ padding:"0 0 12px", opacity:0.35, fontSize:mob?13:14, color:T.muted, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span>{FAQS[3]?.q}</span>
                  <ChevronDown size={13} color={T.muted}/>
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const CtaSection = ({ onSignup, onBookDemo }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <section style={{ padding:`${mob?80:120}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
      <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:200, background:`radial-gradient(ellipse,${T.accent}12 0%,transparent 70%)`, pointerEvents:"none" }}/>
        <FadeIn><div style={{ position:"relative" }}>
          <div style={{ width:52, height:52, borderRadius:13, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}><Bot size={26} color="#000" strokeWidth={2.5}/></div>
          <h2 style={{ fontSize:`clamp(${mob?"32px":"36px"},5vw,60px)`, fontWeight:600, color:T.text, letterSpacing:"-0.04em", lineHeight:1.1, marginBottom:18, fontFamily:"DM Serif Display,serif" }}>Your AI employee<br/>is ready to start.</h2>
          <p style={{ fontSize:mob?15:18, color:T.sub, lineHeight:1.7, marginBottom:36, maxWidth:500, margin:"0 auto 36px" }}>Halo isn't just selling AI. It's selling time and peace of mind. Your business keeps running, messages get answered, invoices go out, bookings get confirmed — and you only hear from Halo when something genuinely needs you. Set up in 10 minutes. Free for 14 days.</p>
          <div style={{ display:"flex", flexDirection:mob?"column":"row", gap:12, justifyContent:"center" }}>
            <button onClick={onSignup} style={{ padding:"14px 32px", background:T.accent, border:"none", borderRadius:9, cursor:"pointer", fontSize:15, fontWeight:600, color:"#000", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:mob?"100%":"auto" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Get started free <ArrowRight size={15}/></button>
            <button onClick={onBookDemo} style={{ padding:"14px 32px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:9, cursor:"pointer", fontSize:15, color:T.sub, fontFamily:"inherit", width:mob?"100%":"auto" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderH;e.currentTarget.style.color=T.text;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>Book a demo</button>
          </div>
        </div></FadeIn>
      </div>
    </section>
  );
};

const SiteFooter = ({ onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 640;
  const navigate = onNav || (() => {});
  const NAV_COLS = [
    { heading:"Product",  links:[
      { l:"Features", page:"features", id:"features-top" },
      { l:"Demo",     page:"demo",     id:"top" },
      { l:"Pricing",  page:"pricing",  id:"top" },
      { l:"Bookings", page:"bookings", id:"top" },
      { l:"Invoices", page:"invoices", id:"top" },
    ]},
    { heading:"Company",  links:[{ l:"About", page:"about", id:"top" },{ l:"Blog" },{ l:"Careers" },{ l:"Contact" }] },
    { heading:"Legal",    links:[{ l:"Privacy" },{ l:"Terms" },{ l:"Security" },{ l:"Status" }] },
  ];
  return (
    <footer style={{ borderTop:`1px solid ${T.border}`, padding:`${mob?36:56}px ${mob?20:28}px 28px`, background:T.surface, overflowX:"hidden" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:24, marginBottom:mob?32:48, flexWrap:"wrap" }}>
          <div style={{ maxWidth:220 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:26, height:26, borderRadius:6, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={13} color="#000" strokeWidth={2.5}/></div>
              <span style={{ fontSize:16, fontWeight:600, color:T.text, fontFamily:"DM Serif Display,serif" }}>halo</span>
            </div>
            <p style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>Your AI employee for UK service businesses. Always on. Always in your tone.</p>
          </div>
          {mob ? (
            <div style={{ width:"100%", display:"flex", flexWrap:"wrap", gap:"8px 20px" }}>
              {NAV_COLS.flatMap(col => col.links).map(link => {
                const [h, setH] = useState(false);
                return <button key={link.l} onClick={() => link.page && navigate({page:link.page, id:link.id||"top"})}
                  onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:h?T.text:T.muted, fontFamily:"inherit", padding:0, transition:"color 0.15s" }}>{link.l}</button>;
              })}
            </div>
          ) : (
            <div style={{ display:"flex", gap:48 }}>
              {NAV_COLS.map(col => (
                <div key={col.heading}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.sub, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:14 }}>{col.heading}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                    {col.links.map(link => {
                      const [h, setH] = useState(false);
                      return <button key={link.l} onClick={() => link.page && navigate({page:link.page, id:link.id||"top"})}
                        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                        style={{ background:"none", border:"none", cursor:"pointer", fontSize:13.5, color:h?T.text:T.muted, fontFamily:"inherit", textAlign:"left", padding:0, transition:"color 0.15s" }}>{link.l}</button>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:20, display:"flex", flexDirection:mob?"column":"row", justifyContent:"space-between", alignItems:mob?"flex-start":"center", gap:10 }}>
          <span style={{ fontSize:12, color:T.muted }}>© 2026 Halo Technologies Ltd. Built for UK service businesses.</span>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.green }} className="halo-pulse"/>
            <span style={{ fontSize:12, color:T.muted }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StickyMobileCta = ({ onSignup }) => {
  const T = T_(); const w = useW(); const [vis, setVis] = useState(false);
  useEffect(() => { const el = document.querySelector("[data-scroll]"); if (!el) return; const fn = () => setVis(el.scrollTop > 300); el.addEventListener("scroll", fn); return () => el.removeEventListener("scroll", fn); }, []);
  if (w >= 768) return null;
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200, padding:"12px 16px 20px", background:T.isDark?"rgba(10,10,10,0.96)":"rgba(250,250,250,0.96)", backdropFilter:"blur(12px)", borderTop:`1px solid ${T.border}`, transform:vis?"translateY(0)":"translateY(100%)", transition:"transform 0.3s ease" }}>
      <button onClick={onSignup} style={{ width:"100%", padding:"14px", background:T.accent, border:"none", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:600, color:"#000", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>Get started free <ArrowRight size={15}/></button>
    </div>
  );
};

const HowItWorks = () => {
  const T = T_(); const w = useW(); const mob = w < 640; const cols = mob?1:w<1024?2:4;
  return (
    <section id="how-it-works" style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center", marginBottom:mob?48:72 }}>
          <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>How it works</p>
          <h2 style={{ fontSize:`clamp(${mob?"28px":"32px"},4vw,52px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1 }}>Message to action in seconds.</h2>
        </div></FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)` }}>
          {[{n:"01",t:"Message arrives",d:"A customer reaches out via WhatsApp, Instagram DM, email, or your website. Halo picks it up the moment it lands."},{n:"02",t:"Halo classifies",d:"Intent, urgency, and confidence are assessed in under two seconds. Halo knows what the message means and what to do with it."},{n:"03",t:"Auto-handle or notify",d:"High-confidence replies go out instantly. Anything below threshold comes to you as a one-tap WhatsApp approval."},{n:"04",t:"You stay informed",d:"Business reports land on your schedule — daily, weekly, or monthly — via WhatsApp or email. Every decision logged."}].map((s, i) => (
            <FadeIn key={i} delay={i*80}>
              <div style={{ padding:mob?"24px 0":cols===4?"28px 32px":"28px", borderRight:cols===4&&i<3?`1px solid ${T.border}`:"none", borderBottom:mob&&i<3?`1px solid ${T.border}`:"none" }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.accent, marginBottom:14, letterSpacing:"0.06em" }}>{s.n}</div>
                <h3 style={{ fontSize:mob?17:18, fontWeight:600, color:T.text, marginBottom:10, lineHeight:1.3 }}>{s.t}</h3>
                <p style={{ fontSize:14, color:T.sub, lineHeight:1.7 }}>{s.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const IntegrationsSection = () => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const tags = ["WhatsApp Business","WhatsApp Notifications","Instagram DMs","Gmail","Web Form","Web Widget","Google Calendar"];
  return (
    <section id="integrations" style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
        <FadeIn>
          <p style={{ fontSize:12, fontWeight:600, color:T.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Integrations</p>
          <h2 style={{ fontSize:`clamp(${mob?"26px":"28px"},3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", marginBottom:16, lineHeight:1.1 }}>Your channels, fully wired.</h2>
          <p style={{ fontSize:mob?15:17, color:T.sub, maxWidth:480, margin:"0 auto 36px", lineHeight:1.7 }}>Connect your customer channels and back-office tools. Halo ties them together into a single, automated operations layer.</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {tags.map((tag, i) => <div key={i} style={{ padding:`10px ${mob?14:20}px`, borderRadius:10, border:`1px solid ${T.border}`, background:T.raised, fontSize:mob?13:14, color:T.text, fontWeight:500 }}>{tag}</div>)}
            <div style={{ padding:`10px ${mob?14:20}px`, borderRadius:10, border:`1px solid ${T.border}80`, background:T.raised, fontSize:mob?13:14, color:T.muted, fontWeight:500, display:"flex", alignItems:"center", gap:7 }}>Telegram Bot<span style={{ fontSize:10, color:T.muted, border:`1px solid ${T.border}`, padding:"1px 5px", borderRadius:3 }}>optional</span></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const FT_TABS = [
  { id:"events",        Icon:Zap,           label:"Event Intelligence",  headline:"Every message becomes a structured business action.", body:"Halo reads incoming messages across all your channels, classifies intent in under two seconds, and either acts automatically or sends you a one-tap approval.", stat:"< 2s", statLabel:"classification time", points:["Works across WhatsApp, Instagram, email and web","Confidence score on every classification","Auto-handle or send for your approval"] },
  { id:"notifications", Icon:MessageSquare, label:"Owner Notifications", headline:"Stay in control without watching a dashboard.", body:"When Halo needs your input, it sends a WhatsApp message directly to your phone with context, a suggested reply, and inline approve or dismiss buttons.", stat:"1 tap", statLabel:"to approve and send", points:["Delivered to your WhatsApp — no app to open","Full message context included every time","Edit the reply before it sends"] },
  { id:"assistant",     Icon:Bot,           label:"AI Assistant",        headline:"A sharp business advisor, always on call.", body:"Draft comms, work through pricing, handle difficult client situations, generate invoice reminders. It thinks like an experienced ops manager.", stat:"24/7", statLabel:"always available", points:["Trained on your business context and tone","Ask anything — pricing, policy, client issues","Responses in seconds, not hours"] },
  { id:"pipeline",      Icon:Play,          label:"AI Pipeline",         headline:"See exactly how Halo thinks.", body:"Every message passes through a four-stage classification pipeline. Intent, urgency, suggested reply, and WhatsApp notification built in real time.", stat:"4", statLabel:"pipeline stages", points:["Intent · Urgency · Reply · Notify","Full audit log of every decision","Override or correct any output"] },
];

const FtEventsVisual = ({ T }) => {
  const ev = EVENTS0[0]; const cIC = getIC(T, ev.intent); const cSC = getSC(T, ev.status);
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden", height:"100%" }}>
      <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:6 }}>{ev.name}</div>
        <div style={{ display:"flex", gap:6 }}><Chip label="WhatsApp" color={T.sub} bg={T.raised}/><Chip label="Booking" color={cIC.text} bg={cIC.bg}/><Chip label={cSC.label} color={cSC.text} bg={cSC.bg}/><Chip label="Urgent" color={T.red} bg={T.redBg}/></div>
      </div>
      <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:7 }}>Message</div>
          <div style={{ fontSize:13.5, color:T.text, background:T.raised, padding:"11px 14px", borderRadius:8, lineHeight:1.75, border:`1px solid ${T.border}`, borderLeft:`3px solid ${T.accent}` }}>{ev.msg}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
          {[{l:"Intent",v:"BOOKING",c:T.blue},{l:"Confidence",v:"96%",c:T.green},{l:"Urgency",v:"HIGH",c:T.red},{l:"Action",v:"Book",c:T.accent}].map(f => (
            <div key={f.l} style={{ background:T.raised, border:`1px solid ${T.border}`, borderRadius:7, padding:"9px 11px" }}>
              <div style={{ fontSize:9.5, color:T.muted, marginBottom:3, textTransform:"uppercase", letterSpacing:"0.05em" }}>{f.l}</div>
              <div style={{ fontSize:12, color:f.c, fontWeight:600 }}>{f.v}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:7 }}>Automated Response</div>
          <div style={{ fontSize:13.5, color:T.text, background:T.raised, padding:"11px 14px", borderRadius:8, lineHeight:1.75, border:`1px solid ${T.border}`, borderLeft:`3px solid ${T.green}` }}>{ev.reply}</div>
        </div>
      </div>
    </div>
  );
};

const FtNotifVisual = ({ T }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", padding:"20px" }}>
    <div style={{ background:T.isDark?"#0B1410":"#F0FAF1", borderRadius:20, padding:"22px", border:`1px solid ${T.isDark?"rgba(37,209,102,0.14)":"rgba(37,209,102,0.3)"}`, maxWidth:340, width:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, paddingBottom:14, borderBottom:`1px solid ${T.isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}` }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:"#25D166", display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={20} color="#fff" strokeWidth={2}/></div>
        <div><div style={{ fontSize:15, fontWeight:700, color:T.isDark?"#D9FDD3":"#111" }}>Halo</div><div style={{ fontSize:12, color:T.isDark?"#4A8A5A":"#555" }}>Needs your input · 38% confident</div></div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}><div style={{ width:7, height:7, borderRadius:"50%", background:"#FBBF24" }}/><span style={{ fontSize:11, color:"#FBBF24", fontWeight:600 }}>Review</span></div>
      </div>
      <div style={{ background:T.isDark?"#1A3020":"#D9FDD3", borderRadius:"4px 16px 16px 16px", padding:"13px 15px", marginBottom:12 }}>
        <div style={{ fontSize:11.5, fontWeight:700, color:"#FF6B6B", letterSpacing:"0.04em", marginBottom:5 }}>REFUND REQUEST</div>
        <div style={{ fontSize:13, color:T.isDark?"#C8EED4":"#111", lineHeight:1.75 }}>
          <span style={{ color:T.isDark?"#6AAA7A":"#444" }}>From: </span><span style={{ fontWeight:600 }}>Luke Morrison</span><br/>
          <span style={{ fontStyle:"italic", color:T.isDark?"#A0C8A8":"#333" }}>"I wasn't happy with my last appointment and I want a full refund. This is unacceptable."</span>
        </div>
      </div>
      <div style={{ fontSize:12, color:T.isDark?"#5A9A6A":"#555", marginBottom:12, lineHeight:1.55 }}>
        Halo has flagged this as sensitive. A refund decision needs you — it won't act without your input.
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:7 }}>
        {[["Approve","#1A3A22","#25D166"],["Edit","#162A1E","#6AAA7A"],["Dismiss","#2A1818","#F87171"]].map(([label,bg,col]) => {
          const [h,setH]=useState(false);
          return <button key={label} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ padding:"9px 6px", background:h?bg+(T.isDark?"CC":"99"):(T.isDark?bg:"#fff"), border:`1px solid ${col}25`, borderRadius:9, cursor:"pointer", fontFamily:"inherit", display:"flex", flexDirection:"column", alignItems:"center", gap:3, transition:"all 0.15s" }}><span style={{ fontSize:10.5, fontWeight:600, color:col }}>{label}</span></button>;
        })}
      </div>
    </div>
  </div>
);

const FT_CONVO = [
  { r:"user", t:"How should I handle a client who keeps cancelling last minute?" },
  { r:"ai",   t:"Introduce a 48-hour cancellation policy with a 50% late fee. Most service businesses see a 70% drop in no-shows within the first month. Want me to draft the policy?" },
  { r:"user", t:"Yes please" },
  { r:"ai",   t:"Here you go: We require 48 hours notice for cancellations. Late cancellations incur a 50% service fee. Want me to write a friendly message to send your clients?" },
];

const FtAssistantVisual = ({ T }) => (
  <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden", height:"100%", display:"flex", flexDirection:"column" }}>
    <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
      <div style={{ width:30, height:30, borderRadius:8, background:T.accentBg, border:`1px solid ${T.accentBd}`, display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={15} color={T.accent} strokeWidth={2}/></div>
      <div><div style={{ fontSize:13.5, fontWeight:600, color:T.text }}>AI Assistant</div><div style={{ fontSize:11.5, color:T.sub }}>Ask anything about your business</div></div>
    </div>
    <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
      {FT_CONVO.map((m, i) => (
        <div key={i} style={{ display:"flex", justifyContent:m.r==="user"?"flex-end":"flex-start", gap:8 }}>
          {m.r==="ai" && <div style={{ width:22, height:22, borderRadius:6, background:T.accentBg, border:`1px solid ${T.accentBd}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Bot size={11} color={T.accent} strokeWidth={2}/></div>}
          <div style={{ maxWidth:"76%", padding:"10px 13px", borderRadius:m.r==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", background:m.r==="user"?T.accent:T.raised, color:m.r==="user"?"#000":T.text, fontSize:13, lineHeight:1.65, border:m.r==="ai"?`1px solid ${T.border}`:"none" }}>{m.t}</div>
        </div>
      ))}
    </div>
  </div>
);

const FtPipelineVisual = ({ T }) => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, alignContent:"start" }}>
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px" }}>
      <div style={{ fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Pipeline stages</div>
      {["Message received","Intent classified","Reply generated","Reply sent"].map((s,i) => (
        <div key={i} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:i<3?12:0 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:T.greenBg, border:`1px solid ${T.green}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={12} color={T.green} strokeWidth={2.5}/></div>
          <span style={{ fontSize:13, color:T.text, fontWeight:500 }}>{s}</span>
        </div>
      ))}
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
          {[{l:"Intent",v:"BOOKING",c:"#60A5FA"},{l:"Confidence",v:"96%",c:"#4ADE80"},{l:"Urgency",v:"HIGH",c:"#F87171"},{l:"Action",v:"Book",c:T.accent}].map(f => (
            <div key={f.l} style={{ background:T.raised, border:`1px solid ${T.border}`, borderRadius:7, padding:"9px 10px" }}>
              <div style={{ fontSize:9, color:T.muted, marginBottom:2, textTransform:"uppercase", letterSpacing:"0.05em" }}>{f.l}</div>
              <div style={{ fontSize:12, color:f.c, fontWeight:700 }}>{f.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:"#0A1A0E", borderRadius:12, padding:"14px", border:"1px solid rgba(37,209,102,0.12)" }}>
        <div style={{ fontSize:10, fontWeight:600, color:"#3A8A4A", letterSpacing:"0.07em", marginBottom:7 }}>AUTO-HANDLED ✓</div>
        <div style={{ fontSize:12, color:"#A0D4B0", lineHeight:1.7 }}><strong style={{ color:"#DCF8E4" }}>96% confident</strong> — reply sent automatically.<br/><em style={{ color:"#5A9A6A" }}>No input needed from you.</em></div>
      </div>
    </div>
  </div>
);

const FeaturesPage = ({ isDark, onToggle, onSignin, onSignup, onBookDemo, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [tab, setTab] = useState("events");
  const cur = FT_TABS.find(t => t.id === tab);
  return (
    <div data-scroll="" style={{ background:T.page, color:T.text, height:"100vh", overflowY:"auto", transition:"background 0.25s,color 0.25s" }}>
      <SiteNav isDark={isDark} onToggle={onToggle} onSignin={onSignin} onSignup={onSignup} screen="features" onNav={onNav}/>
      <section id="features-top" style={{ padding:`${mob?80:100}px ${mob?20:28}px ${mob?40:56}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
          <FadeIn><button onClick={() => onNav({page:"website",id:"top"})} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:T.sub, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", marginBottom:28 }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.sub}><ArrowRight size={12} style={{transform:"rotate(180deg)"}}/> Back to home</button></FadeIn>
          <FadeIn delay={40}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:99, border:`1px solid ${T.accent}30`, background:T.accentBg, marginBottom:22 }}>
              <Zap size={11} color={T.accent}/>
              <span style={{ fontSize:12.5, color:T.accent, fontWeight:500 }}>Platform features</span>
            </div>
          </FadeIn>
          <FadeIn delay={60}><h1 style={{ fontSize:`clamp(${mob?"34px":"44px"},5vw,72px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:20, fontFamily:"DM Serif Display,serif" }}>Everything Halo can do.</h1></FadeIn>
          <FadeIn delay={120}><p style={{ fontSize:mob?16:18, color:T.sub, lineHeight:1.75, maxWidth:480, margin:"0 auto 36px" }}>From the moment a customer reaches out to the moment the job is done.</p></FadeIn>
          <FadeIn delay={180}>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={onSignup} style={{ padding:"12px 26px", background:T.accent, border:"none", borderRadius:9, cursor:"pointer", fontSize:14.5, fontWeight:600, color:"#000", fontFamily:"inherit", display:"flex", alignItems:"center", gap:7 }} onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Start for free <ArrowRight size={14}/></button>
              <button onClick={onBookDemo} style={{ padding:"12px 26px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:9, cursor:"pointer", fontSize:14.5, color:T.sub, fontFamily:"inherit" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderH;e.currentTarget.style.color=T.text;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>Book a demo</button>
            </div>
          </FadeIn>
        </div>
      </section>
      <section id="feature-showcase" style={{ padding:`0 ${mob?20:28}px ${mob?64:96}px`, background:T.page }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32, justifyContent:mob?"flex-start":"center" }}>
              {FT_TABS.map(t => {
                const active = tab===t.id; const [h, setH] = useState(false);
                return <button key={t.id} onClick={() => setTab(t.id)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:9, border:`1px solid ${active?T.accent:h?T.borderH:T.border}`, background:active?T.accentBg:h?T.raised:"transparent", cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s" }}>
                  <t.Icon size={13} color={active?T.accent:h?T.text:T.sub} strokeWidth={2}/><span style={{ fontSize:13, fontWeight:active?600:400, color:active?T.accent:h?T.text:T.sub }}>{t.label}</span>
                </button>;
              })}
            </div>
            {cur && (
              <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1.2fr", gap:mob?32:64, alignItems:"start" }}>
                <div>
                  <h2 style={{ fontSize:`clamp(${mob?"24px":"28px"},3vw,42px)`, fontWeight:600, color:T.text, lineHeight:1.15, letterSpacing:"-0.03em", marginBottom:16, fontFamily:"DM Serif Display,serif" }}>{cur.headline}</h2>
                  <p style={{ fontSize:mob?15:17, color:T.sub, lineHeight:1.8, marginBottom:20 }}>{cur.body}</p>
                  <div style={{ marginBottom:28 }}>
                    {cur.points.map((pt, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9 }}>
                        <div style={{ width:18, height:18, borderRadius:"50%", background:T.accentBg, border:`1px solid ${T.accentBd}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <Check size={10} color={T.accent} strokeWidth={2.5}/>
                        </div>
                        <span style={{ fontSize:13.5, color:T.sub }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize:"clamp(40px,4vw,56px)", fontWeight:700, color:T.accent, fontFamily:"DM Serif Display,serif", letterSpacing:"-0.04em", lineHeight:1 }}>{cur.stat}</div>
                  <div style={{ fontSize:13, color:T.muted, marginTop:6 }}>{cur.statLabel}</div>
                </div>
                <div style={{ height:mob?360:440 }}>
                  <div style={{ height:"100%", animation:"halo-screen 0.3s ease" }} key={tab}>
                    {tab==="events"        && <FtEventsVisual T={T}/>}
                    {tab==="notifications" && <FtNotifVisual T={T}/>}
                    {tab==="assistant"     && <FtAssistantVisual T={T}/>}
                    {tab==="pipeline"      && <FtPipelineVisual T={T}/>}
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
      <section style={{ padding:`0 ${mob?20:28}px ${mob?48:64}px`, background:T.page }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:mob?40:56, display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:14 }}>
              {[{pg:"bookings",col:T.green,cbg:T.greenBg,Icon:Calendar,t:"Booking automation",d:"From the first customer message to a confirmed calendar event — see the full flow.",cta:"See how bookings work"},{pg:"invoices",col:T.purple,cbg:T.purpleBg,Icon:Layers,t:"Invoice automation",d:"Request received, invoice generated by AI, approved by you, emailed to the client.",cta:"See how invoices work"}].map(card => {
                const [h, setH] = useState(false);
                return (
                  <div key={card.pg} onClick={() => onNav({page:card.pg,id:"top"})} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                    style={{ background:T.surface, border:`1px solid ${h?card.col+"40":T.border}`, borderRadius:14, padding:"28px", cursor:"pointer", transition:"all 0.2s", transform:h?"translateY(-2px)":"none" }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:card.cbg, border:`1px solid ${card.col}20`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}><card.Icon size={20} color={card.col} strokeWidth={1.75}/></div>
                    <div style={{ fontSize:16, fontWeight:600, color:T.text, marginBottom:10 }}>{card.t}</div>
                    <p style={{ fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:18 }}>{card.d}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13.5, fontWeight:500, color:card.col }}>{card.cta} <ArrowRight size={13} style={{transition:"transform 0.2s",transform:h?"translateX(3px)":"none"}}/></div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>
      <HowItWorks/>
      <ConfidenceSection/>
      <HaloMemorySection/>
      <BusinessReportsSection/>
      <IndustryStrip/>
      <IntegrationsSection/>
      <CtaSection onSignup={onSignup} onBookDemo={onBookDemo}/>
      <SiteFooter onNav={onNav}/>
    </div>
  );
};

const FlowDiagram = ({ steps }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive(a => (a+1)%steps.length), 2200); return () => clearInterval(t); }, [steps.length]);
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      {steps.map((s, i) => {
        const on = active===i; const done = active>i;
        return (
          <div key={i} style={{ display:"flex", gap:mob?14:20, alignItems:"flex-start", opacity:done?0.5:on?1:0.35, transition:"opacity 0.5s ease" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:done?T.greenBg:on?s.col+"18":T.raised, border:`2px solid ${done?T.green:on?s.col:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.5s", flexShrink:0 }}>
                {done ? <Check size={15} color={T.green} strokeWidth={2.5}/> : <s.Icon size={15} color={on?s.col:T.muted} strokeWidth={on?2:1.5}/>}
              </div>
              {i < steps.length-1 && <div style={{ width:2, height:mob?32:40, background:done?T.green+"40":T.border, transition:"background 0.5s", margin:"4px 0" }}/>}
            </div>
            <div style={{ paddingTop:6, paddingBottom:i<steps.length-1?mob?28:36:0 }}>
              <div style={{ fontSize:mob?14:15, fontWeight:600, color:on?T.text:T.sub, marginBottom:4, transition:"color 0.4s" }}>{s.title}</div>
              <div style={{ fontSize:mob?13:14, color:T.muted, lineHeight:1.65 }}>{s.desc}</div>
              {on && s.detail && <div style={{ marginTop:10, padding:"9px 13px", borderRadius:8, background:s.col+"08", border:`1px solid ${s.col}20`, fontSize:13, color:T.sub, lineHeight:1.6, animation:"halo-screen 0.3s ease" }}>{s.detail}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BOOK_STEPS = [
  { Icon:MessageSquare, col:"#25D166", title:"Customer reaches out",      desc:"A message arrives via WhatsApp, Instagram DM, email, or your web widget.", detail:'e.g. "Any slots this Friday for a cut and colour?"' },
  { Icon:Zap,           col:"#E8945A", title:"Halo classifies instantly",  desc:"Intent detected as BOOKING in under 2 seconds. Service and date extracted.", detail:"Confidence: 96% - Action: Create Booking" },
  { Icon:Bot,           col:"#60A5FA", title:"Availability checked",       desc:"Halo queries Google Calendar in real time and finds your open slots.", detail:"Friday 14:00 and 16:00 are both available" },
  { Icon:Send,          col:"#E8945A", title:"Reply sent automatically",    desc:"Halo sends a confirmation reply instantly. No input needed from you.", detail:null },
  { Icon:Check,         col:"#4ADE80", title:"Booking confirmed",          desc:"Customer confirms. Halo creates the calendar event and sends a confirmation.", detail:"Calendar event created - Confirmation sent" },
];

const BookingDemo = () => {
  const T = T_();
  const [phase, setPhase] = useState(0);
  const [idx, setIdx] = useState(0);
  const reply = "Hi Sarah! We have 2pm or 4pm on Friday. Which works best for you?";
  const confirm = "Perfect! You are booked in for Friday at 2pm for a cut and colour. See you then.";
  useEffect(() => {
    let t;
    if (phase===0) t = setTimeout(()=>setPhase(1), 1000);
    else if (phase===1) { if (idx<reply.length) t=setTimeout(()=>setIdx(i=>i+1),22); else t=setTimeout(()=>setPhase(2),700); }
    else if (phase===2) t = setTimeout(()=>setPhase(3),1200);
    else if (phase===3) t = setTimeout(()=>setPhase(4),1000);
    else if (phase===4) t = setTimeout(()=>setPhase(5),600);
    else if (phase===5) t = setTimeout(()=>setPhase(6),3500);
    else if (phase===6) t = setTimeout(()=>{setPhase(0);setIdx(0);},400);
    return ()=>clearTimeout(t);
  }, [phase, idx]);
  const Bub = ({from,text,stream}) => (
    <div style={{display:"flex",justifyContent:from==="c"?"flex-end":"flex-start",marginBottom:10,gap:8,alignItems:"flex-end"}}>
      {from==="h" && <div style={{width:28,height:28,borderRadius:"50%",background:"#25D166",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Bot size={14} color="#fff" strokeWidth={2}/></div>}
      <div style={{maxWidth:"78%",padding:"10px 13px",borderRadius:from==="c"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:from==="c"?"#25D166":T.raised,color:from==="c"?"#000":T.text,fontSize:13.5,lineHeight:1.65,border:from==="h"?`1px solid ${T.border}`:"none"}}>
        {text}{stream && <span style={{display:"inline-block",width:2,height:13,background:T.accent,marginLeft:1,verticalAlign:"text-bottom",animation:"halo-cursor 0.7s ease-in-out infinite"}}/>}
      </div>
    </div>
  );
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,background:T.raised,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:"#25D166",display:"flex",alignItems:"center",justifyContent:"center"}}><Bot size={16} color="#fff" strokeWidth={2}/></div>
        <div><div style={{fontSize:13.5,fontWeight:600,color:T.text}}>Halo - WhatsApp</div><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:5,height:5,borderRadius:"50%",background:"#25D166",animation:"halo-pulse 2s ease-in-out infinite"}}/><span style={{fontSize:11,color:"#25D166"}}>Online</span></div></div>
        <div style={{marginLeft:"auto",fontSize:11,color:T.muted}}>Instagram DM to WhatsApp</div>
      </div>
      <div style={{flex:1,padding:"14px 16px",minHeight:180}}>
        {phase>=0 && <Bub from="c" text="Any slots this Friday for a cut and colour?"/>}
        {phase===1 && (
          <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:10}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"#25D166",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Bot size={14} color="#fff" strokeWidth={2}/></div>
            <div style={{padding:"10px 13px",borderRadius:"14px 14px 14px 4px",background:T.raised,border:`1px solid ${T.border}`,display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(j=><span key={j} style={{width:6,height:6,borderRadius:"50%",background:T.accent,display:"inline-block",opacity:0.5,animation:`halo-bounce 1s ease-in-out ${j*0.16}s infinite`}}/>)}
            </div>
          </div>
        )}
        {(phase===1||phase>=2) && <Bub from="h" text={phase===1?reply.slice(0,idx):reply} stream={phase===1}/>}
        {phase>=3 && <Bub from="c" text="2pm please!"/>}
        {phase>=4 && <Bub from="h" text={confirm}/>}
      </div>
      {phase>=5 && (
        <div style={{margin:"0 14px 14px",borderRadius:10,background:T.redBg,border:`1px solid ${T.red}22`,padding:"12px 14px",animation:"halo-screen 0.4s ease",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}><div style={{width:6,height:6,borderRadius:1,background:T.red}}/><span style={{fontSize:10.5,fontWeight:700,color:T.red,letterSpacing:"0.05em"}}>GOOGLE CALENDAR - EVENT CREATED</span></div>
          <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:4}}>Cut and Colour - Sarah Mitchell</div>
          <div style={{fontSize:13,color:T.sub}}>Friday, 18 April 2026 - 14:00-15:30</div>
          <div style={{display:"flex",gap:5,marginTop:8,alignItems:"center"}}><Check size={12} color={T.green}/><span style={{fontSize:12,color:T.green,fontWeight:500}}>Confirmation sent to customer</span></div>
        </div>
      )}
    </div>
  );
};

const BookingsPage = ({ isDark, onToggle, onSignin, onSignup, onBookDemo, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <div data-scroll="" style={{ background:T.page, color:T.text, height:"100vh", overflowY:"auto", transition:"background 0.25s,color 0.25s" }}>
      <SiteNav isDark={isDark} onToggle={onToggle} onSignin={onSignin} onSignup={onSignup} screen="bookings" onNav={onNav}/>
      <section id="top" style={{ padding:`${mob?80:100}px ${mob?20:28}px ${mob?48:64}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"55%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:`radial-gradient(ellipse,${T.green}12 0%,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
          <FadeIn><button onClick={() => onNav({page:"features",id:"features-top"})} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:T.sub, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", marginBottom:28 }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.sub}><ArrowRight size={12} style={{transform:"rotate(180deg)"}}/> Back to features</button></FadeIn>
          <FadeIn delay={60}><div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:99, border:`1px solid ${T.green}30`, background:T.green+"10", marginBottom:24 }}><Calendar size={11} color={T.green}/><span style={{ fontSize:12.5, color:T.green, fontWeight:500 }}>Booking automation</span></div></FadeIn>
          <FadeIn delay={100}><h1 style={{ fontSize:`clamp(${mob?"34px":"44px"},5vw,72px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:20, fontFamily:"DM Serif Display,serif" }}>From message to booking in seconds.</h1></FadeIn>
          <FadeIn delay={160}><p style={{ fontSize:mob?16:18, color:T.sub, lineHeight:1.75, maxWidth:520, margin:"0 auto 36px" }}>Halo checks your availability, replies to the customer, and creates the calendar event — all without you lifting a finger.</p></FadeIn>
          <FadeIn delay={220}><div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={onSignup} style={{ padding:"12px 26px", background:T.green, border:"none", borderRadius:9, cursor:"pointer", fontSize:14.5, fontWeight:600, color:"#000", fontFamily:"inherit", display:"flex", alignItems:"center", gap:7 }} onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Start for free <ArrowRight size={14}/></button>
            <button onClick={onBookDemo} style={{ padding:"12px 26px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:9, cursor:"pointer", fontSize:14.5, color:T.sub, fontFamily:"inherit" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderH;e.currentTarget.style.color=T.text;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>Book a demo</button>
          </div></FadeIn>
        </div>
      </section>
      <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn><div style={{ textAlign:"center", marginBottom:mob?48:64 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.green, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>How it works</p>
            <h2 style={{ fontSize:`clamp(28px,3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1 }}>Five steps. Zero effort.</h2>
          </div></FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:mob?48:64, alignItems:"start" }}>
            <FadeIn delay={80}><FlowDiagram steps={BOOK_STEPS}/></FadeIn>
            <FadeIn delay={160} y={32}><BookingDemo/></FadeIn>
          </div>
        </div>
      </section>
      <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(3,1fr)", gap:20 }}>
            {[{Icon:Bot,t:"Real availability, in real time",d:"Halo queries your Google Calendar before every reply. It never offers a slot you have already filled, and never double-books."},{Icon:MessageSquare,t:"Replies in your voice",d:"You define your tone and service descriptions in Settings. Halo uses them every time."},{Icon:Check,t:"You stay in control",d:"Halo asks for approval before sending anything. One tap to approve, or edit the reply before it goes out."}].map((c,i) => (
              <FadeIn key={i} delay={i*80}><div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"24px 26px" }}>
                <div style={{ width:36, height:36, borderRadius:9, background:T.greenBg, border:`1px solid ${T.green}22`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}><c.Icon size={17} color={T.green} strokeWidth={1.75}/></div>
                <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:9 }}>{c.t}</div>
                <div style={{ fontSize:14, color:T.sub, lineHeight:1.7 }}>{c.d}</div>
              </div></FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CtaSection onSignup={onSignup} onBookDemo={onBookDemo}/>
      <SiteFooter onNav={onNav}/>
    </div>
  );
};

const INV_STEPS = [
  { Icon:MessageSquare, col:"#A78BFA", title:"Customer requests an invoice", desc:"Message arrives: Can you send me an invoice for last Tuesday?", detail:"Channel: Email - Intent: INVOICE - Confidence: 99%" },
  { Icon:Zap,           col:"#E8945A", title:"Halo extracts the details",     desc:"Service, date, and customer name pulled automatically from the message.", detail:"Service: Deep Tissue - Date: Tue 8 Apr - Rate: 65" },
  { Icon:Bot,           col:"#A78BFA", title:"Invoice generated with AI",     desc:"Halo builds a professional invoice with correct line items and due date.", detail:"INV-0047 - 65.00 - Due in 7 days" },
  { Icon:Send,          col:"#E8945A", title:"Invoice emailed to customer",   desc:"Halo sends the invoice directly to the customer. For amounts above your threshold, you get a one-tap review first.", detail:null },
  { Icon:Send,          col:"#4ADE80", title:"Invoice emailed to the customer",desc:"Halo emails the PDF invoice and logs the payment as outstanding.", detail:"Invoice sent - Awaiting payment" },
];

const InvoiceDemo = () => {
  const T = T_();
  const [phase, setPhase] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const summary = "INV-0047 - 65.00 - Due 25 Apr 2026";
  useEffect(() => {
    let t;
    if (phase===0) t=setTimeout(()=>setPhase(1),900);
    else if (phase===1) t=setTimeout(()=>setPhase(2),1600);
    else if (phase===2) { if (charIdx<summary.length) t=setTimeout(()=>setCharIdx(i=>i+1),30); else t=setTimeout(()=>setPhase(3),700); }
    else if (phase===3) t=setTimeout(()=>setPhase(4),4000);
    else if (phase===4) t=setTimeout(()=>setPhase(5),3500);
    else if (phase===5) t=setTimeout(()=>{setPhase(0);setCharIdx(0);},400);
    return ()=>clearTimeout(t);
  }, [phase, charIdx]);
  const labels = ["Request","Generating","Building","Review","Sent"];
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden"}}>
      <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,background:T.raised,display:"flex",alignItems:"center",gap:0,overflowX:"auto"}}>
        {labels.map((s,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:phase>i?T.purpleBg:phase===i?"rgba(167,139,250,0.15)":T.raised,border:`1px solid ${phase>i?T.purple+"50":phase===i?T.purple+"30":T.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.4s",flexShrink:0}}>
                {phase>i ? <Check size={10} color={T.purple} strokeWidth={2.5}/> : <span style={{fontSize:9,fontWeight:700,color:phase===i?T.purple:T.muted}}>{i+1}</span>}
              </div>
              <span style={{fontSize:11,fontWeight:phase>=i?500:400,color:phase>=i?T.text:T.muted,whiteSpace:"nowrap"}}>{s}</span>
            </div>
            {i<labels.length-1 && <div style={{width:16,height:1,background:phase>i?T.purple+"40":T.border,margin:"0 6px",flexShrink:0}}/>}
          </div>
        ))}
      </div>
      <div style={{padding:"14px 16px"}}>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10.5,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:7}}>Customer request</div>
          <div style={{fontSize:13.5,color:T.text,background:T.raised,padding:"11px 14px",borderRadius:8,lineHeight:1.7,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.purple}`}}>
            "Hi, please could you send me an invoice for last Tuesday's deep tissue massage?"
          </div>
        </div>
        {phase===1 && (
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,background:T.raised,border:`1px solid ${T.border}`,marginBottom:12,animation:"halo-screen 0.2s ease"}}>
            <RefreshCw size={13} color={T.purple} style={{animation:"halo-spin 0.8s linear infinite",flexShrink:0}}/>
            <span style={{fontSize:13,color:T.sub}}>Generating invoice with AI...</span>
          </div>
        )}
        {phase>=2 && (
          <div style={{borderRadius:10,background:T.raised,border:`1px solid ${T.border}`,overflow:"hidden",marginBottom:10,animation:"halo-screen 0.4s ease"}}>
            <div style={{background:T.purpleBg,padding:"9px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:2,background:T.purple}}/><span style={{fontSize:11,fontWeight:700,color:T.purple,letterSpacing:"0.05em"}}>INVOICE GENERATED</span></div>
              <span style={{fontSize:12,fontWeight:700,color:T.purple}}>INV-0047</span>
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <div><div style={{fontSize:10,color:T.muted,marginBottom:2}}>BILL TO</div><div style={{fontSize:13.5,fontWeight:600,color:T.text}}>James Okafor</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:10,color:T.muted,marginBottom:2}}>DUE DATE</div><div style={{fontSize:13,color:T.text}}>25 Apr 2026</div></div>
              </div>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:8,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13.5,color:T.text}}>Deep Tissue Massage</span><span style={{fontSize:13.5,fontWeight:600,color:T.text}}>£65.00</span></div>
              </div>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13.5,fontWeight:700,color:T.text}}>Total</span>
                <span style={{fontSize:20,fontWeight:700,color:T.accent,fontFamily:"DM Serif Display,serif"}}>£65.00</span>
              </div>
            </div>
            <div style={{background:T.surface,borderTop:`1px solid ${T.border}`,padding:"8px 14px",display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:phase>=4?"#25D166":T.purple,flexShrink:0,transition:"background 0.4s"}}/>
              <span style={{fontSize:11.5,color:T.sub}}>
                {phase===2 && <>{summary.slice(0,charIdx)}{charIdx<summary.length && <span style={{display:"inline-block",width:2,height:11,background:T.accent,marginLeft:1,verticalAlign:"text-bottom",animation:"halo-cursor 0.7s ease-in-out infinite"}}/>}</>}
                {phase===3 && "Awaiting your approval..."}
                {phase>=4 && "Invoice emailed to james@email.com"}
              </span>
            </div>
          </div>
        )}
        {phase===3 && (
          <div style={{display:"flex",gap:9,animation:"halo-screen 0.3s ease"}}>
            <button onClick={()=>setPhase(4)} style={{flex:1,padding:"10px 16px",background:T.accent,border:"none",borderRadius:8,color:"#000",fontSize:13.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Check size={13}/> Approve and send</button>
            <button style={{padding:"10px 14px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:8,color:T.sub,cursor:"pointer",fontFamily:"inherit",fontSize:13.5}}>Edit</button>
          </div>
        )}
        {phase>=4 && (
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"10px 14px",borderRadius:8,background:T.greenBg,border:`1px solid ${T.green}22`,animation:"halo-screen 0.3s ease"}}>
            <Check size={14} color={T.green}/><span style={{fontSize:13.5,color:T.green}}>Invoice emailed — awaiting payment</span>
          </div>
        )}
      </div>
    </div>
  );
};

const InvoicesPage = ({ isDark, onToggle, onSignin, onSignup, onBookDemo, onNav }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  return (
    <div data-scroll="" style={{ background:T.page, color:T.text, height:"100vh", overflowY:"auto", transition:"background 0.25s,color 0.25s" }}>
      <SiteNav isDark={isDark} onToggle={onToggle} onSignin={onSignin} onSignup={onSignup} screen="invoices" onNav={onNav}/>
      <section id="top" style={{ padding:`${mob?80:100}px ${mob?20:28}px ${mob?48:64}px`, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.grid} 1px,transparent 1px),linear-gradient(90deg,${T.grid} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"55%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:`radial-gradient(ellipse,${T.purple}12 0%,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
          <FadeIn><button onClick={() => onNav({page:"features",id:"features-top"})} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:T.sub, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", marginBottom:28 }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.sub}><ArrowRight size={12} style={{transform:"rotate(180deg)"}}/> Back to features</button></FadeIn>
          <FadeIn delay={60}><div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:99, border:`1px solid ${T.purple}30`, background:T.purple+"10", marginBottom:24 }}><Layers size={11} color={T.purple}/><span style={{ fontSize:12.5, color:T.purple, fontWeight:500 }}>Invoice automation</span></div></FadeIn>
          <FadeIn delay={100}><h1 style={{ fontSize:`clamp(${mob?"34px":"44px"},5vw,72px)`, fontWeight:600, color:T.text, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:20, fontFamily:"DM Serif Display,serif" }}>Invoices sent before you can think twice.</h1></FadeIn>
          <FadeIn delay={160}><p style={{ fontSize:mob?16:18, color:T.sub, lineHeight:1.75, maxWidth:520, margin:"0 auto 36px" }}>A customer asks for an invoice. Halo reads the request, builds the document, and emails it automatically. For high-value invoices, you set the threshold.</p></FadeIn>
          <FadeIn delay={220}><div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={onSignup} style={{ padding:"12px 26px", background:T.purple, border:"none", borderRadius:9, cursor:"pointer", fontSize:14.5, fontWeight:600, color:"#fff", fontFamily:"inherit", display:"flex", alignItems:"center", gap:7 }} onMouseEnter={e=>e.currentTarget.style.opacity=".84"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Start for free <ArrowRight size={14}/></button>
            <button onClick={onBookDemo} style={{ padding:"12px 26px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:9, cursor:"pointer", fontSize:14.5, color:T.sub, fontFamily:"inherit" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderH;e.currentTarget.style.color=T.text;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>Book a demo</button>
          </div></FadeIn>
        </div>
      </section>
      <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.surface }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn><div style={{ textAlign:"center", marginBottom:mob?48:64 }}>
            <p style={{ fontSize:12, fontWeight:600, color:T.purple, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>How it works</p>
            <h2 style={{ fontSize:`clamp(28px,3.5vw,48px)`, fontWeight:600, color:T.text, letterSpacing:"-0.03em", fontFamily:"DM Serif Display,serif", lineHeight:1.1 }}>Request to invoice in five steps.</h2>
          </div></FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:mob?48:64, alignItems:"start" }}>
            <FadeIn delay={80}><FlowDiagram steps={INV_STEPS}/></FadeIn>
            <FadeIn delay={160} y={32}><InvoiceDemo/></FadeIn>
          </div>
        </div>
      </section>
      <section style={{ padding:`${mob?64:96}px ${mob?20:28}px`, borderTop:`1px solid ${T.border}`, background:T.page }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(3,1fr)", gap:20 }}>
            {[{Icon:Bot,t:"AI-generated, always accurate",d:"Halo reads the request, matches it to your service list, applies VAT if applicable, and builds the invoice in seconds. No templates, no manual entry."},{Icon:Check,t:"You set the threshold",d:"Invoices under your approval threshold send automatically. Above it — say £500 — Halo sends you a one-tap review first. You decide where the line is."},{Icon:MessageSquare,t:"Payment tracking built in",d:"Once sent, Halo marks the invoice as outstanding. When the payment clears, it logs it as paid and includes it in your next business report."}].map((c,i) => (
              <FadeIn key={i} delay={i*80}><div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"24px 26px" }}>
                <div style={{ width:36, height:36, borderRadius:9, background:T.purpleBg, border:`1px solid ${T.purple}22`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}><c.Icon size={17} color={T.purple} strokeWidth={1.75}/></div>
                <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:9 }}>{c.t}</div>
                <div style={{ fontSize:14, color:T.sub, lineHeight:1.7 }}>{c.d}</div>
              </div></FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CtaSection onSignup={onSignup} onBookDemo={onBookDemo}/>
      <SiteFooter onNav={onNav}/>
    </div>
  );
};

const AuthScreen = ({ mode, onSuccess, onSwitch, onBack, isDark, onToggle }) => {
  const T = T_(); const w = useW(); const mob = w < 640; const isUp = mode==="signup";
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [name,setName]=useState("");
  const [showPw,setShowPw]=useState(false); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const submit = async () => {
    if (!email||!pw||(isUp&&!name)) { setErr("Please fill in all fields."); return; }
    if (pw.length<6) { setErr("Password must be at least 6 characters."); return; }
    setErr(""); setLoading(true); await new Promise(r=>setTimeout(r,900)); setLoading(false); onSuccess();
  };
  return (
    <div style={{ minHeight:"100vh", background:T.page, display:"flex", flexDirection:"column" }}>
      <div style={{ height:60, borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:`0 ${mob?18:28}px` }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer" }}>
          <div style={{ width:26, height:26, borderRadius:6, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={13} color="#000" strokeWidth={2.5}/></div>
          <span style={{ fontSize:16, fontWeight:600, color:T.text, fontFamily:"DM Serif Display,serif" }}>halo</span>
        </button>
        <ThemeBtn isDark={isDark} onToggle={onToggle}/>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:mob?"24px 18px":"40px 28px" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <div style={{ marginBottom:28, textAlign:"center" }}>
            <h1 style={{ fontSize:mob?24:28, fontWeight:600, color:T.text, marginBottom:10, fontFamily:"DM Serif Display,serif" }}>{isUp?"Create your account":"Welcome back"}</h1>
            <p style={{ fontSize:14.5, color:T.sub }}>{isUp?"14-day free trial. No credit card required.":"Sign in to your Halo workspace."}</p>
          </div>
          {err && <div style={{fontSize:13,color:T.red,background:T.redBg,border:`1px solid ${T.red}22`,borderRadius:7,padding:"10px 14px",marginBottom:14}}>{err}</div>}
          <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:18 }}>
            {isUp && (
              <div>
                <label style={{display:"block",fontSize:13,fontWeight:500,color:T.sub,marginBottom:6}}>Full name</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Jennifer O." style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:T.input,color:T.text,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}
                  onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
            )}
            <div>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:T.sub,marginBottom:6}}>Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@yourbusiness.com" style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:T.input,color:T.text,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
            <div>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:T.sub,marginBottom:6}}>Password</label>
              <div style={{display:"flex",alignItems:"center",background:T.input,border:`1px solid ${T.border}`,borderRadius:8,padding:"0 14px",height:46,transition:"border-color 0.15s"}}
                onFocusCapture={e=>e.currentTarget.style.borderColor=T.accent} onBlurCapture={e=>e.currentTarget.style.borderColor=T.border}>
                <input type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} placeholder={isUp?"Min. 6 characters":"Your password"} style={{flex:1,border:"none",background:"transparent",fontSize:14,color:T.text,outline:"none",fontFamily:"inherit"}}/>
                <button onClick={()=>setShowPw(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,display:"flex",alignItems:"center"}}>{showPw?<EyeOff size={15}/>:<Eye size={15}/>}</button>
              </div>
            </div>
          </div>
          <button onClick={!loading?submit:undefined} style={{width:"100%",padding:"13px",background:T.accent,border:"none",borderRadius:8,color:"#000",fontSize:15,fontWeight:600,cursor:loading?"default":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:loading?.8:1}}>
            {loading?<><RefreshCw size={15} style={{animation:"halo-spin 0.8s linear infinite"}}/>{isUp?"Creating account...":"Signing in..."}</>:isUp?"Create account":"Sign in"}
          </button>
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:16,textAlign:"center",marginTop:16}}>
            <span style={{fontSize:13.5,color:T.sub}}>{isUp?"Already have an account? ":"Don't have an account? "}<button onClick={onSwitch} style={{background:"none",border:"none",cursor:"pointer",color:T.accent,fontFamily:"inherit",fontSize:13.5,fontWeight:600}}>{isUp?"Sign in":"Sign up free"}</button></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DB_NAV = [{id:"dashboard",Icon:LayoutDashboard,label:"Dashboard"},{id:"events",Icon:Zap,label:"Events",badge:2},{id:"assistant",Icon:Bot,label:"Assistant"},{id:"pipeline",Icon:Play,label:"Pipeline"},{id:"integrations",Icon:Layers,label:"Integrations"},{id:"settings",Icon:Settings,label:"Settings"}];

const ApprovalFlow = ({ ev, onUpdate }) => {
  const T = T_();
  const [step, setStep] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [calCard, setCalCard] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTxt, setEditTxt] = useState(ev.reply||"");
  const [focused, setFocused] = useState(false);
  const reply = editTxt || ev.reply || "";
  const isBook = ev.action==="CREATE_BOOKING";
  const isInv  = ev.action==="CREATE_INVOICE";

  useEffect(() => {
    let t;
    if (step===1) {
      if (charIdx < reply.length) t = setTimeout(()=>setCharIdx(i=>i+1), 20);
      else t = setTimeout(()=>setStep(2), 400);
    }
    if (step===2 && isBook && !calCard) {
      t = setTimeout(()=>{ setCalCard({ svc:ev.data?.Service||"Appointment", date:"18 Apr 2026", time:"14:00" }); setStep(3); }, 1300);
    }
    if (step===2 && isInv && !invoice && !fetching) {
      setFetching(true);
      const svc = ev.data?.Service||"Service"; const date = ev.data?.Date||"last session";
      callAI({model:"claude-sonnet-4-5",max_tokens:500,system:INVOICE_PROMPT,messages:[{role:"user",content:"Invoice for "+svc+" on "+date+" for "+ev.name+". Small UK service business."}]}).then(d=>{
        try { const p=JSON.parse((d.content?.find(b=>b.type==="text")?.text||"{}").replace(/```json|```/g,"").trim()); setInvoice(p); }
        catch { setInvoice({invoiceNumber:"INV-0047",dueDate:"25 Apr 2026",lineItems:[{description:svc,quantity:1,unitPrice:65,total:65}],subtotal:65,tax:0,total:65}); }
        setStep(3); setFetching(false);
      }).catch(()=>{
        setInvoice({invoiceNumber:"INV-0047",dueDate:"25 Apr 2026",lineItems:[{description:svc,quantity:1,unitPrice:65,total:65}],subtotal:65,tax:0,total:65});
        setStep(3); setFetching(false);
      });
    }
    if (step===3) t = setTimeout(()=>setStep(4), 700);
    if (step===4) t = setTimeout(()=>{ onUpdate("DONE"); setStep(99); }, 900);
    return ()=>clearTimeout(t);
  }, [step, charIdx, calCard, invoice, fetching]);

  if (step===0) {
    if (ev.status==="AUTO") return <div style={{padding:"11px 14px",borderRadius:8,background:T.greenBg,border:`1px solid ${T.green}22`,display:"flex",gap:8,alignItems:"center"}}><Check size={14} color={T.green}/><span style={{fontSize:13.5,color:T.green}}>Handled automatically by Halo</span></div>;
    if (ev.status==="DONE") return <div style={{padding:"11px 14px",borderRadius:8,background:T.accentBg,border:`1px solid ${T.accent}22`,display:"flex",gap:8,alignItems:"center"}}><Check size={14} color={T.accent}/><span style={{fontSize:13.5,color:T.accent}}>Reply sent to customer</span></div>;
    if (ev.status==="DISMISSED") return <div style={{padding:"11px 14px",borderRadius:8,background:T.raised,border:`1px solid ${T.border}`,display:"flex",gap:8,alignItems:"center"}}><X size={14} color={T.muted}/><span style={{fontSize:13.5,color:T.muted}}>Dismissed</span></div>;
  }

  if (editing && step===0) return (
    <div>
      <div style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:9}}>Edit Reply</div>
      <textarea value={editTxt} onChange={e=>setEditTxt(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} rows={3}
        style={{width:"100%",padding:"12px 14px",borderRadius:8,border:`1px solid ${focused?T.accent:T.border}`,background:T.raised,color:T.text,fontSize:14,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.6,boxSizing:"border-box",marginBottom:10,transition:"border-color 0.15s"}}/>
      <div style={{display:"flex",gap:9}}>
        <button onClick={()=>{setEditing(false);setStep(1);setCharIdx(0);}} style={{flex:1,padding:"11px 16px",background:T.accent,border:"none",borderRadius:8,color:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><Check size={14}/> Send edited reply</button>
        <button onClick={()=>{setEditing(false);setEditTxt(ev.reply||"");}} style={{padding:"11px 14px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:8,color:T.sub,cursor:"pointer",fontFamily:"inherit",fontSize:13.5}}>Cancel</button>
      </div>
    </div>
  );

  if (step===0) {
    const lbl = isBook?"Approve and book":isInv?"Approve and invoice":"Send reply";
    return (
      <div style={{display:"flex",gap:9}}>
        <button onClick={()=>{setStep(1);setCharIdx(0);}} style={{flex:1,padding:"11px 20px",background:T.accent,border:"none",borderRadius:8,color:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><Check size={14}/> {lbl}</button>
        <button onClick={()=>setEditing(true)} style={{padding:"11px 16px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:8,color:T.sub,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Edit</button>
        <button onClick={()=>{onUpdate("DISMISSED");setStep(98);}} style={{padding:"11px 14px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:8,color:T.sub,cursor:"pointer",fontFamily:"inherit",fontSize:13.5}}>Dismiss</button>
      </div>
    );
  }

  if (step===1) return (
    <div style={{borderRadius:10,background:T.raised,border:`1px solid ${T.border}`,padding:"13px 15px"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><div style={{width:6,height:6,borderRadius:"50%",background:"#25D166",animation:"halo-pulse 1s ease-in-out infinite"}}/><span style={{fontSize:12,color:"#25D166",fontWeight:600}}>Sending reply...</span></div>
      <div style={{fontSize:14,color:T.text,lineHeight:1.7,minHeight:22}}>{reply.slice(0,charIdx)}<span style={{display:"inline-block",width:2,height:14,background:T.accent,marginLeft:1,verticalAlign:"text-bottom",animation:"halo-cursor 0.7s ease-in-out infinite"}}/></div>
    </div>
  );

  if (step>=2) return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,background:T.raised,border:`1px solid ${T.border}`}}><div style={{width:22,height:22,borderRadius:"50%",background:T.greenBg,border:`1px solid ${T.green}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={11} color={T.green} strokeWidth={2.5}/></div><span style={{fontSize:13.5,color:T.text,fontWeight:500}}>Reply sent to customer</span></div>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,background:T.raised,border:`1px solid ${step>=3?T.accent+"40":T.border}`}}>
        <div style={{width:22,height:22,borderRadius:"50%",background:step>=3?T.accentBg:T.raised,border:`1px solid ${step>=3?T.accent+"40":T.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.3s"}}>
          {step>=3 ? <Check size={11} color={T.accent} strokeWidth={2.5}/> : <RefreshCw size={11} color={T.accent} style={{animation:"halo-spin 0.8s linear infinite"}}/>}
        </div>
        <span style={{fontSize:13.5,color:step>=3?T.text:T.sub,transition:"color 0.3s"}}>{isBook?"Creating calendar event...":"Generating invoice..."}</span>
      </div>
      {step>=3 && isBook && calCard && (
        <div style={{borderRadius:10,background:T.surface,border:`1px solid ${T.border}`,overflow:"hidden",animation:"halo-screen 0.4s ease"}}>
          <div style={{background:T.redBg,borderBottom:`1px solid ${T.border}`,padding:"9px 14px",display:"flex",alignItems:"center",gap:8}}><div style={{width:7,height:7,borderRadius:2,background:T.red}}/><span style={{fontSize:11,fontWeight:700,color:T.red,letterSpacing:"0.05em"}}>GOOGLE CALENDAR - CREATED</span></div>
          <div style={{padding:"14px 16px"}}>
            <div style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:10}}>{calCard.svc}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[{l:"Customer",v:ev.name},{l:"Date",v:calCard.date},{l:"Time",v:calCard.time},{l:"Status",v:"Confirmed"}].map(f=>(
                <div key={f.l}><div style={{fontSize:10,color:T.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.l}</div><div style={{fontSize:13.5,color:f.l==="Status"?T.green:T.text,fontWeight:f.l==="Status"?600:400}}>{f.v}</div></div>
              ))}
            </div>
          </div>
        </div>
      )}
      {step>=3 && isInv && invoice && (
        <div style={{borderRadius:10,background:T.surface,border:`1px solid ${T.border}`,overflow:"hidden",animation:"halo-screen 0.4s ease"}}>
          <div style={{background:T.purpleBg,borderBottom:`1px solid ${T.border}`,padding:"9px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:7,height:7,borderRadius:2,background:T.purple}}/><span style={{fontSize:11,fontWeight:700,color:T.purple,letterSpacing:"0.05em"}}>INVOICE GENERATED</span></div><span style={{fontSize:11.5,fontWeight:700,color:T.purple}}>{invoice.invoiceNumber}</span></div>
          <div style={{padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div><div style={{fontSize:10,color:T.muted,marginBottom:2}}>BILL TO</div><div style={{fontSize:14,fontWeight:600,color:T.text}}>{ev.name}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:10,color:T.muted,marginBottom:2}}>DUE DATE</div><div style={{fontSize:13.5,color:T.text}}>{invoice.dueDate}</div></div></div>
            <div style={{borderTop:`1px solid ${T.border}`,paddingTop:10,marginBottom:10}}>
              {(invoice.lineItems||[]).map((item,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13.5,color:T.text}}>{item.description}</span><span style={{fontSize:13.5,fontWeight:600,color:T.text}}>£{Number(item.total||0).toFixed(2)}</span></div>)}
            </div>
            <div style={{borderTop:`1px solid ${T.border}`,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14,fontWeight:700,color:T.text}}>Total</span><span style={{fontSize:20,fontWeight:700,color:T.accent,fontFamily:"DM Serif Display,serif"}}>£{Number(invoice.total||0).toFixed(2)}</span></div>
          </div>
        </div>
      )}
      {(step===4||step===99) && <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,background:T.greenBg,border:`1px solid ${T.green}22`,animation:"halo-screen 0.3s ease"}}><Check size={14} color={T.green}/><span style={{fontSize:13.5,color:T.green}}>{isBook?"Confirmation sent":"Invoice emailed"}</span></div>}
    </div>
  );

  if (step===98) return <div style={{padding:"11px 14px",borderRadius:8,background:T.raised,border:`1px solid ${T.border}`,display:"flex",gap:8,alignItems:"center"}}><X size={14} color={T.muted}/><span style={{fontSize:13.5,color:T.muted}}>Dismissed</span></div>;
  return null;
};

const DbEvRow = ({ ev, sel, onClick }) => {
  const T = T_(); const [h,setH]=useState(false); const sc=getSC(T,ev.status); const on=sel?.id===ev.id;
  return (
    <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{padding:"12px 14px",cursor:"pointer",borderBottom:`1px solid ${T.border}`,background:on?T.accentBg:h?T.raised:"transparent",borderLeft:`2px solid ${on?T.accent:"transparent"}`,transition:"all 0.1s"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13.5,fontWeight:500,color:T.text}}>{ev.name}</span><span style={{fontSize:11.5,color:T.muted}}>{ev.elapsed}</span></div>
      <p style={{margin:"0 0 6px",fontSize:12.5,color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.preview}</p>
      <div style={{display:"flex",gap:5,alignItems:"center"}}><Dot color={sc.text}/><span style={{fontSize:11.5,color:T.muted}}>{sc.label}</span>{ev.urgency==="HIGH"&&<span style={{fontSize:11,color:T.red,background:T.redBg,padding:"1px 6px",borderRadius:4,fontWeight:500}}>Urgent</span>}</div>
    </div>
  );
};

const DbEventsView = ({ isMobile, events, setEvents }) => {
  const T = T_(); const [sel,setSel]=useState(events[0]); const [filter,setFilter]=useState("ALL"); const [showD,setShowD]=useState(!isMobile);
  const filtered = filter==="ALL"?events:events.filter(e=>e.status===filter);
  const cur = events.find(e=>e.id===sel?.id)||events[0];
  const cIC=getIC(T,cur?.intent); const cSC=getSC(T,cur?.status); const cCH=CH[cur?.ch]||CH.web;
  const onUpdate = status => setEvents(p=>p.map(e=>e.id===cur.id?{...e,status}:e));
  return (
    <div style={{display:"flex",height:"100%",overflow:"hidden"}}>
      {(!isMobile||!showD) && (
        <div style={{width:isMobile?"100%":305,borderRight:isMobile?"none":`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{padding:"14px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:5,flexWrap:"wrap"}}>
            {["ALL","PENDING","AUTO","ESCALATED"].map(f=>{const on=filter===f;return <button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 10px",borderRadius:5,border:`1px solid ${on?T.accent:T.border}`,cursor:"pointer",fontSize:12,fontWeight:on?500:400,fontFamily:"inherit",background:on?T.accentBg:"transparent",color:on?T.accent:T.sub,transition:"all 0.12s"}}>{f==="ALL"?"All":f.charAt(0)+f.slice(1).toLowerCase()}</button>;})}
          </div>
          <div style={{flex:1,overflowY:"auto",paddingBottom:isMobile?70:0}}>
            {filtered.map(ev=><DbEvRow key={ev.id} ev={ev} sel={cur} onClick={()=>{setSel(ev);if(isMobile)setShowD(true);}}/>)}
          </div>
        </div>
      )}
      {(!isMobile||showD) && cur && (
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"14px 22px",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0}}>
            {isMobile && <button onClick={()=>setShowD(false)} style={{background:"none",border:"none",cursor:"pointer",color:T.accent,fontSize:13.5,fontFamily:"inherit",padding:"0 0 8px",display:"block"}}>Back</button>}
            <div style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:6}}>{cur.name}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Chip label={cCH.label} color={T.sub} bg={T.raised}/><Chip label={cur.intent.charAt(0)+cur.intent.slice(1).toLowerCase()} color={cIC.text} bg={cIC.bg}/><Chip label={cSC.label} color={cSC.text} bg={cSC.bg}/>{cur.urgency==="HIGH"&&<Chip label="Urgent" color={T.red} bg={T.redBg}/>}</div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:`18px 22px`,paddingBottom:isMobile?80:18}}>
            <div style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Message</div>
            <div style={{fontSize:13.5,color:T.text,background:T.raised,padding:"13px 15px",borderRadius:8,lineHeight:1.75,marginBottom:18,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.accent}`}}>{cur.msg}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18}}>
              {[{l:"Intent",v:cur.intent,c:cIC.text},{l:"Confidence",v:cur.conf+"%",c:cur.conf>85?T.green:T.yellow},{l:"Urgency",v:cur.urgency,c:cur.urgency==="HIGH"?T.red:cur.urgency==="MEDIUM"?T.yellow:T.green},{l:"Action",v:(cur.action||"").replace(/_/g," "),c:T.accent}].map(f=>(
                <div key={f.l} style={{background:T.raised,border:`1px solid ${T.border}`,borderRadius:7,padding:"10px 12px"}}><div style={{fontSize:10,color:T.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.l}</div><div style={{fontSize:12.5,color:f.c,fontWeight:600}}>{f.v}</div></div>
              ))}
            </div>
            {cur.reply && <><div style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>{cur.status==="AUTO"?"Reply Sent":"Draft Reply"}</div><div style={{fontSize:13.5,color:T.text,background:T.raised,padding:"13px 15px",borderRadius:8,lineHeight:1.75,marginBottom:18,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.green}`}}>{cur.reply}</div></>}
            <div style={{background:"#0A1A0E",borderRadius:10,padding:"14px 16px",marginBottom:18,border:"1px solid rgba(37,209,102,0.12)"}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><div style={{width:16,height:16,borderRadius:"50%",background:"#25D166",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Bot size={8} color="#fff" strokeWidth={2.5}/></div><span style={{fontSize:10,fontWeight:600,color:"#25D166",letterSpacing:"0.04em"}}>WHATSAPP NOTIFICATION SENT</span><span style={{marginLeft:"auto",fontSize:10,color:"#2A5A3A"}}>Delivered</span></div>
              <div style={{background:"#132018",borderRadius:"3px 8px 8px 8px",padding:"10px 12px"}}><div style={{fontSize:12.5,color:"#A0D4B0",lineHeight:1.75}}><strong style={{color:"#DCF8E4"}}>New {cur.intent}</strong> - {cur.urgency}<br/><span style={{color:"#2A7A3A"}}>Summary: </span>{cur.summary}</div></div>
            </div>
            {cur.status!=="ESCALATED" && <ApprovalFlow key={cur.id} ev={cur} onUpdate={onUpdate}/>}
            {cur.status==="ESCALATED" && <div style={{padding:"12px 14px",borderRadius:8,background:T.redBg,border:`1px solid ${T.red}22`}}><span style={{fontSize:13.5,color:T.red}}>Escalated — contact the customer directly.</span></div>}
          </div>
        </div>
      )}
    </div>
  );
};

const DbDashboard = ({ setView, isMobile, events }) => {
  const T = T_(); const pending=events.filter(e=>e.status==="PENDING").length;
  const isNew = events.length === 0;
  const ACTIVITY=[{t:"Tom Hendricks booking confirmed",s:"Thu 17 Apr 7:30am",c:"green",ago:"2m"},{t:"New enquiry from Sarah Mitchell",s:"WhatsApp Booking",c:"yellow",ago:"18m"},{t:"Invoice INV-0044 paid",s:"65 Daniel Wu",c:"green",ago:"1h"},{t:"Overdue reminder sent",s:"INV-0043 Luke M.",c:"red",ago:"2h"}];
  const SETUP_STEPS = [
    { n:1, icon:MessageSquare, title:"Connect a channel",     desc:"Link WhatsApp Business, Instagram, or Gmail to start receiving messages.", cta:"Go to Integrations", view:"integrations", done:true },
    { n:2, icon:Settings,      title:"Add your services",     desc:"Tell Halo what you offer and your pricing so it can reply accurately.",       cta:"Open Settings",      view:"settings",      done:false },
    { n:3, icon:Zap,           title:"You're live",           desc:"Halo will start classifying messages and sending you approval requests.",       cta:null,                 view:null,            done:false },
  ];

  if (isNew) {
    return (
      <div style={{padding:`${isMobile?20:48}px ${isMobile?16:48}px`, overflowY:"auto", height:"100%"}}>
        <div style={{maxWidth:600, margin:"0 auto"}}>
          <div style={{marginBottom:32}}>
            <h1 style={{fontSize:isMobile?22:28, fontWeight:600, color:T.text, fontFamily:"DM Serif Display,serif", letterSpacing:"-0.02em", marginBottom:8}}>Welcome to Halo.</h1>
            <p style={{fontSize:15, color:T.sub, lineHeight:1.7}}>You are two steps away from handling customer messages automatically. Here is how to get set up.</p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            {SETUP_STEPS.map((step, i) => (
              <div key={i} style={{background:T.surface, border:`1px solid ${step.done?T.accent:T.border}`, borderRadius:12, padding:"22px 24px", display:"flex", gap:18, alignItems:"flex-start", opacity:i===2?0.45:1}}>
                <div style={{width:40, height:40, borderRadius:10, background:step.done?T.accentBg:T.raised, border:`1px solid ${step.done?T.accent:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                  {step.done ? <Check size={18} color={T.accent} strokeWidth={2}/> : <step.icon size={18} color={T.muted} strokeWidth={1.75}/>}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
                    <span style={{fontSize:10, fontWeight:700, color:step.done?T.accent:T.muted, letterSpacing:"0.06em"}}>STEP {step.n}</span>
                    {step.done && <span style={{fontSize:10, fontWeight:600, color:T.green, background:T.greenBg, padding:"1px 7px", borderRadius:99}}>Complete</span>}
                  </div>
                  <div style={{fontSize:15.5, fontWeight:600, color:T.text, marginBottom:6}}>{step.title}</div>
                  <p style={{fontSize:13.5, color:T.sub, lineHeight:1.65, margin:"0 0 12px"}}>{step.desc}</p>
                  {step.cta && step.view && (
                    <button onClick={()=>setView(step.view)} style={{display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:500, color:step.done?T.accent:T.text, background:step.done?T.accentBg:T.raised, border:`1px solid ${step.done?T.accentBd:T.border}`, borderRadius:7, padding:"7px 14px", cursor:"pointer", fontFamily:"inherit"}}>
                      {step.cta} <ArrowRight size={12}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:24, padding:"18px 22px", background:T.accentBg, border:`1px solid ${T.accentBd}`, borderRadius:12, display:"flex", gap:12, alignItems:"flex-start"}}>
            <Bot size={18} color={T.accent} strokeWidth={1.75} style={{flexShrink:0, marginTop:2}}/>
            <div>
              <div style={{fontSize:13.5, fontWeight:600, color:T.accent, marginBottom:4}}>Need help getting started?</div>
              <p style={{fontSize:13, color:T.sub, lineHeight:1.65, margin:0}}>Ask Halo anything in the AI Assistant — from connecting channels to writing your first service descriptions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:`${isMobile?20:36}px ${isMobile?16:40}px`,overflowY:"auto",height:"100%",paddingBottom:isMobile?80:36}}>
      <div style={{marginBottom:isMobile?24:32}}><h1 style={{margin:"0 0 5px",fontSize:isMobile?22:26,fontWeight:600,color:T.text,fontFamily:"DM Serif Display,serif",letterSpacing:"-0.02em"}}>Good morning, Jennifer</h1><p style={{margin:0,fontSize:13.5,color:T.sub}}>Monday, 13 April 2026</p></div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:10,marginBottom:isMobile?20:24}}>
        {[{Icon:Zap,l:"Events today",v:"12",c:T.accent,pg:"events"},{Icon:AlertCircle,l:"Needs approval",v:String(pending),c:T.yellow,pg:"events"},{Icon:Check,l:"Auto-handled",v:"9",c:T.green},{Icon:Layers,l:"Channels",v:"4",c:T.blue,pg:"integrations"}].map((s,i)=>(
          <div key={i} onClick={s.pg?()=>setView(s.pg):undefined} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"20px",cursor:s.pg?"pointer":"default"}}>
            <div style={{width:32,height:32,borderRadius:8,background:s.c+"18",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><s.Icon size={15} color={s.c} strokeWidth={1.75}/></div>
            <div style={{fontSize:30,fontWeight:600,color:T.text,lineHeight:1,marginBottom:5,fontFamily:"DM Serif Display,serif"}}>{s.v}</div>
            <div style={{fontSize:13,color:T.sub}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 300px",gap:14}}>
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14,fontWeight:500,color:T.text}}>Recent Events</span><button onClick={()=>setView("events")} style={{background:"none",border:"none",cursor:"pointer",fontSize:12.5,color:T.accent,fontFamily:"inherit"}}>View all</button></div>
          <div style={{height:1,background:T.border}}/>
          {events.slice(0,isMobile?4:5).map((ev,i)=>{
            const sc=getSC(T,ev.status);
            return <div key={ev.id} onClick={()=>setView("events")} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 18px",borderBottom:i<(isMobile?3:4)?`1px solid ${T.border}`:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.raised} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:500,color:T.text}}>{ev.name}</div><div style={{fontSize:12,color:T.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.preview}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}><Dot color={sc.text}/><span style={{fontSize:11.5,color:sc.text}}>{sc.label}</span></div>
            </div>;
          })}
        </div>
        {!isMobile && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:T.surface,border:`1px solid ${T.accentBd}`,borderRadius:10,padding:"18px 20px"}}>
              <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:10}}><Bot size={14} color={T.accent} strokeWidth={2}/><span style={{fontSize:11,fontWeight:600,color:T.accent,letterSpacing:"0.06em"}}>HALO</span></div>
              <p style={{margin:"0 0 14px",fontSize:13.5,color:T.text,lineHeight:1.7}}>Luke Morrison's complaint has been open 2 hours. A direct response is recommended.</p>
              <button onClick={()=>setView("events")} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12.5,fontWeight:500,color:T.accent,background:T.accentBg,border:`1px solid ${T.accentBd}`,borderRadius:6,padding:"7px 13px",cursor:"pointer",fontFamily:"inherit"}}>View event <ArrowRight size={12}/></button>
            </div>
            <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px 20px"}}>
              <div style={{fontSize:13.5,fontWeight:500,color:T.text,marginBottom:14}}>Activity</div>
              {ACTIVITY.map((a,i)=>(
                <div key={i} style={{display:"flex",gap:10,paddingBottom:11,marginBottom:11,borderBottom:i<ACTIVITY.length-1?`1px solid ${T.border}`:"none"}}>
                  <Dot color={T[a.c]||T.accent}/>
                  <div style={{flex:1}}><div style={{fontSize:12.5,color:T.text,marginBottom:1}}>{a.t}</div><div style={{fontSize:11.5,color:T.muted}}>{a.s}</div></div>
                  <span style={{fontSize:11,color:T.muted,whiteSpace:"nowrap"}}>{a.ago}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DbAssistantView = ({ isMobile }) => {
  const T = T_(); const [msgs,setMsgs]=useState([]); const [inp,setInp]=useState(""); const [load,setLoad]=useState(false); const [focused,setFocused]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{if(ref.current)ref.current.scrollIntoView({behavior:"smooth"});},[msgs,load]);
  const send=async text=>{
    if(!text.trim()||load)return;
    const m=[...msgs,{role:"user",content:text}]; setMsgs(m);setInp("");setLoad(true);
    try{const d=await callAI({model:"claude-sonnet-4-5",max_tokens:1000,system:"You are Halo, an AI business assistant for small UK service businesses. Be concise, warm, and practical.",messages:m});setMsgs(p=>[...p,{role:"assistant",content:d.content?.find(b=>b.type==="text")?.text||"Something went wrong."}]);}
    catch{setMsgs(p=>[...p,{role:"assistant",content:"Connection error."}]);}
    setLoad(false);
  };
  const QPS=["Draft a follow-up for an unanswered enquiry","Write a professional cancellation policy","How to increase repeat bookings","Write a payment reminder"];
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:`18px ${isMobile?16:32}px 14px`,borderBottom:`1px solid ${T.border}`,flexShrink:0,display:"flex",gap:11,alignItems:"center"}}>
        <div style={{width:36,height:36,borderRadius:9,background:T.accentBg,border:`1px solid ${T.accentBd}`,display:"flex",alignItems:"center",justifyContent:"center"}}><Bot size={17} color={T.accent} strokeWidth={1.75}/></div>
        <div><h2 style={{margin:0,fontSize:15,fontWeight:600,color:T.text}}>AI Assistant</h2><p style={{margin:0,fontSize:12.5,color:T.sub}}>Ask anything about your business</p></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:`24px ${isMobile?16:32}px`,paddingBottom:isMobile?80:24}}>
        {msgs.length===0?(<div><p style={{fontSize:13.5,color:T.sub,marginBottom:14}}>Quick prompts:</p><div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:8}}>{QPS.map((p,i)=><PromptChip key={i} text={p} onSend={send}/>)}</div></div>):(
          <>{msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:14,gap:9,alignItems:"flex-start"}}>{m.role==="assistant"&&<div style={{width:26,height:26,borderRadius:7,background:T.accentBg,border:`1px solid ${T.accentBd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><Bot size={12} color={T.accent} strokeWidth={2}/></div>}<div style={{maxWidth:"72%",padding:"12px 15px",borderRadius:10,background:m.role==="user"?T.accent:T.raised,color:m.role==="user"?"#000":T.text,border:m.role==="assistant"?`1px solid ${T.border}`:"none",fontSize:13.5,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{m.content}</div></div>)}
          {load&&<div style={{display:"flex",gap:9,alignItems:"flex-start"}}><div style={{width:26,height:26,borderRadius:7,background:T.accentBg,border:`1px solid ${T.accentBd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Bot size={12} color={T.accent} strokeWidth={2}/></div><div style={{padding:"13px 15px",borderRadius:10,background:T.raised,border:`1px solid ${T.border}`,display:"flex",gap:5,alignItems:"center"}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:T.accent,opacity:0.6,animation:`halo-bounce 1.2s ease-in-out ${i*0.15}s infinite`}}/>)}</div></div>}
          <div ref={ref}/></>
        )}
      </div>
      <div style={{padding:`14px ${isMobile?16:32}px ${isMobile?74:22}px`,borderTop:`1px solid ${T.border}`,background:T.surface,flexShrink:0}}>
        <div style={{display:"flex",gap:9,alignItems:"flex-end"}}>
          <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(inp);}}} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder="Ask Halo anything..." rows={2} style={{flex:1,padding:"11px 14px",borderRadius:8,border:`1px solid ${focused?T.accent:T.border}`,background:T.raised,color:T.text,fontSize:14,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.6,boxSizing:"border-box",transition:"border-color 0.15s"}}/>
          <button onClick={()=>send(inp)} disabled={!inp.trim()||load} style={{width:46,height:46,borderRadius:8,flexShrink:0,background:inp.trim()&&!load?T.accent:T.raised,border:`1px solid ${inp.trim()&&!load?T.accent:T.border}`,cursor:inp.trim()&&!load?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}><Send size={15} color={inp.trim()&&!load?"#000":T.muted}/></button>
        </div>
      </div>
    </div>
  );
};

const DbPipelineView = ({ isMobile }) => {
  const T = T_(); const [msg,setMsg]=useState(""); const [phase,setPhase]=useState(-1); const [res,setRes]=useState(null); const [focused,setFocused]=useState(false);
  const run=async()=>{if(!msg.trim()||phase>=0)return;setRes(null);setPhase(0);await new Promise(r=>setTimeout(r,500));setPhase(1);try{const d=await callAI({model:"claude-sonnet-4-5",max_tokens:500,system:CLF_SYS,messages:[{role:"user",content:"Customer message: "+msg}]});const raw=d.content?.find(b=>b.type==="text")?.text||"{}";const parsed=JSON.parse(raw.replace(/```json|```/g,"").trim());await new Promise(r=>setTimeout(r,400));setPhase(2);await new Promise(r=>setTimeout(r,500));setPhase(3);await new Promise(r=>setTimeout(r,350));setPhase(4);setRes(parsed);}catch{setPhase(4);}};
  const reset=()=>{setPhase(-1);setRes(null);};
  const UC={HIGH:T.red,MEDIUM:T.yellow,LOW:T.green};
  const iC=res?getIC(T,res.intent):null;
  const EXS=["Can I book a haircut this Saturday?","Invoice for last week","I want a refund, been waiting 3 days"];
  const STEPS=[{icon:"📥",l:"Message received"},{icon:"🧠",l:"Classifying intent"},{icon:"✍️",l:"Generating reply"},{icon:"📲",l:"Building notification"}];
  return (
    <div style={{padding:`${isMobile?20:36}px ${isMobile?16:40}px`,overflowY:"auto",height:"100%",paddingBottom:isMobile?80:36}}>
      <div style={{marginBottom:20}}><h1 style={{margin:"0 0 5px",fontSize:isMobile?20:24,fontWeight:600,color:T.text,fontFamily:"DM Serif Display,serif"}}>Pipeline Test</h1><p style={{margin:0,fontSize:13.5,color:T.sub}}>Watch the AI pipeline run live on any customer message</p></div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:18,alignItems:"start"}}>
        <div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{EXS.map((ex,i)=><ExChip key={i} text={ex} onSelect={t=>{setMsg(t);reset();}}/>)}</div>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} disabled={phase>-1&&phase<4} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder="Or type any customer message..." rows={3} style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${focused?T.accent:T.border}`,background:T.raised,color:T.text,fontSize:13.5,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.6,boxSizing:"border-box",marginBottom:10,transition:"border-color 0.15s"}}/>
          <button onClick={phase===4?reset:run} disabled={!msg.trim()&&phase===-1} style={{width:"100%",padding:"12px",borderRadius:8,fontFamily:"inherit",background:phase===4?T.raised:msg.trim()?T.accent:T.raised,border:`1px solid ${phase===4?T.border:msg.trim()?T.accent:T.border}`,color:phase===4?T.sub:msg.trim()?"#000":T.muted,fontSize:14,fontWeight:500,cursor:msg.trim()||phase===4?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.15s",marginBottom:14}}>
            {phase===-1&&<><Play size={14}/> Run Pipeline</>}
            {phase>=0&&phase<4&&<><RefreshCw size={14} style={{animation:"halo-spin 0.8s linear infinite"}}/> Processing...</>}
            {phase===4&&<><RefreshCw size={14}/> Run Again</>}
          </button>
          {phase>=0 && <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px"}}>
            {STEPS.map((s,i)=>{const done=phase>i,active=phase===i;return<div key={i} style={{display:"flex",gap:12,alignItems:"center",marginBottom:i<3?14:0}}><div style={{width:34,height:34,borderRadius:8,flexShrink:0,background:done?T.greenBg:active?T.accentBg:T.raised,border:`1px solid ${done?T.green+"40":active?T.accent+"40":T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,transition:"all 0.3s"}}>{done?<Check size={13} color={T.green} strokeWidth={2.5}/>:s.icon}</div><span style={{fontSize:13.5,fontWeight:active||done?500:400,flex:1,color:done?T.green:active?T.accent:T.muted,transition:"color 0.3s"}}>{s.l}</span>{active&&<div style={{display:"flex",gap:3}}>{[0,1,2].map(j=><div key={j} style={{width:5,height:5,borderRadius:"50%",background:T.accent,opacity:0.6,animation:`halo-bounce 0.9s ease-in-out ${j*0.12}s infinite`}}/>)}</div>}</div>;})}
          </div>}
        </div>
        {res&&phase===4 ? (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"20px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>{[{l:"Intent",v:res.intent,c:iC?.text||T.accent},{l:"Confidence",v:res.confidence+"%",c:res.confidence>80?T.green:T.yellow},{l:"Urgency",v:res.urgency,c:UC[res.urgency]||T.sub},{l:"Action",v:(res.suggestedAction||"").replace(/_/g," "),c:T.accent}].map(f=><div key={f.l} style={{background:T.raised,border:`1px solid ${T.border}`,borderRadius:7,padding:"10px 13px"}}><div style={{fontSize:10,color:T.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.l}</div><div style={{fontSize:13,color:f.c,fontWeight:600}}>{f.v}</div></div>)}</div>
              {res.suggestedReply && <p style={{margin:0,fontSize:13.5,color:T.sub,lineHeight:1.65,borderLeft:`3px solid ${T.green}`,paddingLeft:14}}>{res.suggestedReply}</p>}
            </div>
            <div style={{background:"#0A1A0E",borderRadius:10,padding:"18px",border:"1px solid rgba(37,209,102,0.12)"}}>
              <div style={{fontSize:11,fontWeight:600,color:"#2A7A3A",letterSpacing:"0.06em",marginBottom:8}}>WHATSAPP NOTIFICATION</div>
              <div style={{fontSize:13,color:"#A0D4B0",lineHeight:1.7}}><strong style={{color:"#DCF8E4"}}>New {res.intent}</strong> - {res.urgency}<br/><span style={{color:"#2A7A3A"}}>Action: </span>{ACTION_LABELS[res.suggestedAction]||res.suggestedAction}</div>
            </div>
          </div>
        ) : (
          <div style={{padding:"40px 20px",textAlign:"center",background:T.surface,border:`1px dashed ${T.border}`,borderRadius:10,display:phase>=0?"none":"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:32,marginBottom:12}}>⚡</div>
            <p style={{margin:0,fontSize:14,color:T.sub,lineHeight:1.7}}>Run the pipeline to see live AI classification and the WhatsApp notification preview.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DbIntegrationsView = ({ isMobile }) => {
  const T = T_(); const w = useW(); const [state,setState]=useState(Object.fromEntries(INTG.map(i=>[i.name,i.live])));
  return (
    <div style={{padding:`${isMobile?20:36}px ${isMobile?16:40}px`,overflowY:"auto",height:"100%",paddingBottom:isMobile?80:36}}>
      <div style={{marginBottom:24}}><h1 style={{margin:"0 0 5px",fontSize:isMobile?20:24,fontWeight:600,color:T.text,fontFamily:"DM Serif Display,serif"}}>Integrations</h1><p style={{margin:0,fontSize:13.5,color:T.sub}}>Connect your channels and ops tools</p></div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":w<1024?"repeat(2,1fr)":"repeat(3,1fr)",gap:12}}>
        {INTG.map(intg=>{
          const c=T[intg.ck]||T.accent, cbg=T[intg.ck+"Bg"]||T.accentBg; const on=state[intg.name];
          return(
            <div key={intg.name} style={{background:T.surface,border:`1px solid ${on&&!intg.optional?c+"28":T.border}`,borderRadius:10,padding:"20px",opacity:intg.optional&&!on?.65:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:40,height:40,borderRadius:10,background:cbg,border:`1px solid ${c}25`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:11,fontWeight:700,color:c,letterSpacing:"0.04em"}}>{intg.icon}</span></div>
                  <div><div style={{fontSize:13.5,fontWeight:500,color:T.text}}>{intg.name}</div></div>
                </div>
                {on&&!intg.optional&&<div style={{display:"flex",alignItems:"center",gap:5,background:T.greenBg,padding:"3px 9px",borderRadius:99,border:`1px solid ${T.green}20`}}><Dot color={T.green}/><span style={{fontSize:11,color:T.green,fontWeight:600}}>Live</span></div>}
              </div>
              <p style={{margin:"0 0 12px",fontSize:12.5,color:T.sub,lineHeight:1.65}}>{intg.desc}</p>
              <button onClick={()=>setState(p=>({...p,[intg.name]:!p[intg.name]}))} style={{width:"100%",padding:"8px 14px",borderRadius:7,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",border:`1px solid ${on?T.border:c+"40"}`,background:on?T.raised:cbg,color:on?T.sub:c}}>{intg.optional&&!on?"Coming soon":on?"Disconnect":"Connect"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DbSettingsView = ({ isMobile }) => {
  const T = T_();
  const rows = [
    {t:"Business Profile",d:"Name, industry, location, services, and working hours"},
    {t:"Halo Configuration",d:"Customise Halo's tone, knowledge base, and automation rules"},
    {t:"Notification Preferences",d:"WhatsApp alerts and urgency thresholds"},
    {t:"Team and Access",d:"Invite staff and configure permissions"},
    {t:"Billing and Plan",d:"Subscription, usage, and invoices"},
  ];
  return (
    <div style={{padding:`${isMobile?20:36}px ${isMobile?16:40}px`,overflowY:"auto",height:"100%",paddingBottom:isMobile?80:36}}>
      <div style={{marginBottom:24}}><h1 style={{margin:"0 0 5px",fontSize:isMobile?20:24,fontWeight:600,color:T.text,fontFamily:"DM Serif Display,serif"}}>Settings</h1><p style={{margin:0,fontSize:13.5,color:T.sub}}>Business profile, configuration, and billing</p></div>
      <div style={{maxWidth:isMobile?"100%":640}}>
        {rows.map((r,i)=>{
          const[h,setH]=useState(false);
          return <div key={i} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:T.surface,border:`1px solid ${h?T.borderH:T.border}`,borderRadius:9,marginBottom:8,cursor:"pointer",transition:"all 0.15s"}}>
            <div><div style={{fontSize:14,fontWeight:500,color:T.text,marginBottom:3}}>{r.t}</div><div style={{fontSize:13,color:T.sub}}>{r.d}</div></div>
            <ArrowRight size={14} color={h?T.accent:T.muted} style={{flexShrink:0,marginLeft:16,transition:"color 0.15s"}}/>
          </div>;
        })}
      </div>
    </div>
  );
};

const DashSidebar = ({ view, setView, onBack }) => {
  const T = T_();
  return (
    <aside style={{width:216,background:T.sbBg,borderRight:`1px solid ${T.sbBd}`,display:"flex",flexDirection:"column",height:"100vh",flexShrink:0}}>
      <div style={{padding:"20px 18px 18px",borderBottom:`1px solid ${T.sbBd}`}}>
        <div onClick={onBack} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",opacity:1,transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <div style={{width:28,height:28,borderRadius:7,background:T.accent,display:"flex",alignItems:"center",justifyContent:"center"}}><Bot size={15} color="#000" strokeWidth={2.5}/></div>
          <span style={{color:"#EEE",fontFamily:"DM Serif Display,serif",fontSize:19}}>halo</span>
          <ArrowRight size={12} color="#555" style={{marginLeft:"auto",transform:"rotate(180deg)"}}/>
        </div>
      </div>
      <nav style={{flex:1,padding:"10px"}}>
        <div style={{fontSize:9.5,fontWeight:600,color:"#2A2A2A",letterSpacing:"0.08em",textTransform:"uppercase",padding:"10px 8px 8px"}}>Workspace</div>
        {DB_NAV.map(item=>{
          const on=view===item.id; const[h,setH]=useState(false);
          return <button key={item.id} onClick={()=>setView(item.id)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"8px 10px",borderRadius:6,border:"none",cursor:"pointer",marginBottom:1,textAlign:"left",fontFamily:"inherit",background:on?T.accentBg:h?"rgba(255,255,255,0.04)":"transparent",color:on?T.accent:h?"rgba(255,255,255,0.7)":"#555",borderLeft:`2px solid ${on?T.accent:"transparent"}`,transition:"all 0.12s"}}><item.Icon size={14} strokeWidth={1.75}/><span style={{fontSize:13.5,fontWeight:on?500:400,flex:1}}>{item.label}</span>{item.badge&&<span style={{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:99,background:T.accent,color:"#000"}}>{item.badge}</span>}</button>;
        })}
      </nav>
      <div style={{padding:"10px 12px 14px",borderTop:`1px solid ${T.sbBd}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:8,background:"rgba(255,255,255,0.03)",border:"1px solid #1A1A1A",marginBottom:8}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:T.accent,color:"#000",fontSize:9.5,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>JO</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:12.5,fontWeight:500,color:"#CCC"}}>Jennifer O.</div><div style={{fontSize:10.5,color:"#444"}}>Admin</div></div>
          <Dot color={T.green}/>
        </div>
        <button onClick={onBack} style={{width:"100%",padding:"6px 10px",borderRadius:6,border:"none",background:"transparent",cursor:"pointer",fontSize:12.5,color:"#333",fontFamily:"inherit",textAlign:"left",transition:"color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.color="#888"} onMouseLeave={e=>e.currentTarget.style.color="#333"}>Back to site</button>
      </div>
    </aside>
  );
};

const Dashboard = ({ onBack, isDark, onToggle, events, setEvents }) => {
  const T = T_(); const w = useW(); const mob = w < 768;
  const [view, setView] = useState("dashboard");
  const pending = events.filter(e=>e.status==="PENDING").length;
  const TITLES = {dashboard:"Dashboard",events:"Events",assistant:"AI Assistant",pipeline:"Pipeline",integrations:"Integrations",settings:"Settings"};
  const views = { dashboard:<DbDashboard setView={setView} isMobile={mob} events={events}/>, events:<DbEventsView isMobile={mob} events={events} setEvents={setEvents}/>, assistant:<DbAssistantView isMobile={mob}/>, pipeline:<DbPipelineView isMobile={mob}/>, integrations:<DbIntegrationsView isMobile={mob}/>, settings:<DbSettingsView isMobile={mob}/> };
  return (
    <div style={{display:"flex",height:"100vh",overflow:"hidden",background:T.page}}>
      {!mob && <DashSidebar view={view} setView={setView} onBack={onBack}/>}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <header style={{height:52,background:T.surface,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:`0 ${mob?16:28}px`,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {mob && <div style={{width:22,height:22,borderRadius:5,background:T.accent,display:"flex",alignItems:"center",justifyContent:"center"}}><Bot size={12} color="#000" strokeWidth={2.5}/></div>}
            <span style={{fontSize:15,fontWeight:500,color:T.text}}>{TITLES[view]||"Dashboard"}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <ThemeBtn isDark={isDark} onToggle={onToggle}/>
            <div style={{position:"relative"}}><button style={{width:36,height:36,borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.sub}}><Bell size={14}/></button>{pending>0&&<span style={{position:"absolute",top:7,right:7,width:6,height:6,borderRadius:"50%",background:T.accent}}/>}</div>
            <div style={{width:30,height:30,borderRadius:"50%",background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#000",flexShrink:0}}>JO</div>
          </div>
        </header>
        <main style={{flex:1,overflow:"hidden",background:T.page}}>{views[view]||views.dashboard}</main>
      </div>
      {mob && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.sbBg,borderTop:`1px solid ${T.sbBd}`,display:"flex",zIndex:50}}>
          {DB_NAV.slice(0,5).map(item=>{const on=view===item.id;return<button key={item.id} onClick={()=>setView(item.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 0 8px",border:"none",cursor:"pointer",background:"transparent",fontFamily:"inherit",color:on?T.accent:"#555",position:"relative"}}><item.Icon size={20} strokeWidth={1.75}/><span style={{fontSize:9.5,fontWeight:on?600:400}}>{item.label}</span>{item.badge&&<span style={{position:"absolute",top:8,right:"calc(50% - 14px)",width:14,height:14,borderRadius:"50%",background:T.accent,color:"#000",fontSize:8,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{item.badge}</span>}</button>;})}
        </div>
      )}
    </div>
  );
};

const DemoForm = ({ onClose, onSubmit }) => {
  const T = T_();
  const w = useW();
  const isMobile = w < 640;
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [business, setBusiness] = useState("");
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const submit = async () => {
    if (!name || !email || !business) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
    onSubmit({ name, email, business, message });
    setTimeout(onClose, 2200);
  };

  return (
    // Backdrop
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      {/* Card — stop propagation so clicking inside doesn't close */}
      <div onClick={e=>e.stopPropagation()}
        style={{ width:"100%", maxWidth:480, background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:isMobile?"24px":"36px", position:"relative", animation:"halo-screen 0.25s ease", boxShadow:T.isDark?"0 32px 80px rgba(0,0,0,0.7)":"0 32px 80px rgba(0,0,0,0.15)" }}>
        <button onClick={onClose}
          style={{ position:"absolute", top:16, right:16, width:30, height:30, borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>
          <X size={14}/>
        </button>

        {done ? (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ width:52, height:52, borderRadius:13, background:T.greenBg, border:`1px solid ${T.green}30`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
              <Check size={24} color={T.green} strokeWidth={2.5}/>
            </div>
            <h3 style={{ fontSize:22, fontWeight:600, color:T.text, marginBottom:10, fontFamily:"'DM Serif Display', serif" }}>You're on the list!</h3>
            <p style={{ fontSize:14.5, color:T.sub, lineHeight:1.7 }}>We'll be in touch within 24 hours. In the meantime, your enquiry has been added to the dashboard.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:26 }}>
              <h3 style={{ fontSize:22, fontWeight:600, color:T.text, marginBottom:8, fontFamily:"'DM Serif Display', serif" }}>Book a demo</h3>
              <p style={{ fontSize:14, color:T.sub }}>We'll walk you through Halo and get you set up in under 30 minutes.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
              <FormField label="Your name *"     value={name}     onChange={setName}     placeholder="Jennifer O."              type="text"/>
              <FormField label="Email address *" value={email}    onChange={setEmail}    placeholder="you@yourbusiness.com"     type="email"/>
              <FormField label="Business name *" value={business} onChange={setBusiness} placeholder="Lumi Hair Studio"         type="text"/>
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:500, color:T.sub, marginBottom:6 }}>Anything specific you'd like to cover?</label>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="e.g. WhatsApp integration, invoice automation…" rows={3}
                  style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:`1px solid ${T.border}`, background:T.input, color:T.text, fontSize:13.5, outline:"none", resize:"none", fontFamily:"inherit", lineHeight:1.6, boxSizing:"border-box", transition:"border-color 0.15s" }}
                  onFocus={e=>e.target.style.borderColor=T.accent}
                  onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
            </div>
            <DemoSubmitBtn loading={loading} active={!!(name&&email&&business)} onClick={submit}/>
            <p style={{ fontSize:12, color:T.muted, textAlign:"center", marginTop:14 }}>No commitment. We'll set up a 20-minute call at a time that suits you.</p>
          </>
        )}
      </div>
    </div>
  );
};

const FormField = ({ label, value, onChange, placeholder, type }) => {
  const T = T_();
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display:"block", fontSize:13, fontWeight:500, color:T.sub, marginBottom:6 }}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:"100%", padding:"10px 14px", borderRadius:8, border:`1px solid ${focused?T.accent:T.border}`, background:T.input, color:T.text, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box", transition:"border-color 0.15s" }}/>
    </div>
  );
};

const DemoSubmitBtn = ({ loading, active, onClick }) => {
  const T = T_();
  const [h,setH]=useState(false);
  return (
    <button onClick={active&&!loading?onClick:undefined}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ width:"100%", padding:"13px", background:active?T.accent:T.raised, border:`1px solid ${active?T.accent:T.border}`, borderRadius:9, color:active?"#000":T.muted, fontSize:15, fontWeight:600, cursor:active&&!loading?"pointer":"default", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:h&&active?0.84:1, transition:"all 0.15s" }}>
      {loading ? <><RefreshCw size={15} style={{animation:"halo-spin 0.8s linear infinite"}}/> Booking your demo…</> : <>Book demo <ArrowRight size={15}/></>}
    </button>
  );
};


export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [screen, setScreen] = useState("website");
  const [fading, setFading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [events, setEvents] = useState(EVENTS0);

  const T = isDark ? DARK : LIGHT;

  const navigate = (next) => {
    setFading(true);
    setTimeout(() => { setScreen(next); setFading(false); }, 220);
  };

  const onNavClick = ({ page, id }) => {
    if (page === screen) {
      setTimeout(() => scrollTo(id), 50);
    } else {
      navigate(page);
      setTimeout(() => scrollTo(id), 320);
    }
  };

  const openDemo = () => setShowDemo(true);

  const handleDemoSubmit = ({ name, email, business, message }) => {
    const newEvent = {
      id: Date.now(), ch: "form",
      name, av: name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase(),
      elapsed: "just now", intent: "ENQUIRY", urgency: "MEDIUM", status: "PENDING", conf: 97,
      preview: `Demo request from ${business}`,
      msg: `Name: ${name}\nEmail: ${email}\nBusiness: ${business}${message ? `\nMessage: ${message}` : ""}`,
      reply: `Hi ${name.split(" ")[0]}! Thanks for reaching out — we'd love to show you Halo. I'll be in touch within 24 hours.`,
      action: "REPLY", summary: `Demo request · ${business}`, data: { Name: name, Email: email, Business: business },
    };
    setEvents(p => [newEvent, ...p]);
  };

  return (
    <Ctx.Provider value={T}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { font-family:'Inter',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
        ::selection { background:${T.accentBg}; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:99px; }
        input::placeholder, textarea::placeholder { color:${T.muted}; }
        @keyframes halo-bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @keyframes halo-bounce { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-3px);opacity:1} }
        @keyframes halo-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes halo-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes halo-msg-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes halo-screen { from{opacity:0} to{opacity:1} }
        @keyframes halo-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
      `}</style>

      <div style={{ opacity:fading?0:1, transition:"opacity 0.22s ease", height:"100vh", overflow:"hidden" }}>

        {showDemo && <DemoForm onClose={()=>setShowDemo(false)} onSubmit={handleDemoSubmit}/>}

        {screen === "website" && (
          <div data-scroll="" style={{ background:T.page, color:T.text, height:"100vh", overflowY:"auto", overflowX:"hidden", transition:"background 0.25s,color 0.25s" }}>
            <AnnouncementBar onSignup={()=>navigate("signup")}/>
            <SiteNav isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} screen="website" onNav={onNavClick}/>
            <main style={{ overflowX:"hidden" }}>
              <Hero onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick}/>
              <WhyHalo/>
              <FeaturesTeaserStrip onNav={onNavClick}/>
              <Testimonials/>
              <CtaSection onSignup={()=>navigate("signup")} onBookDemo={openDemo}/>
            </main>
            <SiteFooter onNav={onNavClick}/>
            <StickyMobileCta onSignup={()=>navigate("signup")}/>
          </div>
        )}

        {screen === "features" && (
          <FeaturesPage isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick}/>
        )}

        {screen === "demo" && (
          <DemoPage isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick} events={events} setEvents={setEvents}/>
        )}

        {screen === "bookings" && (
          <BookingsPage isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick}/>
        )}

        {screen === "invoices" && (
          <InvoicesPage isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick}/>
        )}

        {screen === "about" && (
          <AboutPage isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick}/>
        )}

        {screen === "pricing" && (
          <PricingPage isDark={isDark} onToggle={()=>setIsDark(d=>!d)} onSignin={()=>navigate("signin")} onSignup={()=>navigate("signup")} onBookDemo={openDemo} onNav={onNavClick}/>
        )}

        {(screen === "signin" || screen === "signup") && (
          <div style={{ animation:"halo-screen 0.3s ease" }}>
            <AuthScreen mode={screen} onSuccess={()=>navigate("app")} onSwitch={()=>navigate(screen==="signin"?"signup":"signin")} onBack={()=>navigate("website")} isDark={isDark} onToggle={()=>setIsDark(d=>!d)}/>
          </div>
        )}

        {screen === "app" && (
          <div style={{ animation:"halo-screen 0.3s ease", height:"100vh" }}>
            <Dashboard onBack={()=>navigate("website")} isDark={isDark} onToggle={()=>setIsDark(d=>!d)} events={events} setEvents={setEvents}/>
          </div>
        )}

      </div>
    </Ctx.Provider>
  );
}

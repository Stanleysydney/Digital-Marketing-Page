import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./LandingPage.css";

const STATS = [
  { value:"2M+",  label:"Users Reached",       icon:"fa-solid fa-users" },
  { value:"98%",  label:"Client Satisfaction",  icon:"fa-solid fa-star" },
  { value:"500+", label:"Campaigns Launched",   icon:"fa-solid fa-rocket" },
  { value:"10x",  label:"Average ROI",          icon:"fa-solid fa-chart-line" },
];

const SERVICES = [
  { icon:"fa-solid fa-magnifying-glass-chart", color:"#1d9bf0", title:"SEO Mastery",        desc:"Rank on page 1 of Google with proven keyword strategy, technical audits, and link-building frameworks." },
  { icon:"fa-brands fa-instagram",             color:"#e1306c", title:"Social Media Growth", desc:"Build an engaged following across Twitter, Instagram, TikTok, and LinkedIn using data-driven content calendars." },
  { icon:"fa-solid fa-envelope-open-text",     color:"#ffd700", title:"Email Marketing",     desc:"Craft automated drip campaigns with open rates above 40% and click-through rates that convert leads to buyers." },
  { icon:"fa-solid fa-pen-nib",                color:"#00e676", title:"Content Strategy",    desc:"From viral blog posts to video scripts — content that educates, entertains, and sells without being pushy." },
  { icon:"fa-solid fa-chart-bar",              color:"#ff6d00", title:"Analytics & Data",    desc:"Track every click, conversion, and campaign with Google Analytics, Meta Pixel, and custom dashboards." },
  { icon:"fa-solid fa-bullhorn",               color:"#9c27b0", title:"Paid Ads (PPC)",      desc:"Run profitable Google Ads, Meta Ads, and TikTok campaigns with smart bidding that maximises your budget." },
];

const TESTIMONIALS = [
  { name:"Amara Okonkwo",  role:"E-commerce Founder, Lagos",     avatar:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop", quote:"DigiPulse completely transformed our online presence. In 6 months, our revenue doubled thanks to their SEO and email automation strategy.", stars:5 },
  { name:"Kwame Mensah",   role:"Marketing Director, Accra",     avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", quote:"The step-by-step digital marketing framework they taught us is unmatched. Our Instagram went from 2K to 80K followers in 90 days!", stars:5 },
  { name:"Zara Ahmed",     role:"Content Creator, Nairobi",      avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop", quote:"Best investment I've made for my brand. Their content strategy module alone was worth 10x the price. Highly recommend to any creator.", stars:5 },
];

const SOCIAL_SHARE = [
  { name:"Twitter/X",  icon:"fa-brands fa-x-twitter",    href:"https://twitter.com/intent/tweet?text=Learning%20Digital%20Marketing%20with%20DigiPulse!%20🚀&url=https://digipulse.com", color:"#1d9bf0" },
  { name:"WhatsApp",   icon:"fa-brands fa-whatsapp",      href:"https://wa.me/?text=Check%20out%20DigiPulse%20-%20Master%20Digital%20Marketing!%20https://digipulse.com",                color:"#25d366" },
  { name:"Facebook",   icon:"fa-brands fa-facebook-f",    href:"https://www.facebook.com/sharer/sharer.php?u=https://digipulse.com",                                                     color:"#1877f2" },
  { name:"LinkedIn",   icon:"fa-brands fa-linkedin-in",   href:"https://www.linkedin.com/shareArticle?mini=true&url=https://digipulse.com&title=DigiPulse%20Digital%20Marketing",        color:"#0a66c2" },
  { name:"Telegram",   icon:"fa-brands fa-telegram",      href:"https://t.me/share/url?url=https://digipulse.com&text=Master%20Digital%20Marketing",                                     color:"#2ca5e0" },
  { name:"Instagram",  icon:"fa-brands fa-instagram",     href:"https://www.instagram.com/explore/tags/digitalmarketing/",                                                               color:"#e1306c" },
  { name:"TikTok",     icon:"fa-brands fa-tiktok",        href:"https://www.tiktok.com/tag/digitalmarketing",                                                                            color:"#69c9d0" },
  { name:"YouTube",    icon:"fa-brands fa-youtube",       href:"https://www.youtube.com/results?search_query=digital+marketing+tutorial+2024",                                           color:"#ff0000" },
  { name:"Pinterest",  icon:"fa-brands fa-pinterest-p",   href:"https://www.pinterest.com/search/pins/?q=digital%20marketing",                                                          color:"#e60023" },
  { name:"Reddit",     icon:"fa-brands fa-reddit-alien",  href:"https://www.reddit.com/r/digital_marketing/",                                                                           color:"#ff4500" },
];

const BLOG_POSTS = [
  { img:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=350&fit=crop", category:"SEO",          title:"10 SEO Hacks That Will Triple Your Organic Traffic in 2024",              excerpt:"Discover the latest on-page and off-page tactics to dominate Google search results and bring in free traffic 24/7.",                                            read:"5 min read" },
  { img:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=350&fit=crop", category:"Social Media", title:"How to Grow From 0 to 100K Followers on Instagram Organically",           excerpt:"A real, step-by-step guide used by top creators to build massive followings without spending a single dollar on ads.",                                         read:"8 min read" },
  { img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=350&fit=crop", category:"Email",        title:"The Email Sequence That Converts Cold Leads Into Loyal Customers",        excerpt:"Copy our 7-part welcome sequence with subject lines, timing, and CTA strategies that consistently achieve 45% open rates.",                                   read:"6 min read" },
];

export default function LandingPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", interest:"" });
  const [loading, setLoading] = useState(false);
  const [counters, setCounters] = useState({ c0:0, c1:0, c2:0, c3:0 });
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsAnimated.current) {
        statsAnimated.current = true;
        const targets = [2000000, 98, 500, 10];
        ["c0","c1","c2","c3"].forEach((key, i) => {
          const target = targets[i];
          let current = 0;
          const step = Math.ceil(target / 80);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            setCounters(prev => ({ ...prev, [key]: current }));
            if (current >= target) clearInterval(interval);
          }, 18);
        });
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please fill in your name and email."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { toast.success("🎉 " + data.message); setForm({ name:"", email:"", phone:"", interest:"" }); }
      else toast.error(data.error || "Something went wrong.");
    } catch {
      toast.info("🎉 You're on the list! (Demo mode)");
      setForm({ name:"", email:"", phone:"", interest:"" });
    } finally { setLoading(false); }
  };

  const formatCount = (key, i) => {
    const val = counters[key];
    if (i === 0) return val >= 1000000 ? `${(val/1000000).toFixed(1)}M+` : val.toLocaleString();
    if (i === 1) return `${val}%`;
    if (i === 2) return `${val}+`;
    return `${val}x`;
  };

  return (
    <div className="landing">

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="section-tag animate-fadeUp delay-1">🚀 Digital Marketing Mastery</div>
            <h1 className="hero__title animate-fadeUp delay-2">
              How to Do <br /><span className="gradient-text">Digital Marketing</span><br />the Right Way
            </h1>
            <p className="hero__sub animate-fadeUp delay-3">
              Master every channel — SEO, Social Media, Email, Paid Ads, and Content Strategy.
              Join <strong>2 million+</strong> marketers growing their brands with DigiPulse.
            </p>
            <div className="hero__ctas animate-fadeUp delay-4">
              <a href="#contact" className="btn-primary">Buy Now <i className="fa-solid fa-bolt" /></a>
              <a href="#services" className="btn-outline">Explore Services <i className="fa-solid fa-compass" /></a>
            </div>
            <div className="hero__proof animate-fadeUp delay-5">
              <div className="proof__avatars">
                {["photo-1531746020798-e6953c6e8e04","photo-1507003211169-0a1dd7228f2d","photo-1494790108755-2616b612b786","photo-1438761681033-6461ffad8d80"].map((id,i) => (
                  <img key={i} src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop`} alt="user" />
                ))}
              </div>
              <span className="proof__text"><strong>2M+</strong> marketers already growing with DigiPulse</span>
            </div>
          </div>
          <div className="hero__visual animate-slideR delay-3">
            <div className="hero__img-wrap">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop" alt="Digital Marketing Dashboard" className="hero__img" />
              <div className="hero__badge hero__badge--top">
                <i className="fa-solid fa-chart-line" style={{color:"#00e676"}} />
                <div><span className="badge-val">+340%</span><span className="badge-lbl">Traffic Growth</span></div>
              </div>
              <div className="hero__badge hero__badge--bot">
                <i className="fa-solid fa-users" style={{color:"#1d9bf0"}} />
                <div><span className="badge-val">2,000,000+</span><span className="badge-lbl">Users Reached</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__ticker">
          <div className="ticker__track">
            {["SEO","Social Media","Email Marketing","Content Creation","Paid Ads","Analytics","Branding","Lead Generation","Conversion Optimization","Video Marketing",
              "SEO","Social Media","Email Marketing","Content Creation","Paid Ads","Analytics","Branding","Lead Generation","Conversion Optimization","Video Marketing"].map((t,i) => (
              <span key={i} className="ticker__item"><i className="fa-solid fa-bolt" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats section-pad" id="stats" ref={statsRef}>
        <div className="container">
          <div className="stats__grid">
            {STATS.map((s,i) => (
              <div key={i} className={`stats__card animate-fadeUp delay-${i+1}`}>
                <div className="stats__icon"><i className={s.icon} /></div>
                <div className="stats__val gradient-text">{formatCount(`c${i}`,i)}</div>
                <div className="stats__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services section-pad" id="services">
        <div className="container">
          <div className="section-center animate-fadeUp">
            <span className="section-tag">What We Teach</span>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Dominate Online</span></h2>
            <p className="section-sub">From beginner to pro — our step-by-step modules cover every digital marketing channel.</p>
          </div>
          <div className="services__grid">
            {SERVICES.map((s,i) => (
              <div key={i} className={`card services__card animate-fadeUp delay-${(i%3)+1}`}>
                <div className="services__icon" style={{background:s.color+"22",color:s.color}}><i className={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href="#contact" className="services__cta">Learn More <i className="fa-solid fa-arrow-right" /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="video-section section-pad">
        <div className="container video-section__inner">
          <div className="video-section__text animate-slideL">
            <span className="section-tag">Featured Video</span>
            <h2 className="section-title">Watch: How to Build a <span className="gradient-text">$10K/Month</span> Digital Brand</h2>
            <p style={{color:"var(--clr-text-muted)",marginBottom:24,lineHeight:1.8}}>In this free masterclass, we break down the exact step-by-step strategy used by top digital marketers to grow their online presence, attract clients, and build a sustainable income stream from scratch.</p>
            <a href="https://www.youtube.com/results?search_query=digital+marketing+strategy+2024" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <i className="fa-brands fa-youtube" /> Watch on YouTube
            </a>
          </div>
          <div className="video-section__embed animate-slideR delay-2">
            <div className="video-thumb">
              <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=400&fit=crop" alt="Digital Marketing Masterclass" />
              <a href="https://www.youtube.com/results?search_query=digital+marketing+masterclass" target="_blank" rel="noopener noreferrer" className="play-btn" aria-label="Play video">
                <i className="fa-solid fa-play" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials section-pad">
        <div className="container">
          <div className="section-center animate-fadeUp">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">Real Results from <span className="gradient-text">Real Marketers</span></h2>
          </div>
          <div className="testimonials__grid">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className={`card testimonial__card animate-fadeUp delay-${i+1}`}>
                <div className="testimonial__stars">{Array.from({length:t.stars}).map((_,j) => <i key={j} className="fa-solid fa-star" style={{color:"#ffd700"}} />)}</div>
                <p className="testimonial__quote">"{t.quote}"</p>
                <div className="testimonial__author">
                  <img src={t.avatar} alt={t.name} />
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL ── */}
      <section className="social-section section-pad" id="social">
        <div className="container">
          <div className="section-center animate-fadeUp">
            <span className="section-tag">Connect With Us</span>
            <h2 className="section-title">Follow Us on <span className="gradient-text">Every Platform</span></h2>
            <p className="section-sub">Join our community across all social media. Share, like, and engage — every platform below is active and clickable!</p>
          </div>
          <div className="social-grid">
            {SOCIAL_SHARE.map((s,i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`social-card animate-fadeUp delay-${(i%4)+1}`} style={{"--c":s.color}} aria-label={`Visit ${s.name}`}>
                <div className="social-card__icon"><i className={s.icon} /></div>
                <span className="social-card__name">{s.name}</span>
                <span className="social-card__action">Visit <i className="fa-solid fa-arrow-up-right-from-square" /></span>
              </a>
            ))}
          </div>
          <div className="whatsapp-cta animate-fadeUp">
            <div className="whatsapp-cta__inner">
              <div className="whatsapp-icon"><i className="fa-brands fa-whatsapp" /></div>
              <div className="whatsapp-text">
                <h3>Chat with us on WhatsApp</h3>
                <p>Get instant answers to your digital marketing questions. Our team is online and ready to help!</p>
              </div>
              <a href="https://wa.me/254700000000?text=Hi%20DigiPulse!%20I%20want%20to%20learn%20digital%20marketing." target="_blank" rel="noopener noreferrer" className="btn-primary">
                <i className="fa-brands fa-whatsapp" /> Start Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="blog section-pad">
        <div className="container">
          <div className="section-center animate-fadeUp">
            <span className="section-tag">Latest Insights</span>
            <h2 className="section-title">From Our <span className="gradient-text">Marketing Blog</span></h2>
          </div>
          <div className="blog__grid">
            {BLOG_POSTS.map((post,i) => (
              <div key={i} className={`card blog__card animate-fadeUp delay-${i+1}`}>
                <div className="blog__img-wrap">
                  <img src={post.img} alt={post.title} />
                  <span className="blog__cat">{post.category}</span>
                </div>
                <div className="blog__body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog__footer">
                    <span><i className="fa-regular fa-clock" /> {post.read}</span>
                    <a href="/blog" className="blog__read-more">Read More <i className="fa-solid fa-arrow-right" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact section-pad" id="contact">
        <div className="container contact__inner">
          <div className="contact__text animate-slideL">
            <span className="section-tag">Get Started Free</span>
            <h2 className="section-title">Ready to <span className="gradient-text">Grow Your Brand?</span></h2>
            <p style={{color:"var(--clr-text-muted)",lineHeight:1.8,marginBottom:32}}>Join 2 million+ digital marketers getting our weekly tips, strategies, and resources. No spam, ever. Unsubscribe anytime.</p>
            <ul className="contact__benefits">
              {["Free digital marketing checklist","Weekly SEO & social media tips","Exclusive templates and swipe files","Access to our private community"].map((b,i) => (
                <li key={i}><i className="fa-solid fa-circle-check" style={{color:"var(--clr-green)"}} /> {b}</li>
              ))}
            </ul>
          </div>
          <div className="contact__form-wrap animate-slideR delay-2">
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <h3>Join 2M+ Marketers Today</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" placeholder="Your full name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">WhatsApp Number (optional)</label>
                <input type="tel" id="phone" placeholder="+254 700 000 000" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="interest">Main Interest</label>
                <select id="interest" value={form.interest} onChange={e => setForm({...form,interest:e.target.value})}>
                  <option value="">Select your focus area...</option>
                  <option value="seo">SEO & Search Marketing</option>
                  <option value="social">Social Media Marketing</option>
                  <option value="email">Email Marketing</option>
                  <option value="content">Content Creation</option>
                  <option value="ads">Paid Advertising</option>
                  <option value="analytics">Analytics & Data</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{width:"100%",justifyContent:"center"}} disabled={loading}>
                {loading ? <><i className="fa-solid fa-spinner fa-spin" /> Submitting…</> : <><i className="fa-solid fa-paper-plane" /> Get Free Access</>}
              </button>
              <p className="form__note"><i className="fa-solid fa-lock" /> 100% secure. We never share your data.</p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

const ARTICLES = [
  { img:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=700&h=400&fit=crop", category:"SEO",            catColor:"#1d9bf0", title:"10 SEO Hacks That Will Triple Your Organic Traffic in 2024",              excerpt:"Discover the latest on-page and off-page tactics to dominate Google search results and bring in free, targeted traffic 24/7 without relying on paid advertising.", author:"Amara Okonkwo",  date:"June 12, 2024",  read:"5 min read",  href:"https://moz.com/beginners-guide-to-seo" },
  { img:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=400&fit=crop", category:"Social Media",   catColor:"#e1306c", title:"How to Grow From 0 to 100K Followers on Instagram Organically",           excerpt:"A real, step-by-step guide used by top creators to build massive followings without spending a dollar on ads. Consistency, strategy, and the right hooks.",         author:"Kwame Mensah",   date:"May 28, 2024",   read:"8 min read",  href:"https://later.com/blog/how-to-get-more-followers-on-instagram/" },
  { img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&h=400&fit=crop", category:"Email Marketing",catColor:"#ffd700", title:"The Email Sequence That Converts Cold Leads Into Loyal Customers",         excerpt:"Copy our proven 7-part welcome sequence complete with subject lines, send timing, and CTA strategies that consistently achieve 45%+ open rates.",                   author:"Zara Ahmed",     date:"May 14, 2024",   read:"6 min read",  href:"https://mailchimp.com/resources/email-marketing-field-guide/" },
  { img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=400&fit=crop", category:"Analytics",       catColor:"#00e676", title:"Google Analytics 4: The Complete Beginner's Guide",                        excerpt:"GA4 is now the standard. Learn how to set up goals, track conversions, and build custom dashboards that show exactly where your traffic comes from.",               author:"James Kimani",   date:"April 30, 2024", read:"10 min read", href:"https://analytics.google.com/analytics/academy/" },
  { img:"https://images.unsplash.com/photo-1579616043078-4b28e6f1e77a?w=700&h=400&fit=crop", category:"Paid Ads",      catColor:"#ff6d00", title:"How to Run Facebook Ads That Actually Convert in 2024",                   excerpt:"Stop burning money on Facebook Ads that don't work. Here's the targeting, creative, and bidding strategy our clients use to achieve 3–5x ROAS consistently.",      author:"Sandra Mwangi",  date:"April 18, 2024", read:"7 min read",  href:"https://www.facebook.com/business/ads" },
  { img:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=400&fit=crop", category:"Content",       catColor:"#9c27b0", title:"Content Marketing Blueprint: From Zero to Viral in 90 Days",              excerpt:"Learn the exact content strategy framework used by fast-growing startups to create content that ranks, gets shared, and drives qualified leads month after month.", author:"Leo Odhiambo",   date:"April 5, 2024",  read:"9 min read",  href:"https://contentmarketinginstitute.com/" },
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container blog-hero__inner">
          <span className="section-tag animate-fadeUp">Marketing Insights</span>
          <h1 className="section-title animate-fadeUp delay-2">The DigiPulse <span className="gradient-text">Marketing Blog</span></h1>
          <p className="section-sub animate-fadeUp delay-3">Actionable strategies, deep-dives, and expert advice to help you grow your brand online.</p>
        </div>
      </section>
      <section className="blog-page__articles container">
        <div className="blog-page__grid">
          {ARTICLES.map((post,i) => (
            <a key={i} href={post.href} target="_blank" rel="noopener noreferrer" className={`bp-card animate-fadeUp delay-${(i%3)+1}`}>
              <div className="bp-card__img-wrap">
                <img src={post.img} alt={post.title} />
                <span className="bp-card__cat" style={{background:post.catColor}}>{post.category}</span>
              </div>
              <div className="bp-card__body">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="bp-card__meta">
                  <span><i className="fa-solid fa-user" /> {post.author}</span>
                  <span><i className="fa-regular fa-calendar" /> {post.date}</span>
                  <span><i className="fa-regular fa-clock" /> {post.read}</span>
                </div>
                <div className="bp-card__read">Read Article <i className="fa-solid fa-arrow-right" /></div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <div className="container" style={{textAlign:"center",padding:"48px 0 100px"}}>
        <Link to="/" className="btn-outline"><i className="fa-solid fa-arrow-left" /> Back to Home</Link>
      </div>
    </div>
  );
}
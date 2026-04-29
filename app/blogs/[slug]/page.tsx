"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { Outfit } from 'next/font/google';
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ChevronLeft, 
  Send, 
  Globe, 
  Bookmark,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import styles from './blog-slug.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const blogPosts = [
  {
    slug: 'top-10-cctv-installation-tips-dubai',
    title: 'Top 10 CCTV Installation Tips for Dubai Businesses',
    author: 'Eng. Ahmed Khan',
    category: 'Security Tips',
    date: 'Oct 24, 2026',
    readTime: '8 min read',
    content: `
      <p>Ensuring your commercial property is secure requires more than just high-end cameras. As Dubai continues to grow as a global business hub, the demand for sophisticated security solutions has never been higher. At Hikvision Dubai, we've installed thousands of systems, and here are our top 10 tips for a perfect setup.</p>
      
      <h2>1. Strategic Camera Placement</h2>
      <p>Don't just point cameras at doors. You need to consider "blind spots" and lighting conditions. In Dubai's bright sunlight, Wide Dynamic Range (WDR) cameras are essential to avoid silhouettes and lens flares.</p>
      
      <blockquote>"Security is not a product, it's a process. Proper installation is 50% of the battle won against potential threats."</blockquote>

      <h2>2. High-Resolution Matters</h2>
      <p>In the event of an incident, 1080p often isn't enough to identify faces or license plates from a distance. We recommend at least 4K resolution for critical entry and exit points.</p>

      <h2>3. SIRA Compliance</h2>
      <p>Every commercial entity in Dubai must comply with SIRA (Security Industry Regulatory Agency) standards. This includes specific retention periods for footage (usually 31 days) and precise camera specifications for public-facing areas.</p>

      <h2>4. Redundant Storage</h2>
      <p>Hard drive failure is a reality. Use NVRs with RAID configurations to ensure that if one disk fails, your footage is still safe on another.</p>
    `
  },
  {
    slug: 'understanding-sira-regulations-dubai',
    title: 'Understanding SIRA Regulations for Security Systems',
    author: 'Sarah Jenkins',
    category: 'Legal & Safety',
    date: 'Oct 20, 2026',
    readTime: '12 min read',
    content: `
      <p>Operating a business in Dubai comes with a set of security responsibilities governed by SIRA. Navigating these regulations can be complex, but failure to comply can result in heavy fines or licensing issues.</p>
      
      <h2>What is SIRA?</h2>
      <p>The Security Industry Regulatory Agency (SIRA) is the governing body that sets the standards for security systems in the Emirate of Dubai. Their goal is to make Dubai one of the safest cities in the world.</p>
      
      <h2>Key Requirements for 2026</h2>
      <ul>
        <li><strong>Video Retention:</strong> Most businesses are required to keep 31 days of recorded footage.</li>
        <li><strong>Field of View:</strong> Cameras must cover all entry points, reception areas, and cash handling sections.</li>
        <li><strong>Maintenance Logs:</strong> You must keep a digital log of all system checks and repairs.</li>
      </ul>

      <blockquote>"Compliance is not just about avoiding fines; it's about contributing to the collective safety of our community."</blockquote>

      <h2>How We Help</h2>
      <p>As a SIRA-approved security provider, Hikvision Dubai ensures that every installation meets these rigorous standards from day one, handling all the paperwork and certification for you.</p>
    `
  },
  {
    slug: 'ai-in-surveillance-future-of-facial-recognition',
    title: 'AI in Surveillance: The Future of Facial Recognition',
    author: 'Dr. Leo Zhang',
    category: 'Technology',
    date: 'Oct 15, 2026',
    readTime: '6 min read',
    content: `
      <p>The days of CCTV being a "passive observer" are over. Today, AI-driven surveillance systems are proactive, intelligent, and capable of making split-second decisions.</p>
      
      <h2>Deep Learning Technology</h2>
      <p>Hikvision's latest DeepinMind NVRs use deep learning algorithms to distinguish between human movement and other objects like animals or falling leaves, reducing false alarms by up to 90%.</p>
      
      <h2>Facial Recognition in Retail</h2>
      <p>Beyond security, facial recognition is being used to enhance customer experiences. Retailers can identify VIP customers as they walk in or analyze footfall patterns to optimize store layouts.</p>

      <blockquote>"AI doesn't just watch; it understands. It transforms raw video data into actionable business intelligence."</blockquote>

      <h2>The Ethics of AI</h2>
      <p>We implement strict data privacy protocols and encryption to ensure that AI data is used responsibly and stays within your private network.</p>
    `
  },
  {
    slug: 'why-smart-home-integration-must-2026',
    title: 'Why Smart Home Integration is a Must in 2026',
    author: 'Michael Rossi',
    category: 'Smart Home',
    date: 'Oct 10, 2026',
    readTime: '5 min read',
    content: `
      <p>A smart home isn't just about voice-controlled lights; it's about a unified ecosystem where your security system talks to the rest of your house.</p>
      
      <h2>Unified Control</h2>
      <p>Imagine your security cameras detecting your car arriving home, which then triggers the garage to open, the hallway lights to turn on, and the AC to start. This is the power of Hikvision integration.</p>
      
      <h2>Real-time Alert Logic</h2>
      <p>If your smart lock is tampered with, your cameras can automatically rotate to that specific angle and start recording in high-speed mode while sending an instant alert to your phone.</p>

      <blockquote>"A truly smart home is one that protects itself before you even know there's a problem."</blockquote>

      <h2>Voice Assistant Support</h2>
      <p>Our systems now fully support Alexa and Google Assistant, allowing you to say "Hey Google, show me the front door" to see a live feed on your kitchen display.</p>
    `
  },
  {
    slug: 'maintaining-security-system-uae-heat',
    title: 'Maintaining Your Security System in Extreme UAE Heat',
    author: 'Eng. Omar Saeed',
    category: 'Maintenance',
    date: 'Oct 5, 2026',
    readTime: '7 min read',
    content: `
      <p>The UAE summer is one of the harshest environments for electronic equipment. Dust, humidity, and temperatures exceeding 50°C can take a toll on your surveillance hardware.</p>
      
      <h2>Thermal Management</h2>
      <p>Ensure your NVR is kept in a climate-controlled server room. For outdoor cameras, we use industrial-grade Hikvision units with built-in cooling fans and heat-resistant glass.</p>
      
      <h2>The Dust Factor</h2>
      <p>Sand accumulation on camera lenses can degrade image quality significantly. We recommend a professional cleaning every 3 months to maintain crystal-clear visibility.</p>

      <blockquote>"Maintenance is cheaper than replacement. A little care today prevents a total system failure in August."</blockquote>

      <h2>Power Stability</h2>
      <p>Power surges are common during peak summer. Using a high-quality UPS (Uninterruptible Power Supply) is mandatory to protect your sensitive security chips from frying.</p>
    `
  },
  {
    slug: 'benefits-remote-monitoring-homeowners',
    title: 'The Benefits of Remote Monitoring for Homeowners',
    author: 'Jessica Miller',
    category: 'Remote Access',
    date: 'Oct 1, 2026',
    readTime: '4 min read',
    content: `
      <p>Whether you're at work or traveling abroad, the ability to check on your home provides peace of mind that is truly priceless.</p>
      
      <h2>The Hik-Connect App</h2>
      <p>Our flagship app allows you to view live streams, playback recorded events, and even talk through your camera's built-in speaker with a single tap.</p>
      
      <h2>Instant Push Notifications</h2>
      <p>Get notified the moment a delivery driver arrives or if someone enters your backyard. You can verify the situation in seconds and take action if needed.</p>

      <blockquote>"Your home is your sanctuary. Remote monitoring ensures that sanctuary stays secure, no matter where you are in the world."</blockquote>

      <h2>Secure Sharing</h2>
      <p>You can easily share specific camera views with family members or security staff, while maintaining full control over their access levels.</p>
    `
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const currentSlug = params.slug as string;
  const post = blogPosts.find(p => p.slug === currentSlug);

  if (!post) {
    notFound();
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this article: ${post.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Find index for "Next Post" logic
  const currentIndex = blogPosts.findIndex(p => p.slug === currentSlug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <>
      {/* Breadcrumb */}
      <div className={styles.container}>
        <Link href="/blogs" className={styles.backLink}>
          <ChevronLeft size={18} />
          Back to Articles
        </Link>
      </div>

      {/* Article Header - Replaced image with a more powerful typographic header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.categoryBadge}>{post.category}</div>
          <h1 className={`${styles.articleTitle} ${outfit.className}`}>{post.title}</h1>
          
          <div className={styles.articleMeta}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>
                <User size={20} />
              </div>
              <span>{post.author}</span>
            </div>
            <div className={styles.metaDivider}></div>
            <div className={styles.dateInfo}>
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className={styles.metaDivider}></div>
            <div className={styles.timeInfo}>
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content Layout */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.layoutGrid}>
            
            {/* Left: Share Sidebar (Sticky) */}
            <aside className={styles.sidebar}>
              <div className={styles.stickyBox}>
                <p className={styles.sidebarLabel}>Share Article</p>
                <div className={styles.shareButtons}>
                  <button className={styles.shareBtn} onClick={handleShare} title="Copy Link">
                    <Send size={20} />
                  </button>
                  <button className={styles.shareBtn} onClick={handleShare} title="Share Link">
                    <Globe size={20} />
                  </button>
                  <button className={styles.shareBtn} onClick={handleShare} title="Native Share">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </aside>

            {/* Center: Content */}
            <article className={styles.articleBody}>
              <div 
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className={styles.articleFooter}>
                <div className={styles.tags}>
                  <span className={styles.tag}>#Hikvision</span>
                  <span className={styles.tag}>#DubaiSecurity</span>
                  <span className={styles.tag}>#CCTV</span>
                  <span className={styles.tag}>#SecuritySystems</span>
                </div>
                
                <div className={styles.footerActions}>
                  <Link href="/blogs" className={styles.backButton}>
                    <ChevronLeft size={20} />
                    Back to all Blogs
                  </Link>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Next Post CTA */}
      <section className={styles.nextPostSection}>
        <div className={styles.container}>
          <div className={styles.nextCard}>
            <p>Up Next</p>
            <h2 className={outfit.className}>{nextPost.title}</h2>
            <Link href={`/blogs/${nextPost.slug}`} className={styles.nextLink}>
              Read Next Article <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

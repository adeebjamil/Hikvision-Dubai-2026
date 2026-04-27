"use client";

import React, { useState } from 'react';
import { Outfit } from 'next/font/google';
import { 
  Globe, 
  MessageSquare, 
  Share2, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Detailed CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaInfo}>
              <span className={styles.ctaBadge}>Authorized Partner</span>
              <h2 className={`${styles.ctaTitle} ${outfit.className}`}>Upgrade Your Security System Today</h2>
              <p className={styles.ctaText}>Get expert advice and professional installation services from Dubai's leading Hikvision specialists.</p>
            </div>
            <div className={styles.ctaActions}>
              <a href="https://wa.me/971552929644" className={styles.whatsappBtn}>
                Chat on WhatsApp
              </a>
              <button className={styles.quoteBtn}>
                Get A Free Quote <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.grid}>
            
            {/* Column 1: Brand & Desc */}
            <div className={styles.col}>
              <div className={styles.logoWrapper}>
                <Image 
                  src="/logo.png" 
                  alt="Hikvision Dubai Logo" 
                  width={220} 
                  height={60} 
                  className={styles.logo}
                />
              </div>
              <p className={styles.description}>
                Providing advanced surveillance and security solutions for residential and commercial clients across the UAE. Official distributor of Hikvision technology.
              </p>
              <div className={styles.socials}>
                <a href="#" className={styles.socialIcon} aria-label="Facebook"><Globe size={20} /></a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter"><MessageSquare size={20} /></a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram"><Share2 size={20} /></a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><ExternalLink size={20} /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.col}>
              <h4 className={`${styles.title} ${outfit.className}`}>Quick Links</h4>
              <ul className={styles.links}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/blogs">Blogs</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Product Series */}
            <div className={styles.col}>
              <h4 className={`${styles.title} ${outfit.className}`}>Product Series</h4>
              <ul className={styles.links}>
                <li><Link href="/products/cctv-camera/network-camera">Network Camera</Link></li>
                <li><Link href="/products/cctv-camera/ptz-camera">PTZ Camera</Link></li>
                <li><Link href="/products/cctv-camera/explosion-proof">Explosion Proof</Link></li>
                <li><Link href="/products/cctv-camera/turbohd">TurboHD</Link></li>
                <li><Link href="/products/cctv-assesories/network-video-recorder">Network Video Recorder</Link></li>
                <li><Link href="/products/cctv-assesories/dvr">DVR</Link></li>
                <li><Link href="/products/cctv-assesories/access-control">Access Control</Link></li>
                <li><Link href="/products/cctv-assesories/video-intercom">Video Intercom</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Detailed */}
            <div className={styles.col}>
              <h4 className={`${styles.title} ${outfit.className}`}>Contact Info</h4>
              <ul className={styles.contactDetails}>
                <li>
                  <Phone size={18} className={styles.redIcon} />
                  <div>
                    <span className={styles.contactLabel}>Phone:</span>
                    <a href="tel:+971552929644" className={styles.contactValue}>+971 55 292 9644</a>
                  </div>
                </li>
                <li>
                  <Mail size={18} className={styles.redIcon} />
                  <div>
                    <span className={styles.contactLabel}>Email:</span>
                    <a href="mailto:sales@lovosis.com" className={styles.contactValue}>sales@lovosis.com</a>
                  </div>
                </li>
                <li>
                  <MapPin size={18} className={styles.redIcon} />
                  <div>
                    <span className={styles.contactLabel}>Location:</span>
                    <span className={styles.contactValue}>25th St - Naif - Dubai - UAE</span>
                  </div>
                </li>
                <li>
                  <Clock size={18} className={styles.redIcon} />
                  <div>
                    <span className={styles.contactLabel}>Business Hours:</span>
                    <span className={styles.contactValue}>Mon - Sat: 9:00 AM - 7:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Newsletter Section Integrated into Footer */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterText}>
              <h3 className={outfit.className}>Stay Updated</h3>
              <p>Get the latest security tips and Hikvision updates.</p>
            </div>
            {subscribed ? (
              <div className={styles.successMessage}>
                <ShieldCheck size={24} />
                <div>
                  <h4>Thank you for subscribing!</h4>
                  <p>You'll receive our latest updates soon.</p>
                </div>
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required 
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
        </div>

        {/* Brand Bar */}
        <div className={styles.brandBar}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} <span className={styles.boldText}>Hikvision Camera Dubai</span>. All Rights Reserved.
          </div>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

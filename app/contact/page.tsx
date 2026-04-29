"use client";

import React, { useState } from 'react';
import { Outfit } from 'next/font/google';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  Monitor,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import styles from './contact.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800', '900'] });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "CCTV Systems",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: "", email: "", phone: "", service: "CCTV Systems", message: "" });
      } else {
        setStatus({ type: 'error', message: data.message || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ type: 'error', message: "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Cinematic Landscape Hero */}
      <section className={styles.contactHero}>
        <Image 
          src="/abouthero.png" 
          alt="Dubai Security Landscape" 
          fill
          className={styles.heroImg}
          priority
        />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Monitor size={20} />
            <span>Next-Gen Security Support</span>
          </div>
          <h1 className={`${styles.heroTitle} ${outfit.className}`}>
            Let's Secure <br />
            Your <span style={{ color: '#800000' }}>Future</span>
          </h1>
        </div>
      </section>

      {/* Horizontal Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <a href="tel:+971552929644" className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Phone size={32} />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>+971 55 292 9644</p>
              </div>
            </a>

            <a href="mailto:sales@lovosis.com" className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Mail size={32} />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>sales@lovosis.com</p>
              </div>
            </a>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <MapPin size={32} />
              </div>
              <div>
                <h3>Visit Us</h3>
                <p>25th St - Naif - Dubai - UAE</p>
              </div>
            </div>

            <a href="https://wa.me/971552929644" className={styles.infoCard} style={{ background: '#e8f5e9', borderColor: '#2e7d32' }}>
              <div className={styles.iconBox} style={{ background: '#2e7d32', color: '#fff' }}>
                <MessageCircle size={32} />
              </div>
              <div>
                <h3 style={{ color: '#1b5e20' }}>WhatsApp</h3>
                <p style={{ color: '#1b5e20' }}>Live Chat</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ULTRA COMPACT FORM SECTION */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.portraitSidebar}>
              <Image 
                src="/contactforminage.jpeg" 
                alt="Security Expert" 
                fill
                className={styles.portraitImg}
              />
            </div>

            <div className={styles.formBody}>
              <div className={styles.formHeader}>
                <h2 className={outfit.className}>Connect <br />With Us</h2>
                <p>Quick response within 2 hours guaranteed.</p>
              </div>

              <form className={styles.modernForm} onSubmit={handleFormSubmit}>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Full Name" 
                      className={styles.textInput} 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email Address" 
                      className={styles.textInput} 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label>Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+971 --- ----" 
                      className={styles.textInput} 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Service</label>
                    <select 
                      name="service"
                      className={styles.textInput}
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option>CCTV Systems</option>
                      <option>Installation</option>
                      <option>Wholesale</option>
                      <option>Support</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label>How can we help?</label>
                  <textarea 
                    name="message"
                    placeholder="Your requirements..." 
                    className={styles.textInput} 
                    style={{ minHeight: '80px' }} 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Sending..." : "Send Inquiry"} <ArrowRight size={20} />
                </button>

                {status && (
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '12px 20px', 
                    borderRadius: '12px', 
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: status.type === 'success' ? '#166534' : '#991b1b',
                    border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - UPDATED LOCATION */}
      <section style={{ paddingBottom: '4rem' }}>
        <div className={styles.container}>
          <div style={{ borderRadius: '50px', overflow: 'hidden', height: '500px', border: '1px solid #eee' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14431.54308520202!2d55.3094023!3d25.2732815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzIzLjgiTiA1NcKwMTgnMzMuOSJF!5e0!3m2!1sen!2sae!4v1714041000000!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1)' }} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

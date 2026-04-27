'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const stats = [
  { end: 10, suffix: 'K+', label: 'Installations' },
  { end: 15, suffix: '+', label: 'Years Experience' },
  { end: 24, suffix: '/7', label: 'Support' },
  { end: 100, suffix: '%', label: 'Genuine Products' },
];

const AnimatedCounter = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <span>{count}{suffix}</span>;
};

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    text: 'AI-Powered Detection',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    text: '4K Ultra HD Clarity',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    text: 'Remote Monitoring',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    text: 'Certified Technicians',
  },
];

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate stat numbers on mount
    const statEls = document.querySelectorAll<HTMLSpanElement>('[data-stat]');
    statEls.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero section">
      <video 
        src="/herovideo.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.heroBgVideo}
      />
      <div className={styles.heroBgOverlay} aria-hidden="true" />

      {/* ── Animated mesh / grid background ── */}
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.gradientOrb1} aria-hidden="true" />
      <div className={styles.gradientOrb2} aria-hidden="true" />

      {/* ── Scan-line overlay ── */}
      <div className={styles.scanLines} aria-hidden="true" />

      <div className={styles.container}>
        {/* ════ LEFT – Content ════ */}
        <div className={styles.content}>
          {/* Badge */}
          <div className={styles.badge} aria-label="Partnership badge">
            <span className={styles.badgeDot} aria-hidden="true" />
            Authorized Hikvision Partner · Dubai, UAE
          </div>

          {/* Headline */}
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>Advanced Security</span>
            <span className={styles.titleLine2}>Solutions for</span>
            <span className={styles.titleAccent}>Dubai & UAE</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Protect your business and home with industry-leading Hikvision
            surveillance systems. AI-powered cameras, expert installation, and
            24/7 support — all under one roof.
          </p>

          {/* Feature tags */}
          <ul className={styles.features} aria-label="Key features">
            {features.map(f => (
              <li key={f.text} className={styles.featureTag}>
                <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
                {f.text}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className={styles.ctaGroup}>
            <Link href="/products" className={styles.primaryBtn}>
              Explore Products
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href="tel:+971542471347" className={styles.secondaryBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              Get a Free Quote
            </a>
          </div>

          {/* Stats row */}
          <div className={styles.stats} role="list" aria-label="Key statistics">
            {stats.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
                <div className={styles.statItem} role="listitem">
                  <span className={styles.statNumber} data-stat>
                    <AnimatedCounter end={s.end} suffix={s.suffix} />
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom wave divider ── */}
      <div className={styles.waveDivider} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

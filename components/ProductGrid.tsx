"use client";

import React, { useEffect, useRef } from 'react';
import { Outfit } from 'next/font/google';
import Link from 'next/link';
import { 
  Server, 
  Database, 
  Camera, 
  RotateCw, 
  ShieldAlert, 
  Zap, 
  Key, 
  PhoneCall 
} from 'lucide-react';
import styles from './ProductGrid.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const products = [
  {
    title: 'Network Camera',
    subtitle: 'High-Resolution IP Security',
    description: 'Dependable security for businesses, homes, and public spaces, offering indoor/outdoor coverage and top-tier performance for total peace of mind.',
    icon: <Camera size={32} />,
    color: '#7C0A02',
    imageUrl: '/productgrid/img1.png',
    href: '/products/security/network-camera'
  },
  {
    title: 'PTZ Camera',
    subtitle: 'Pan-Tilt-Zoom Precision',
    description: 'Advanced devices providing a full 360-degree view. A fantastic choice for anyone wanting to monitor large areas or oversee business activities.',
    icon: <RotateCw size={32} />,
    color: '#3b82f6',
    imageUrl: '/productgrid/img2.png',
    href: '/products/security/ptz-camera'
  },
  {
    title: 'Explosion Proof',
    subtitle: 'Specialized Industrial Safety',
    description: 'Heavy-duty surveillance solutions designed for hazardous environments, offering unmatched durability and reliability in extreme conditions.',
    icon: <ShieldAlert size={32} />,
    color: '#f59e0b',
    imageUrl: '/productgrid/img3.png',
    href: '/products/security/explosion-proof'
  },
  {
    title: 'TurboHD',
    subtitle: 'High-Definition Analog',
    description: 'Crystal-clear HD recording for analog systems, providing a cost-effective path to high-resolution surveillance without complex rewiring.',
    icon: <Zap size={32} />,
    color: '#10b981',
    imageUrl: '/productgrid/img4.png',
    href: '/products/security/turbohd'
  },
  {
    title: 'Network Video Recorder',
    subtitle: 'Advanced IP Recording',
    description: 'Intelligent recording devices for IP cameras, delivering high-quality storage, smart analytics, and remote access for scalable solutions.',
    icon: <Server size={32} />,
    color: '#8b5cf6',
    imageUrl: '/productgrid/img5.png',
    href: '/products/security/network-video-recorder'
  },
  {
    title: 'DVR',
    subtitle: 'Digital Video Recorder',
    description: 'Reliable recording devices for analog cameras, offering remote viewing, motion detection, and efficient storage for your security footage.',
    icon: <Database size={32} />,
    color: '#ec4899',
    imageUrl: '/productgrid/img6.png',
    href: '/products/security/dvr'
  },
  {
    title: 'Access Control',
    subtitle: 'Smart Entry Management',
    description: 'Advanced biometric and card-based entry systems, ensuring only authorized personnel can access your most sensitive business areas.',
    icon: <Key size={32} />,
    color: '#6366f1',
    imageUrl: '/productgrid/img7.png',
    href: '/products/security/access-control'
  },
  {
    title: 'Video Intercom',
    subtitle: 'Secure Communication',
    description: 'See and speak with visitors before granting access, providing an extra layer of security and convenience for homes and corporate buildings.',
    icon: <PhoneCall size={32} />,
    color: '#14b8a6',
    imageUrl: '/productgrid/img8.png',
    href: '/products/security/video-intercom'
  }
];

const ProductGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Decorative background elements */}
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Security Portfolio</div>
          <h2 className={`${styles.title} ${outfit.className}`}>
            Our Core <span className={styles.accent}>Solutions</span>
          </h2>
          <p className={styles.subtitleText}>
            Comprehensive Hikvision hardware designed to protect what matters most with cutting-edge technology and reliable performance.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <div 
              key={index} 
              className={styles.card} 
              style={{ '--index': index, '--accent-color': product.color } as React.CSSProperties}
            >
              <div className={styles.cardInner}>
                <div className={styles.topRow}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>{product.icon}</span>
                  </div>
                  <div className={styles.roundImageWrapper}>
                    <img src={product.imageUrl} alt={product.title} className={styles.roundImage} />
                  </div>
                </div>
                <div className={styles.content}>
                  <span className={styles.productSubtitle}>{product.subtitle}</span>
                  <h3 className={`${styles.productTitle} ${outfit.className}`}>{product.title}</h3>
                  <p className={styles.descriptionText}>{product.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <Link href={product.href} className={styles.learnMore}>
                    Explore Category
                    <div className={styles.arrowCircle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

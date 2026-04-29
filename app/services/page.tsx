"use client";

import React, { useEffect, useRef } from 'react';
import { Outfit } from 'next/font/google';
import { 
  ShieldCheck, 
  Cctv, 
  Settings, 
  Smartphone, 
  Bell, 
  Home, 
  Wrench,
  ArrowRight,
  Monitor,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './services.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const services = [
  {
    slug: 'cctv-installation',
    title: 'CCTV Installation',
    subtitle: 'Precision & Reliability',
    description: 'Professional installation of high-quality CCTV systems to monitor and secure your property 24/7. Our SIRA-approved engineers ensure every angle is covered with industrial-grade equipment.',
    icon: <Cctv size={48} />,
    image: '/services/img1.png',
    color: '#7C0A02',
    features: ['SIRA Approved', '24/7 Monitoring', 'Night Vision Support']
  },
  {
    slug: 'surveillance-systems',
    title: 'Surveillance Systems',
    subtitle: 'Strategic Design',
    description: 'Custom-designed surveillance solutions tailored to meet the specific needs of your home or business. We don\'t just install cameras; we build intelligent security networks.',
    icon: <Monitor size={48} />,
    image: '/services/img2.png',
    color: '#3b82f6',
    features: ['Custom Layouts', 'AI Detection', 'Face Recognition']
  },
  {
    slug: 'remote-monitoring',
    title: 'Remote Monitoring',
    subtitle: 'Total Control',
    description: 'Access live footage and receive alerts from your security cameras anytime, anywhere with our remote monitoring services. Your security is literally in your pocket.',
    icon: <Smartphone size={48} />,
    image: '/services/img3.png',
    color: '#10b981',
    features: ['Mobile App', 'Instant Alerts', 'Cloud Backup']
  },
  {
    slug: 'security-alarms',
    title: 'Security Alarms',
    subtitle: 'Instant Response',
    description: 'Integrated alarm systems that work seamlessly with your security cameras for enhanced protection. Detect, Deter, and Defend with our smart alarm solutions.',
    icon: <Bell size={48} />,
    image: '/services/img4.png',
    color: '#f59e0b',
    features: ['Motion Sensing', 'Siren Systems', 'Police Link Available']
  },
  {
    slug: 'smart-home-integration',
    title: 'Smart Home Integration',
    subtitle: 'Automated Safety',
    description: 'Connect your security cameras with smart home devices for a fully automated and secure living environment. Experience the future of residential safety.',
    icon: <Home size={48} />,
    image: '/services/img5.png',
    color: '#8b5cf6',
    features: ['Voice Control', 'Smart Lighting', 'IoT Connectivity']
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    subtitle: 'Guaranteed Uptime',
    description: 'Regular maintenance and technical support to ensure your security systems are always functioning at their best. We stand by our installations forever.',
    icon: <Wrench size={48} />,
    image: '/services/img6.png',
    color: '#ec4899',
    features: ['Annual Maintenance', 'Technical Support', 'Spare Parts Ready']
  }
];

export default function ServicesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = scrollRef.current?.querySelectorAll(`.${styles.serviceRow}`);
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef}>
      {/* Modern Asymmetric Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <Activity size={16} />
                <span>SIRA Certified Experts</span>
              </div>
              <h1 className={`${styles.heroTitle} ${outfit.className}`}>
                Security <span className={styles.redText}>Services</span> Crafted for Excellence.
              </h1>
              <p className={styles.heroSubtitle}>
                At Hikvision Dubai, we blend advanced surveillance hardware with elite engineering 
                to provide security solutions that are as unique as your property.
              </p>
              <div className={styles.heroActions}>
                <button className={styles.primaryBtn}>Explore Solutions</button>
                <div className={styles.trustedBy}>
                  <span>Trusted by 500+ Projects</span>
                </div>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <Image 
                src="/services/hero.png" 
                alt="Security Services Hero" 
                fill
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Zig-Zag Service Layout */}
      <section className={styles.listSection}>
        <div className={styles.container}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.serviceRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
              <div className={styles.serviceImageCol}>
                <div className={styles.imageOverlay} style={{ '--color': service.color } as React.CSSProperties}>
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill
                    className={styles.serviceImg}
                  />
                </div>
              </div>
              <div className={styles.serviceContentCol}>
                <span className={styles.rowSubtitle}>{service.subtitle}</span>
                <h2 className={`${styles.rowTitle} ${outfit.className}`}>{service.title}</h2>
                <p className={styles.rowDescription}>{service.description}</p>
                <div className={styles.featureList}>
                  {service.features.map((f, i) => (
                    <span key={i} className={styles.featureItem}>{f}</span>
                  ))}
                </div>
                <Link href={`/services/${service.slug}`} className={styles.learnMoreLink}>
                  View Detailed Plan
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

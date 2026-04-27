import React from 'react';
import { Outfit } from 'next/font/google';
import styles from './Features.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const features = [
  {
    title: 'Expert Installation',
    description: 'Professional setup and configuration by certified technicians',
    icon: (
      <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    )
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical assistance and monitoring',
    icon: (
      <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
    )
  },
  {
    title: 'Warranty Coverage',
    description: 'Comprehensive warranty and maintenance plans',
    icon: (
      <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    )
  }
];

const Features = () => {
  return (
    <section className={styles.section} id="features" aria-label="Why Choose Us">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Side: Content */}
          <div className={styles.contentSide}>
            <div className={styles.overtitle}>Hikvision Technology</div>
            <h2 className={`${styles.title} ${outfit.className}`}>
              Securing Your <span className={styles.accent}>Future</span>
            </h2>
            <p className={styles.description}>
              Hikvision Dubai offers competitive pricing on top-quality security products. Discover advanced CCTV cameras, smart surveillance systems, and access control solutions designed for homes and businesses. 
            </p>
            <p className={styles.description}>
              Get reliable, high-performance security technology without compromising on quality or breaking the bank.
            </p>
            <button className={styles.ctaButton}>Get a Quote Today</button>
          </div>

          {/* Right Side: Cards */}
          <div className={styles.cardsSide}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {feature.icon}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={`${styles.cardTitle} ${outfit.className}`}>{feature.title}</h3>
                  <p className={styles.cardDesc}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

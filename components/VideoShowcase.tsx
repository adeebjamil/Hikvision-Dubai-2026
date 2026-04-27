import React from 'react';
import { Outfit } from 'next/font/google';
import styles from './VideoShowcase.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['800'] });

const VideoShowcase = () => {
  return (
    <section className={styles.section} aria-label="Video Showcase">
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.backgroundGlow2} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${outfit.className}`}>
            Hikvision Dubai - <span className={styles.accent}>CCTV & IP Camera</span> Distributor in Dubai & UAE
          </h2>
          <p className={styles.description}>
            Hikvision Dubai is your trusted source for advanced surveillance systems and security solutions across Dubai and the UAE. We offer a wide range of Hikvision products, including CCTV cameras, IP cameras, and ColorVu technology for clear, vibrant images even in low light. Ideal for homes, offices, and industrial sites, our WiFi-enabled cameras provide seamless remote monitoring and reliable performance. Features like DarkFighter, TandemVu, and AcuSense ensure smart, efficient security tailored to your needs. At Hikvision Dubai, we combine cutting-edge technology with competitive pricing, delivering high-quality surveillance solutions for residential and commercial properties. Upgrade your security today with Hikvision.
          </p>
        </div>

        <div className={styles.videoWrapper}>
          <div className={styles.videoGlass}>
            <iframe
              className={styles.iframe}
              src="https://www.youtube.com/embed/MGjX7jfqMZA?autoplay=0&rel=0&showinfo=0&modestbranding=1"
              title="Hikvision Technology Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;

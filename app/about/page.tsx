"use client";

import React from 'react';
import { Outfit } from 'next/font/google';
import { 
  ShieldCheck, 
  Target, 
  Users, 
  Award, 
  Zap, 
  Heart,
  Quote,
  ArrowRight,
  CheckCircle2,
  Package,
  HardDrive,
  Camera,
  Cpu,
  Handshake,
  TrendingUp,
  Star,
  Monitor,
  Globe,
  Siren,
  GanttChart,
  Lightbulb,
  Workflow,
  ShieldAlert,
  Medal
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './about.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800', '900'] });

export default function AboutPage() {
  return (
    <>
      {/* Pure Image Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src="/abouthero.png" 
            alt="Dubai Skyline" 
            fill
            priority
          />
        </div>
      </section>

      {/* Brand Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introContent}>
            <div className={styles.introBadge}>
              <Monitor size={20} />
              <span>Next-Gen Security</span>
            </div>
            <h1 className={`${styles.introTitle} ${outfit.className}`}>
              Dubai <span style={{ color: '#800000' }}>Hikvision</span>
            </h1>
            <p className={styles.mainDescription}>
              Looking for premium Hikvision CCTV cameras in Dubai? Hikvision Dubai offers high-quality 
              surveillance solutions, including DVRs, NVRs, IP cameras, and advanced security 
              systems for homes and businesses. Experience reliable performance with every Hikvision product.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoItem} ${styles.largeCard}`}>
              <div className={styles.statValue}>5,000+</div>
              <div className={styles.statDesc}>Global Clients Secured</div>
              <p style={{ marginTop: '2rem', opacity: 0.8, fontSize: '1.2rem', lineHeight: 1.6 }}>
                Our footprint spans across industries, from luxury residential towers 
                to mission-critical infrastructure in the heart of the UAE.
              </p>
            </div>
            <div className={styles.bentoItem}>
              <div className={styles.statValue}>10+</div>
              <div className={styles.statDesc}>Years Expertise</div>
            </div>
            <div className={styles.bentoItem}>
              <div className={styles.statValue}>100%</div>
              <div className={styles.statDesc}>SIRA Compliance</div>
            </div>
            <div className={styles.bentoItem} style={{ gridColumn: 'span 2', background: '#fafafa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Award size={60} color="#800000" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>Leading Wholesaler</div>
                  <div style={{ color: '#666' }}>The UAE's most trusted source for Hikvision hardware.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Dark Story with FLIP CARD */}
      <section className={styles.immersiveStory}>
        <div className={styles.container}>
          <div className={styles.storyLayout}>
            <div className={styles.textSection}>
              <h2 className={outfit.className}>Redefining <br />Surveillance</h2>
              <p>
                In a city that never stops moving, we provide the vision that never blinks. 
                Dubai Hikvision was born from a passion for safety and a commitment to 
                technological excellence.
              </p>
              <p>
                Today, we are more than a supplier. We are an innovation partner, 
                working at the intersection of AI, thermal imaging, and cloud-integrated 
                security to create environments where people feel truly safe.
              </p>
            </div>
            <div className={styles.imageShowcase}>
              <div className={styles.flipCard}>
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                    <Image 
                      src="/about1.png" 
                      alt="Security Installation" 
                      width={800} 
                      height={1000} 
                      className={styles.mainImage}
                    />
                  </div>
                  <div className={styles.flipCardBack}>
                    <div className={styles.missionContent}>
                      <Quote size={60} color="#800000" style={{ marginBottom: '2rem', opacity: 0.3 }} />
                      <h3 className={outfit.className}>Our Core Mission</h3>
                      <p>
                        "To build a safer Dubai through the power of intelligent vision and 
                        unwavering reliability."
                      </p>
                      <div className={styles.missionFooter}>
                        <CheckCircle2 size={24} color="#800000" />
                        <span>Committed to Excellence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className={styles.featureSection}>
        <div className={styles.container}>
          <h2 className={`${styles.featureTitle} ${outfit.className}`}>Why Choose Us</h2>
          <div className={styles.featureRows}>
            <div className={styles.featureRow}>
              <div className={styles.featureIcon}>
                <Camera size={40} />
              </div>
              <div className={styles.featureText}>
                <h3>High-Definition Precision</h3>
                <p>Our cameras capture every detail with 4K clarity, smart motion detection, and advanced night vision technology.</p>
              </div>
            </div>
            
            <div className={styles.featureRow}>
              <div className={styles.featureIcon}>
                <HardDrive size={40} />
              </div>
              <div className={styles.featureText}>
                <h3>Robust Storage Solutions</h3>
                <p>From high-capacity NVRs to redundant cloud storage, your data is always secure and accessible.</p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <div className={styles.featureIcon}>
                <Siren size={40} />
              </div>
              <div className={styles.featureText}>
                <h3>SIRA Approved Support</h3>
                <p>Full compliance with Dubai's security laws, backed by expert advice and professional installation services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLOSIVE OUR VALUES SECTION */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesHeader}>
            <h2 className={outfit.className}>Our Values</h2>
            <p>The foundations of our excellence.</p>
          </div>
          
          <div className={styles.valuesMosaic}>
            <div className={styles.valueCard}>
              <span className={styles.valueBigNumber}>01</span>
              <div className={styles.valueIconBox}>
                <Lightbulb size={32} />
              </div>
              <h3 className={outfit.className}>Innovation</h3>
              <p>Pushing the boundaries of intelligent security to protect your future.</p>
            </div>

            <div className={styles.valueCard}>
              <span className={styles.valueBigNumber}>02</span>
              <div className={styles.valueIconBox}>
                <Workflow size={32} />
              </div>
              <h3 className={outfit.className}>Collaboration</h3>
              <p>Working together to build tailored safety ecosystems that meet your specific needs.</p>
            </div>

            <div className={styles.valueCard}>
              <span className={styles.valueBigNumber}>03</span>
              <div className={styles.valueIconBox}>
                <ShieldAlert size={32} />
              </div>
              <h3 className={outfit.className}>Reliability</h3>
              <p>Dependable performance in Dubai's harshest environments, 24/7/365.</p>
            </div>

            <div className={styles.valueCard}>
              <span className={styles.valueBigNumber}>04</span>
              <div className={styles.valueIconBox}>
                <Medal size={32} />
              </div>
              <h3 className={outfit.className}>Excellence</h3>
              <p>Setting the gold standard in every installation and customer service interaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final High-Contrast CTA */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.maroonCta}>
            <h2 className={outfit.className}>
              Secure Your <br />
              Future Today
            </h2>
            <p style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '4rem', maxWidth: '600px' }}>
              Join the 5,000+ businesses and homeowners who trust Dubai Hikvision for their safety.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Get an Expert Quote <ArrowRight size={24} style={{ marginLeft: '1rem' }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

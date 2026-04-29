"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { Outfit } from 'next/font/google';
import { 
  ShieldCheck, 
  Cctv, 
  Smartphone, 
  Bell, 
  Home, 
  Wrench,
  ArrowRight,
  Monitor,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  Check
} from 'lucide-react';
import Image from 'next/image';
import styles from './slug.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const servicesData: Record<string, any> = {
  'cctv-installation': {
    title: 'CCTV Installation',
    subtitle: 'Professional Grade Security',
    image: '/services/img1.png',
    color: '#7C0A02',
    description: 'Our professional CCTV installation service provides end-to-end security solutions for residential, commercial, and industrial properties in Dubai. We specialize in Hikvision technology, ensuring high-definition monitoring and legal compliance.',
    benefits: [
      'SIRA Approved Installation Team',
      'High-Definition 4K Resolution Support',
      'Infrared Night Vision Technology',
      'Weather-proof Industrial Casing',
      'Remote View Configuration'
    ],
    process: [
      { step: '01', title: 'Site Survey', text: 'Our engineers conduct a thorough on-site analysis to identify blind spots and strategic camera placements.' },
      { step: '02', title: 'System Design', text: 'We create a customized layout selecting the best NVRs and cameras for your specific environment.' },
      { step: '03', title: 'Installation', text: 'Clean, professional cabling and mounting by our certified technicians with minimal disruption.' },
      { step: '04', title: 'Testing', text: 'Comprehensive calibration and configuration of the entire network for peak performance.' }
    ]
  },
  'surveillance-systems': {
    title: 'Surveillance Systems',
    subtitle: 'Strategic Design',
    image: '/services/img2.png',
    color: '#3b82f6',
    description: 'Bespoke surveillance ecosystems designed for large-scale operations. We integrate facial recognition, thermal imaging, and centralized management for total control.',
    benefits: [
      'Facial Recognition Capabilities',
      'People Counting Analytics',
      'Perimeter Protection & Virtual Fence',
      'Automatic Number Plate Recognition (ANPR)',
      'Multi-Site Centralized Management'
    ],
    process: [
      { step: '01', title: 'Requirement Analysis', text: 'Understanding your specific business logic and security goals.' },
      { step: '02', title: 'Network Architecture', text: 'Designing a robust IP backbone to handle high-bandwidth video data.' },
      { step: '03', title: 'Deployment', text: 'Strategic roll-out of intelligent nodes across your infrastructure.' },
      { step: '04', title: 'Training', text: 'Comprehensive staff training on utilizing advanced analytics tools.' }
    ]
  },
  'remote-monitoring': {
    title: 'Remote Monitoring',
    subtitle: 'Total Control',
    image: '/services/img3.png',
    color: '#10b981',
    description: 'Access live footage and receive alerts from your security cameras anytime, anywhere with our remote monitoring services. Your security is literally in your pocket.',
    benefits: [
      'Real-time Smartphone Notifications',
      'Cross-Platform Support (iOS, Android, PC)',
      'Secure End-to-End Encryption',
      'Cloud Storage Options Available',
      'Multiple User Access Management'
    ],
    process: [
      { step: '01', title: 'Cloud Setup', text: 'Configuring secure servers for global video access.' },
      { step: '02', title: 'App Configuration', text: 'Setting up customized alert triggers and schedules.' },
      { step: '03', title: 'Encryption', text: 'Implementing bank-grade security for your video streams.' },
      { step: '04', title: 'Optimization', text: 'Ensuring low-latency streaming even on slow networks.' }
    ]
  },
  'security-alarms': {
    title: 'Security Alarms',
    subtitle: 'Instant Response',
    image: '/services/img4.png',
    color: '#f59e0b',
    description: 'Integrated alarm systems that work seamlessly with your security cameras for enhanced protection. Detect, Deter, and Defend with our smart alarm solutions.',
    benefits: [
      'Wireless & Wired Sensor Options',
      'Integrated Siren & Strobe Alerts',
      '24/7 Professional Monitoring Link',
      'Battery Backup for Power Failures',
      'Pet-Immune Motion Detection'
    ],
    process: [
      { step: '01', title: 'Perimeter Check', text: 'Mapping out entry points and vulnerable areas.' },
      { step: '02', title: 'Sensor Placement', text: 'Installing magnetic contacts, PIRs, and vibration sensors.' },
      { step: '03', title: 'Panel Integration', text: 'Connecting all sensors to a centralized smart hub.' },
      { step: '04', title: 'Scenario Setup', text: 'Programming custom arming/disarming schedules.' }
    ]
  },
  'smart-home-integration': {
    title: 'Smart Home Integration',
    subtitle: 'Automated Safety',
    image: '/services/img5.png',
    color: '#8b5cf6',
    description: 'Connect your security cameras with smart home devices for a fully automated and secure living environment. Experience the future of residential safety.',
    benefits: [
      'Voice Assistant Control (Alexa/Google)',
      'Automated Lighting Triggers',
      'Smart Door Lock Integration',
      'Unified Control via One App',
      'Energy Management Sync'
    ],
    process: [
      { step: '01', title: 'Audit', text: 'Checking compatibility of your current smart home devices.' },
      { step: '02', title: 'Connectivity', text: 'Establishing a secure local network for all IoT nodes.' },
      { step: '03', title: 'Automation', text: 'Programming logic rules (If motion, Then light).' },
      { step: '04', title: 'Customization', text: 'Fine-tuning the dashboard for your daily routine.' }
    ]
  },
  'maintenance-support': {
    title: 'Maintenance & Support',
    subtitle: 'Guaranteed Uptime',
    image: '/services/img6.png',
    color: '#ec4899',
    description: 'Regular maintenance and technical support to ensure your security systems are always functioning at their best. We stand by our installations forever.',
    benefits: [
      'Quarterly On-Site Health Checks',
      'Firmware & Security Updates',
      'Priority Technical Support',
      'Replacement Hardware on Standby',
      'Detailed Performance Reports'
    ],
    process: [
      { step: '01', title: 'Regular Inspection', text: 'Cleaning lenses and checking cabling integrity.' },
      { step: '02', title: 'Storage Audit', text: 'Verifying hard drive health and recording status.' },
      { step: '03', title: 'Update Management', text: 'Applying critical security patches and updates.' },
      { step: '04', title: 'Incident Support', text: 'Providing rapid response to any technical failures.' }
    ]
  }
};

export default function ServiceSlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = servicesData[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Full Image Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.badge} style={{ '--accent': data.color } as React.CSSProperties}>
                {data.subtitle}
              </span>
              <h1 className={`${styles.title} ${outfit.className}`}>
                {data.title}
              </h1>
              <p className={styles.description}>
                {data.description}
              </p>
              <div className={styles.heroActions}>
                <button className={styles.primaryBtn}>Contact Our Experts</button>
              </div>
            </div>
            <div className={styles.imageCol}>
              <div className={styles.fullImageWrapper}>
                <Image 
                  src={data.image} 
                  alt={data.title} 
                  fill
                  className={styles.fullImage}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Process Grid */}
      <section className={styles.detailsSection}>
        <div className={styles.container}>
          <div className={styles.detailsGrid}>
            
            {/* Benefits */}
            <div className={styles.benefitsCol}>
              <h2 className={`${styles.sectionTitle} ${outfit.className}`}>Key Benefits</h2>
              <div className={styles.benefitsList}>
                {data.benefits.map((benefit: string, i: number) => (
                  <div key={i} className={styles.benefitItem}>
                    <div className={styles.checkWrapper}>
                      <Check size={18} />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className={styles.processCol}>
              <h2 className={`${styles.sectionTitle} ${outfit.className}`}>Our Process</h2>
              <div className={styles.processSteps}>
                {data.process.map((p: any, i: number) => (
                  <div key={i} className={styles.stepItem}>
                    <span className={styles.stepNum}>{p.step}</span>
                    <div className={styles.stepText}>
                      <h4 className={outfit.className}>{p.title}</h4>
                      <p>{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

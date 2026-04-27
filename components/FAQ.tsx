"use client";

import React, { useState } from 'react';
import { Outfit } from 'next/font/google';
import { ChevronDown, MessageSquare, Phone, Mail } from 'lucide-react';
import styles from './FAQ.module.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

const faqs = [
  {
    question: "Where can I purchase Hikvision products in Dubai?",
    answer: "You can purchase genuine Hikvision products directly from our authorized showroom in Dubai or through our online portal. We provide delivery and installation across all emirates including Abu Dhabi, Sharjah, and Ajman."
  },
  {
    question: "What types of Hikvision products do you distribute?",
    answer: "We distribute the full range of Hikvision security solutions including Network Cameras (IP), PTZ Cameras, TurboHD Analog systems, NVRs, DVRs, Access Control systems, Video Intercoms, and specialized industrial solutions."
  },
  {
    question: "Are your Hikvision products genuine and authentic?",
    answer: "Yes, 100%. We only deal in original Hikvision hardware. Every product comes with an official manufacturer warranty and can be verified using the serial number on the global Hikvision portal."
  },
  {
    question: "Do you offer installation services?",
    answer: "Absolutely. We have a team of certified SIRA-approved technicians who handle end-to-end installation, configuration, and cabling for both residential and commercial projects in Dubai."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer 24/7 technical support, on-site maintenance, and remote assistance for system configuration. All our products also come with a comprehensive local warranty for peace of mind."
  },
  {
    question: "How can I become a reseller or partner?",
    answer: "We welcome partnerships with local businesses. Please reach out to our sales team via the contact form or visit our Dubai office with your trade license to discuss wholesale opportunities."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.flexLayout}>
          
          {/* Left Side: Content & Contact */}
          <div className={styles.contentSide}>
            <div className={styles.label}>FAQ</div>
            <h2 className={`${styles.title} ${outfit.className}`}>
              Common <span className={styles.accent}>Questions</span>
            </h2>
            <p className={styles.description}>
              Find quick answers to the most frequent inquiries about our products, 
              services, and support in the UAE.
            </p>

            <div className={styles.contactCard}>
              <h4 className={styles.contactTitle}>Still have questions?</h4>
              <p className={styles.contactText}>We're here to help you 24/7.</p>
              
              <div className={styles.contactLinks}>
                <a href="tel:+971542471347" className={styles.contactLink}>
                  <Phone size={18} />
                  <span>+971 54 247 1347</span>
                </a>
                <a href="mailto:info@hikvisiondubai.ae" className={styles.contactLink}>
                  <Mail size={18} />
                  <span>info@hikvisiondubai.ae</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className={styles.accordionSide}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
              >
                <button 
                  className={styles.questionBtn}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <div className={styles.iconBox}>
                    <ChevronDown size={20} className={styles.chevron} />
                  </div>
                </button>
                <div 
                  className={styles.answerWrapper}
                  style={{ 
                    gridTemplateRows: openIndex === index ? '1fr' : '0fr'
                  }}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;

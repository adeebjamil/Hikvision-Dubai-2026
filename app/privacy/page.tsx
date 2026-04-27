import React from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

export default function PrivacyPolicy() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 className={outfit.className} style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '2rem' }}>Privacy Policy</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '1rem' }}>
          At Hikvision Dubai, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>1. Information We Collect</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          We collect information that you provide directly to us when you fill out a form, request a quote, or contact us. This may include your name, email address, phone number, and any details about your security requirements.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          We use the information we collect to provide you with the services you request, communicate with you about your inquiries, and improve our website and customer service.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>3. Data Security</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>4. Contact Us</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          If you have any questions about this Privacy Policy, please contact us at sales@lovosis.com.
        </p>
      </section>
    </div>
  );
}

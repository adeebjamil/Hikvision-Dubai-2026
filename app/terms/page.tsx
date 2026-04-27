import React from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

export default function TermsOfService() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 className={outfit.className} style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '2rem' }}>Terms of Service</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '1rem' }}>
          Welcome to Hikvision Dubai. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>1. Use of Website</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          The content on this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>2. Product Information</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          While we strive to provide accurate product information, we do not warrant that product descriptions or other content are error-free. We reserve the right to correct any errors and to change or update information at any time.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>3. Limitation of Liability</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          Hikvision Dubai shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or website.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>4. Governing Law</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          Your use of this website and any dispute arising out of such use is subject to the laws of Dubai, United Arab Emirates.
        </p>
      </section>
    </div>
  );
}

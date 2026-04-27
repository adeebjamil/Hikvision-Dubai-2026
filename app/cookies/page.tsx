import React from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'] });

export default function CookiePolicy() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 className={outfit.className} style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '2rem' }}>Cookie Policy</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '1rem' }}>
          This Cookie Policy explains how Hikvision Dubai uses cookies and similar technologies to recognize you when you visit our website.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>1. What are Cookies?</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>2. Why We Use Cookies</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          We use cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>3. Controlling Cookies</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className={outfit.className} style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>4. Updates to This Policy</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
          We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.
        </p>
      </section>
    </div>
  );
}

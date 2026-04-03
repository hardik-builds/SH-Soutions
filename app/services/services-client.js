'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Building responsive, scalable, and visually appealing websites tailored to your business needs.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" /></svg>,
    features: [
      'Responsive Design',
      'Custom Development',
      'E-commerce Solutions',
      'Content Management Systems',
      'Progressive Web Apps',
      'API Integration'
    ],
    pricing: 'Starting at ₹15,000',
    duration: '2-8 weeks'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protecting your digital assets with advanced security solutions and proactive threat management.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    features: [
      'Security Audits',
      'Penetration Testing',
      'Firewall Configuration',
      'Data Encryption',
      'Security Training',
      '24/7 Monitoring'
    ],
    pricing: 'Starting at ₹15,000/month',
    duration: 'Ongoing'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Boosting your online visibility with strategic SEO techniques that drive organic traffic.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    features: [
      'Keyword Research',
      'On-Page SEO',
      'Technical SEO',
      'Content Strategy',
      'Link Building',
      'Analytics & Reporting'
    ],
    pricing: 'Starting at ₹8,000/month',
    duration: '3-6 months'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Driving business growth with data-driven strategies and innovative digital campaigns.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
    features: [
      'Search-Engine optimization(SEO)',
      'Pay-Per Click Advertising(PPC)',
      'Social Media Marketing',
      'Content Marketing',
      'Analytics & Reporting'
    ],
    pricing: 'Starting at ₹40,000',
    duration: '2-6 months'
  },
  {
    id: 'app-development',
    title: 'App Development',
    description: 'Developing custom mobile applications that deliver exceptional user experiences across all platforms.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    features: [
      'iOS Development',
      'Android Development',
      'Cross-Platform Apps',
      'UI/UX Design',
      'App Store Optimization',
      'Maintenance & Support'
    ],
    pricing: 'Starting at ₹3,00,000',
    duration: '1-4 months'
  },
  // {
  //   id: 'cloud-solutions',
  //   title: 'Cloud Solutions',
  //   description: 'Implementing scalable cloud infrastructure to optimize performance and reduce operational costs.',
  //   icon: <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  //   features: [
  //     'Cloud Migration',
  //     'AWS/Azure/GCP Setup',
  //     'Cloud Security',
  //     'Backup Solutions',
  //     'Cost Optimization',
  //     '24/7 Support'
  //   ],
  //   pricing: 'Starting at $1,499/month',
  //   duration: '1-3 months'
  // }
];

export default function Services() {
  const { isDark } = useTheme();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transition: 'background-color 0.3s, color 0.3s' }}>
      {/* Hero Section */}
      <section style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom right, #1e3a8a, #0f172a)' 
          : 'linear-gradient(to bottom right, #3B82F6, #06B6D4)', 
        color: 'white', 
        padding: '96px 0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>Our Services</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Comprehensive digital solutions tailored to elevate your business and drive growth in the modern landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--secondary-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '32px' }}>
            {services.map((service) => (
              <div 
                key={service.id} 
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '32px', 
                  borderRadius: '16px', 
                  boxShadow: isDark 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  border: `1px solid var(--border-color)`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{ color: 'var(--primary-color)', marginRight: '16px' }}>
                    {service.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-color)' }}>{service.title}</h3>
                    <p style={{ color: isDark ? '#9CA3AF' : '#6B7280', lineHeight: '1.6' }}>{service.description}</p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-color)' }}>Key Features:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: isDark ? '#9CA3AF' : '#6B7280' }}>
                        <svg style={{ width: '16px', height: '16px', color: 'var(--success-color)', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: `1px solid var(--border-color)` }}>
                  <div>
                    <p style={{ fontSize: '14px', color: isDark ? '#9CA3AF' : '#6B7280', marginBottom: '4px' }}>Starting from</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{service.pricing}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', color: isDark ? '#9CA3AF' : '#6B7280', marginBottom: '4px' }}>Duration</p>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-color)' }}>{service.duration}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <Link 
                    href="/contact"
                    style={{ 
                      flex: 1, 
                      backgroundColor: 'var(--primary-color)', 
                      color: 'white', 
                      padding: '12px 24px', 
                      borderRadius: '8px', 
                      fontWeight: '600', 
                      textDecoration: 'none', 
                      transition: 'background-color 0.3s',
                      textAlign: 'center',
                      display: 'block'
                    }}
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '96px 0', 
        background: isDark 
          ? 'linear-gradient(to right, #1e3a8a, #0f172a)' 
          : 'linear-gradient(to right, #3B82F6, #06B6D4)', 
        color: 'white' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Need a Custom Solution?</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px', opacity: 0.9 }}>
            We can tailor our services to meet your specific requirements. Let's discuss your unique needs.
          </p>
          <Link 
            href="/contact" 
            style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary-color)', 
              padding: '12px 32px', 
              borderRadius: '6px', 
              fontWeight: '600', 
              textDecoration: 'none', 
              fontSize: '18px', 
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (min-width: 768px) {
          section:nth-of-type(2) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          section:nth-of-type(2) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (hover: hover) {
          div:hover {
            transform: translateY(-4px);
            box-shadow: ${isDark 
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' 
              : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'};
          }
          a:hover {
            background-color: var(--primary-hover);
          }
        }
      `}</style>
    </div>
  );
} 
'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
export default function Home() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
      minHeight: '100vh',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      {/* Hero Section */}
      <section style={{
        background: isDark
          ? 'linear-gradient(to bottom right, #1e3a8a, #0f172a)'
          : 'linear-gradient(to bottom right, #3B82F6, #06B6D4)',
        color: 'white',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: 1.2,
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            Innovative Digital Solutions
          </h1>
          <p style={{
            fontSize: '24px',
            maxWidth: '800px',
            margin: '0 auto 40px',
            opacity: 0.95,
            lineHeight: 1.5,
            animation: 'fadeInUp 0.8s ease-out 0.2s both'
          }}>
            Delivering cutting-edge web development services with expertise in modern technologies and a commitment to excellence.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
          }}>
            <Link href="/services" style={{
              backgroundColor: 'white',
              color: '#3B82F6',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              Our Services
            </Link>
            <Link href="/contact" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              border: '2px solid white',
              transition: 'all 0.3s'
            }}>
              Start a Project
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 1
        }}></div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '80px 16px', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--text-color)'
            }}>
              Our Services
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
            gridAutoRows: '1fr'   // ⭐ FIX
          }}>
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Web Development',
                description: 'Custom websites and web applications built with modern technologies and best practices.',
                features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly', 'Cross-browser Compatible']
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Cybersecurity',
                description: 'Protect your business with comprehensive security solutions and threat monitoring.',
                features: ['Security Audits', 'Vulnerability Assessment', 'Data Protection', 'Security Consulting']
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: 'SEO Optimization',
                description: 'Improve your search engine rankings and drive organic traffic to your website.',
                features: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Content Strategy']
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'App Development',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
                features: ['Native Apps', 'Cross-platform', 'UI/UX Design', 'App Store Optimization']
              }
            ].map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '12px',
                  padding: '32px',
                  border: `1px solid var(--border-color)`,
                  transition: 'all 0.3s ease',
                  boxShadow: isDark
                    ? '0 4px 6px rgba(0, 0, 0, 0.3)'
                    : '0 4px 6px rgba(0, 0, 0, 0.1)',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',   // ⭐ CHANGE
                  minHeight: '420px'                 // ⭐ IMPORTANTHEIGHT
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.zIndex = '10';   // ⭐ FIX overlap
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 10px 20px rgba(0, 0, 0, 0.4)'
                    : '0 10px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 4px 6px rgba(0, 0, 0, 0.3)'
                    : '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#EBF5FF',
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{ color: 'var(--primary-color)' }}>
                    {service.icon}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: 'var(--text-color)'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px'
                }}>
                  {service.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 20px 0',
                  flexGrow: 1
                }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: 'var(--primary-color)', marginRight: '8px' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{
                    color: 'var(--primary-color)',
                    marginTop: 'auto',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px', marginLeft: '8px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{
        padding: '80px 16px',
        backgroundColor: isDark ? '#0f172a' : '#F8FAFC',
        borderTop: `1px solid var(--border-color)`,
        borderBottom: `1px solid var(--border-color)`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--text-color)'
            }}>
              Why Choose Us
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              We combine technical expertise with academic excellence to deliver outstanding results.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                number: '14+',
                title: 'Technologies',
                description: 'Expertise in modern development stack and tools.'
              },
              {
                number: '8+',
                title: 'CGPA Score',
                description: 'Strong academic foundation in computer science.'
              },
              {
                number: '6+',
                title: 'Projects Delivered',
                description: 'Practical experience in real-world applications.'
              },
              {
                number: '24/7',
                title: 'Support',
                description: 'Dedicated support to ensure your success.'
              }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  backgroundColor: 'var(--card-bg)',
                  padding: '32px 24px',
                  borderRadius: '12px',
                  border: `1px solid var(--border-color)`,
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.zIndex = '10';   // ⭐ FIX overlap
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.zIndex = '1';
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'var(--primary-color)',
                  marginBottom: '16px'
                }}>
                  {stat.number}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--text-color)'
                }}>
                  {stat.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--text-secondary)'
                }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: isDark
          ? 'linear-gradient(to right, #1e3a8a, #3b82f6)'
          : 'linear-gradient(to right, #3B82F6, #06B6D4)',
        color: 'white',
        padding: '80px 16px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Ready to Start Your Project?
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            opacity: 0.95
          }}>
            Let's discuss how we can help bring your ideas to life with our expertise.
          </p>
          <Link
            href="/contact"
            style={{
              backgroundColor: 'white',
              color: '#3B82F6',
              padding: '16px 40px',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Contact Us Today
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }
          h2 {
            font-size: 32px !important;
          }
          section {
            padding: 60px 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
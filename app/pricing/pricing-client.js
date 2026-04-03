// app/pricing/page.js
'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const plans = [
  {
    name: 'Basic Business',
    price: '₹15,000',
    period: '/one-time',
    description: 'Perfect for small businesses and startups looking to establish their digital presence.',
    features: [
      'Responsive Website Design',
      '5-10 Pages Website',
      'Basic SEO Setup',
      'Contact Form',
      'Mobile Optimization',
      'Domain Registration (1 Year)',
      'Shared Hosting (1 Year)',
      '1 Month Support',
      'Basic Analytics Setup'
    ],
    notIncluded: [
      'Custom Development',
      'E-commerce Integration',
      'Advanced SEO',
      'Content Management System',
      'Custom UI/UX Design'
    ],
    popular: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Standard Business',
    price: '₹40,000',
    period: '/one-time',
    description: 'Ideal for growing businesses that need comprehensive digital solutions.',
    features: [
      'Custom Website Design',
      'Advanced SEO Optimization',
      'Unlimited Pages',
      'Content Management System',
      'Custom UI/UX Design',
      'E-commerce Integration',
      '3 Months Support',
      'Advanced Analytics',
      'Performance Optimization',
      'Security Setup',
      'Email Integration',
      'Domain Registration (1 Year)',
      'Managed Hosting (1 Year)'
    ],
    notIncluded: [
      'Dedicated Server',
      'Custom API Development',
      '24/7 Phone Support',
      'Ongoing SEO Services'
    ],
    popular: true,
    buttonText: 'Most Popular'
  },
  {
    name: 'Enterprise',
    price: '₹1,00,000',
    period: '/one-time',
    description: 'Tailored solutions for large organizations with complex requirements.',
    features: [
      'Custom Web Application',
      'Enterprise SEO Strategy',
      'Unlimited Everything',
      'Custom CMS Development',
      'Advanced E-commerce',
      'Priority Support 24/7',
      'Custom Analytics Dashboard',
      'Cloud Infrastructure',
      'Advanced Security Suite',
      'API Integration',
      'Dedicated Account Manager',
      'Custom Training Sessions',
      'Domain Registration (1 Year)',
      'Premium Cloud Hosting (1 Year)'
    ],
    notIncluded: [],
    popular: false,
    buttonText: 'Contact Sales'
  }
];

const addOns = [
  {
    name: 'Ongoing SEO Services',
    price: '₹8,000 – ₹75,000/month',
    description: 'Monthly SEO optimization to maintain and improve your search rankings',
    features: ['Keyword Research', 'Content Optimization', 'Monthly Reports', 'Link Building']
  },
  {
    name: 'Maintenance & Support',
    price: '₹5,000 – ₹30,000/month',
    description: 'Keep your website running smoothly with our maintenance packages',
    features: ['Regular Updates', 'Security Monitoring', 'Backup Services', 'Technical Support']
  },
  {
    name: 'Custom UI/UX Design',
    price: '₹40,000 – ₹1,00,000+',
    description: 'Professional UI/UX design tailored to your brand',
    features: ['Wireframing', 'Prototyping', 'User Testing', 'Design System']
  },
  {
    name: 'Cybersecurity Package',
    price: '₹15,000 – ₹30,000/month',
    description: 'Advanced security monitoring and protection',
    features: ['Security Audit', 'Firewall Setup', '24/7 Monitoring', 'Regular Updates']
  },
  {
    name: 'Content Marketing',
    price: '₹20,000 – ₹50,000/month',
    description: 'Complete content creation and marketing strategy',
    features: ['Blog Writing', 'Social Media Management', 'Email Campaigns', 'Content Strategy']
  },
  {
    name: 'Mobile App Development',
    price: 'Starting at ₹3,00,000',
    description: 'Native iOS and Android app development',
    features: ['iOS App', 'Android App', 'App Store Submission', '1 Year Maintenance']
  }
];

export default function Pricing() {
  const { isDark } = useTheme();
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const toggleAddOn = (addOn) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(item => item !== addOn)
        : [...prev, addOn]
    );
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-color)', 
      color: 'var(--text-color)', 
      minHeight: '100%', 
      transition: 'background-color 0.3s, color 0.3s' 
    }}>
      {/* Hero Section */}
      <section style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom right, #1e3a8a, #0f172a)' 
          : 'linear-gradient(to bottom right, #3B82F6, #06B6D4)', 
        color: 'white', 
        padding: '96px 0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>Pricing Plans</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Transparent pricing with no hidden fees. Choose the perfect plan for your business needs.
          </p>
        </div>
      </section>
{/* Pricing Plans */}
<section style={{ padding: '80px 16px', backgroundColor: 'var(--bg-color)' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '32px',
      alignItems: 'stretch'
    }}>
      
      {plans.map((plan, index) => (
        <div 
          key={index} 
          style={{ 
            backgroundColor: 'var(--card-bg)', 
            padding: '48px 32px', 
            borderRadius: '16px', 
            boxShadow: isDark 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            border: plan.popular 
              ? '2px solid var(--primary-color)' 
              : `2px solid var(--border-color)`,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >

          {/* MOST POPULAR FIX */}
          {plan.popular && (
            <div style={{ 
              position: 'absolute', 
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              padding: '6px 18px', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '600',
              zIndex: 2
            }}>
              MOST POPULAR
            </div>
          )}

          {/* TOP CONTENT */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '48px', fontWeight: '800', color: 'var(--primary-color)' }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: '18px', color: '#6B7280' }}>
                  {plan.period}
                </span>
              </div>

              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                {plan.description}
              </p>
            </div>

            {/* FEATURES */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ marginRight: '10px', color: 'green' }}>✔</span>
                  {feature}
                </li>
              ))}

              {plan.notIncluded.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#9CA3AF' }}>
                  <span style={{ marginRight: '10px', color: 'red' }}>✖</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* BUTTON FIX */}
          <Link 
            href={plan.name === 'Enterprise' ? '/contact' : '/register'}
            style={{ 
              display: 'block', 
              width: '100%', 
              boxSizing: 'border-box',
              padding: '16px', 
              borderRadius: '8px', 
              fontWeight: '600', 
              textAlign: 'center', 
              textDecoration: 'none',
              backgroundColor: plan.popular ? 'var(--primary-color)' : 'transparent',
              color: plan.popular ? 'white' : 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              transition: 'all 0.3s'
            }}
          >
            {plan.buttonText}
          </Link>

        </div>
      ))}

    </div>
  </div>
</section>
      {/* Pricing Plans
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '32px', alignItems: 'start' }}>
            {plans.map((plan, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '48px 32px', 
                  borderRadius: '16px', 
                  boxShadow: isDark 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: plan.popular 
                    ? '2px solid var(--primary-color)' 
                    : `2px solid var(--border-color)`,
                  position: 'relative',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
              >
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '-12px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    padding: '4px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    MOST POPULAR
                  </div>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-color)' }}>{plan.name}</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '48px', fontWeight: '800', color: 'var(--primary-color)' }}>{plan.price}</span>
                    <span style={{ fontSize: '18px', color: isDark ? '#9CA3AF' : '#6B7280' }}>{plan.period}</span>
                  </div>
                  <p style={{ color: isDark ? '#9CA3AF' : '#6B7280', lineHeight: '1.6' }}>{plan.description}</p>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: 'var(--text-color)' }}>
                      <svg style={{ width: '20px', height: '20px', color: 'var(--success-color)', marginRight: '12px', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: isDark ? '#6B7280' : '#9CA3AF' }}>
                      <svg style={{ width: '20px', height: '20px', color: 'var(--error-color)', marginRight: '12px', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.name === 'Enterprise' ? '/contact' : '/register'}
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    fontWeight: '600', 
                    textAlign: 'center', 
                    textDecoration: 'none',
                    backgroundColor: plan.popular ? 'var(--primary-color)' : 'var(--card-bg)',
                    color: plan.popular ? 'white' : 'var(--primary-color)',
                    border: plan.popular ? 'none' : '2px solid var(--primary-color)',
                    transition: 'all 0.3s'
                  }}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Add-ons Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--secondary-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-color)' }}>Enhance Your Plan</h2>
            <p style={{ fontSize: '18px', color: isDark ? '#9CA3AF' : '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
              Add powerful features to your plan with our flexible add-ons
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '32px' }}>
            {addOns.map((addOn, index) => (
              <div 
                key={index}
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  boxShadow: isDark 
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: selectedAddOns.includes(addOn) 
                    ? '2px solid var(--primary-color)' 
                    : `2px solid var(--border-color)`,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => toggleAddOn(addOn)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--text-color)' }}>{addOn.name}</h3>
                    <p style={{ color: 'var(--primary-color)', fontSize: '18px', fontWeight: '600' }}>{addOn.price}</p>
                  </div>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    border: `2px solid ${isDark ? '#4B5563' : '#D1D5DB'}`,
                    backgroundColor: selectedAddOns.includes(addOn) ? 'var(--primary-color)' : 'var(--card-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {selectedAddOns.includes(addOn) && (
                      <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <p style={{ color: isDark ? '#9CA3AF' : '#6B7280', marginBottom: '16px', lineHeight: '1.6' }}>{addOn.description}</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {addOn.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: isDark ? '#9CA3AF' : '#6B7280' }}>
                      <svg style={{ width: '16px', height: '16px', color: 'var(--success-color)', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {selectedAddOns.length > 0 && (
            <div style={{ marginTop: '48px', textAlign: 'center' }}>
              <p style={{ marginBottom: '16px', color: isDark ? '#9CA3AF' : '#6B7280' }}>
                Selected {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''}
              </p>
              <Link 
                href="/contact"
                style={{ 
                  display: 'inline-block', 
                  padding: '16px 32px', 
                  borderRadius: '8px', 
                  fontWeight: '600', 
                  textDecoration: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  transition: 'all 0.3s'
                }}
              >
                Get Quote with Add-ons
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-color)' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: '18px', color: isDark ? '#9CA3AF' : '#6B7280' }}>
              Got questions? We've got answers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                question: 'Can I change my plan later?',
                answer: 'Yes! You can upgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day money-back guarantee for all our plans. If you\'re not satisfied, we\'ll refund your payment.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, debit cards, UPI, bank transfers, and net banking.'
              },
              {
                question: 'Is there a long-term contract?',
                answer: 'No, all our plans are one-time payments for the initial development. However, we offer monthly retainers for ongoing services like SEO and maintenance.'
              },
              {
                question: 'Do you provide training?',
                answer: 'Yes, we provide comprehensive training for all enterprise plans and can arrange custom training sessions for other plans.'
              },
              {
                question: 'What about hosting after the first year?',
                answer: 'After the first year, hosting renewal will be charged based on your chosen plan: Shared hosting (₹2,000 – ₹10,000/year) or Managed/cloud hosting (₹8,000 – ₹30,000+/year).'
              },
              {
                question: 'Can I purchase add-ons separately?',
                answer: 'Yes, all our add-ons can be purchased separately even if you don\'t opt for a full website development plan.'
              }
            ].map((faq, index) => (
              <div key={index} style={{ 
                backgroundColor: 'var(--card-bg)', 
                padding: '24px', 
                borderRadius: '8px', 
                border: `1px solid var(--border-color)` 
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-color)' }}>{faq.question}</h3>
                <p style={{ color: isDark ? '#9CA3AF' : '#6B7280', lineHeight: '1.6' }}>{faq.answer}</p>
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
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px', opacity: 0.9 }}>
            Join hundreds of businesses that trust us for their digital needs.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary-color)', 
              padding: '12px 32px', 
              borderRadius: '6px', 
              fontWeight: '600', 
              textDecoration: 'none' 
            }}>
              Get Started
            </Link>
            <Link href="/contact" style={{ 
              backgroundColor: 'transparent', 
              color: 'white', 
              padding: '12px 32px', 
              borderRadius: '6px', 
              fontWeight: '600', 
              textDecoration: 'none', 
              border: '2px solid white' 
            }}>
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (min-width: 768px) {
          section:nth-of-type(3) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
          section:nth-of-type(3) > div > div:nth-of-type(2) {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          section:nth-of-type(2) > div > div {
            grid-template-columns: repeat(3, 1fr);
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
            transform: scale(1.05);
          }
          button:hover {
            background-color: var(--primary-hover);
          }
        }
      `}</style>
    </div>
  );
}
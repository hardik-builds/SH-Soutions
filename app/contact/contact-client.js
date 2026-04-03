'use client';
import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: ''
          });
        }, 3000);
      } else {
        alert(`Failed to send message: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>Contact Us</h1>
          <p style={{ fontSize: '24px', maxWidth: '900px', margin: '0 auto', opacity: 0.9 }}>
            Get in touch with our team to discuss how we can help transform your digital presence.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '48px' }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--primary-color)' }}>Send Us a Message</h2>
              {isSubmitted ? (
                <div style={{ 
                  backgroundColor: isDark ? '#064e3b' : '#D1FAE5', 
                  border: `1px solid ${isDark ? '#059669' : '#10B981'}`, 
                  color: isDark ? '#6ee7b7' : '#065F46', 
                  padding: '12px 16px', 
                  borderRadius: '6px', 
                  marginBottom: '24px' 
                }}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : null}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', color: 'var(--text-color)', fontWeight: '500', marginBottom: '8px' }}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: `1px solid var(--border-color)`, 
                        borderRadius: '6px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-color)',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', color: 'var(--text-color)', fontWeight: '500', marginBottom: '8px' }}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: `1px solid var(--border-color)`, 
                        borderRadius: '6px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-color)',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
                  <div>
                    <label htmlFor="phone" style={{ display: 'block', color: 'var(--text-color)', fontWeight: '500', marginBottom: '8px' }}>Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: `1px solid var(--border-color)`, 
                        borderRadius: '6px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-color)',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" style={{ display: 'block', color: 'var(--text-color)', fontWeight: '500', marginBottom: '8px' }}>Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: `1px solid var(--border-color)`, 
                        borderRadius: '6px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-color)',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" style={{ display: 'block', color: 'var(--text-color)', fontWeight: '500', marginBottom: '8px' }}>Service Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: `1px solid var(--border-color)`, 
                      borderRadius: '6px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-color)',
                      transition: 'all 0.3s'
                    }}
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="game-development">Game Development</option>
                    <option value="app-development">App Development</option>
                    <option value="cloud-solutions">Cloud Solutions</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', color: 'var(--text-color)', fontWeight: '500', marginBottom: '8px' }}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: `1px solid var(--border-color)`, 
                      borderRadius: '6px', 
                      resize: 'vertical',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-color)',
                      transition: 'all 0.3s'
                    }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    padding: '12px 24px', 
                    borderRadius: '6px', 
                    fontWeight: '600', 
                    border: 'none', 
                    cursor: 'pointer', 
                    transition: 'all 0.3s',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--primary-color)' }}>Get In Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE', 
                    padding: '12px', 
                    borderRadius: '50%', 
                    marginRight: '16px' 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px', color: 'var(--text-color)' }}>Office Location</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>123 Tech Street, Silicon Valley, CA 94025</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE', 
                    padding: '12px', 
                    borderRadius: '50%', 
                    marginRight: '16px' 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px', color: 'var(--text-color)' }}>Phone</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE', 
                    padding: '12px', 
                    borderRadius: '50%', 
                    marginRight: '16px' 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px', color: 'var(--text-color)' }}>Email</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>info@shsolutions.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#DBEAFE', 
                    padding: '12px', 
                    borderRadius: '50%', 
                    marginRight: '16px' 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px', color: 'var(--text-color)' }}>Business Hours</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Saturday: 10:00 AM - 4:00 PM</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: 'var(--text-color)' }}>Find Us on Map</h3>
                <div style={{ 
                  backgroundColor: isDark ? '#1e293b' : '#E5E7EB', 
                  height: '256px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: `1px solid var(--border-color)`
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Interactive Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @media (min-width: 768px) {
          section:nth-of-type(2) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
          form > div:nth-of-type(1),
          form > div:nth-of-type(2) {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (hover: hover) {
          button:hover {
            background-color: var(--hover-bg);
          }
          input:focus,
          select:focus,
          textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        }
      `}</style>
    </div>
  );
}
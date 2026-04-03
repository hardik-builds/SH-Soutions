'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    // Basic email validation
    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#F9FAFB', 
      padding: '16px' 
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '48px', 
          borderRadius: '12px', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: '#EBF5FF', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg style={{ width: '32px', height: '32px', color: '#3B82F6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '8px' 
            }}>
              Forgot your password?
            </h1>
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5' }}>
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#FEE2E2', 
              border: '1px solid #FCA5A5', 
              color: '#B91C1C', 
              padding: '12px 16px', 
              borderRadius: '6px', 
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {success ? (
            <div style={{ 
              backgroundColor: '#D1FAE5', 
              border: '1px solid #10B981', 
              color: '#065F46', 
              padding: '16px', 
              borderRadius: '6px', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <svg style={{ width: '48px', height: '48px', color: '#10B981', margin: '0 auto 12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Check your email
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                We've sent a password reset link to your email address.
              </p>
              <p style={{ fontSize: '14px', color: '#047857', marginTop: '8px' }}>
                Please check your inbox and follow the instructions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="email" style={{ 
                  display: 'block', 
                  color: '#374151', 
                  fontWeight: '500', 
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '6px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{ 
                  width: '100%', 
                  backgroundColor: isLoading ? '#9CA3AF' : '#3B82F6', 
                  color: 'white', 
                  padding: '12px 16px', 
                  borderRadius: '6px', 
                  fontWeight: '600', 
                  border: 'none', 
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isLoading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.416" strokeDashoffset="31.416" strokeLinecap="round"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Reset password'
                )}
              </button>
            </form>
          )}

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              Remember your password?{' '}
              <Link 
                href="/login" 
                style={{ 
                  color: '#3B82F6', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'text-decoration 0.3s'
                }}
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#6B7280', fontSize: '14px' }}>
          Having trouble?{' '}
          <a 
            href="mailto:support@example.com" 
            style={{ 
              color: '#3B82F6', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Contact support
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (hover: hover) {
          button:hover:not(:disabled) {
            background-color: #2563EB;
          }
          
          input:focus {
            outline: none;
            border-color: #3B82F6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          a:hover {
            text-decoration: underline;
          }
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    } else {
      // Here you would validate the token with your API
      // For demo purposes, we'll assume it's valid
      setTokenValid(true);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenValid === false) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#F9FAFB' 
      }}>
        <div style={{ 
          maxWidth: '450px', 
          width: '100%', 
          padding: '48px', 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          textAlign: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#B91C1C', marginBottom: '16px' }}>Invalid Reset Link</h1>
          <p style={{ color: '#6B7280', marginBottom: '24px' }}>
            This password reset link is invalid or has expired.
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  if (tokenValid === null) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#F9FAFB' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

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
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '8px' 
            }}>
              Set new password
            </h1>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              Your new password must be different from previous used passwords.
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
              textAlign: 'center'
            }}>
              <svg style={{ width: '48px', height: '48px', color: '#10B981', margin: '0 auto 12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Password reset successful
              </h3>
              <p style={{ fontSize: '14px' }}>
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="password" style={{ 
                  display: 'block', 
                  color: '#374151', 
                  fontWeight: '500', 
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  New password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '6px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" style={{ 
                  display: 'block', 
                  color: '#374151', 
                  fontWeight: '500', 
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid #D1D5DB', 
                    borderRadius: '6px',
                    fontSize: '16px',
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
                  fontSize: '16px'
                }}
              >
                {isLoading ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          )}

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link 
              href="/login" 
              style={{ 
                color: '#3B82F6', 
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const router = useRouter();

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setPasswordValidation(validation);
    
    // Check if all validations pass
    const isValid = Object.values(validation).every(v => v);
    
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    
    if (!validation.length) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    if (!isValid) {
      setPasswordError('Password does not meet all requirements');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    
    setConfirmPasswordError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'password') {
      validatePassword(value);
      // Also revalidate confirm password if it has a value
      if (formData.confirmPassword) {
        validateConfirmPassword(value, formData.confirmPassword);
      }
    }
    
    if (name === 'confirmPassword') {
      validateConfirmPassword(formData.password, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      return;
    }

    // Validate confirm password
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user info and token in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        setSuccess('Registration successful! Redirecting...');
        
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', error);
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
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '8px' 
            }}>
              Create your account
            </h1>
            <p style={{ color: '#6B7280' }}>
              Already have an account? 
              <Link 
                href="/login" 
                style={{ 
                  color: '#3B82F6', 
                  textDecoration: 'none', 
                  marginLeft: '4px',
                  transition: 'text-decoration 0.3s'
                }}
              >
                Sign in
              </Link>
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

          {success && (
            <div style={{ 
              backgroundColor: '#D1FAE5', 
              border: '1px solid #10B981', 
              color: '#065F46', 
              padding: '12px 16px', 
              borderRadius: '6px', 
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="name" style={{ 
                display: 'block', 
                color: '#374151', 
                fontWeight: '500', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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

            <div>
              <label htmlFor="password" style={{ 
                display: 'block', 
                color: '#374151', 
                fontWeight: '500', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px 48px 12px 16px', 
                    border: passwordError ? '1px solid #EF4444' : '1px solid #D1D5DB', 
                    borderRadius: '6px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280',
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
                  {passwordError}
                </p>
              )}
              {/* Password requirements */}
              <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: '500' }}>
                  Password must contain:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ 
                      color: passwordValidation.length ? '#10B981' : '#9CA3AF', 
                      marginRight: '8px',
                      fontSize: '16px'
                    }}>
                      {passwordValidation.length ? '✓' : '○'}
                    </span>
                    <span style={{ color: passwordValidation.length ? '#047857' : '#6B7280' }}>
                      At least 8 characters
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ 
                      color: passwordValidation.uppercase ? '#10B981' : '#9CA3AF', 
                      marginRight: '8px',
                      fontSize: '16px'
                    }}>
                      {passwordValidation.uppercase ? '✓' : '○'}
                    </span>
                    <span style={{ color: passwordValidation.uppercase ? '#047857' : '#6B7280' }}>
                      One uppercase letter
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ 
                      color: passwordValidation.lowercase ? '#10B981' : '#9CA3AF', 
                      marginRight: '8px',
                      fontSize: '16px'
                    }}>
                      {passwordValidation.lowercase ? '✓' : '○'}
                    </span>
                    <span style={{ color: passwordValidation.lowercase ? '#047857' : '#6B7280' }}>
                      One lowercase letter
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ 
                      color: passwordValidation.number ? '#10B981' : '#9CA3AF', 
                      marginRight: '8px',
                      fontSize: '16px'
                    }}>
                      {passwordValidation.number ? '✓' : '○'}
                    </span>
                    <span style={{ color: passwordValidation.number ? '#047857' : '#6B7280' }}>
                      One number
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ 
                      color: passwordValidation.special ? '#10B981' : '#9CA3AF', 
                      marginRight: '8px',
                      fontSize: '16px'
                    }}>
                      {passwordValidation.special ? '✓' : '○'}
                    </span>
                    <span style={{ color: passwordValidation.special ? '#047857' : '#6B7280' }}>
                      One special character
                    </span>
                  </div>
                </div>
              </div>
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
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px 48px 12px 16px', 
                    border: confirmPasswordError ? '1px solid #EF4444' : '1px solid #D1D5DB', 
                    borderRadius: '6px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280',
                    padding: '4px'
                  }}
                >
                  {showConfirmPassword ? (
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                style={{ 
                  height: '16px', 
                  width: '16px', 
                  color: '#3B82F6', 
                  border: '1px solid #D1D5DB', 
                  borderRadius: '4px', 
                  marginRight: '8px',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="agree-terms" style={{ 
                color: '#6B7280', 
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                I agree to the{' '}
                <a 
                  href="#" 
                  style={{ 
                    color: '#3B82F6', 
                    textDecoration: 'none',
                    transition: 'text-decoration 0.3s'
                  }}
                >
                  Terms and Conditions
                </a>
              </label>
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
                transition: 'background-color 0.3s'
              }}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
              {/* <div style={{ margin: '0 16px', color: '#6B7280', fontSize: '14px' }}>Or continue with</div> */}
              <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
            </div>

            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
              {/* <button 
                type="button"
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  padding: '12px 16px', 
                  border: '1px solid #D1D5DB', 
                  borderRadius: '6px', 
                  backgroundColor: 'white', 
                  fontWeight: '500', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s'
                }}
              >
                <svg style={{ width: '20px', height: '20px', marginRight: '12px' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button> */}
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#6B7280', fontSize: '14px' }}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
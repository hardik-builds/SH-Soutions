'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, getUser, logout } from '@/lib/auth';

export default function SimpleDashboardLayout({ children, title }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    setUser(getUser());
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
      {/* Top Navigation */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
        padding: '16px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#3B82F6',
            textDecoration: 'none',
            marginRight: '24px'
          }}>
            SH Solutions
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>{title}</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '16px', marginRight: '24px' }}>
            <Link href="/dashboard" style={{ 
              color: title === 'Dashboard' ? '#3B82F6' : '#6B7280', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Dashboard
            </Link>
            {/* <Link href="/dashboard/projects" style={{ 
              color: title === 'Projects' ? '#3B82F6' : '#6B7280', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Projects
            </Link>
            <Link href="/dashboard/profile" style={{ 
              color: title === 'Profile' ? '#3B82F6' : '#6B7280', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Profile
            </Link>
            <Link href="/dashboard/settings" style={{ 
              color: title === 'Settings' ? '#3B82F6' : '#6B7280', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Settings
            </Link> */}
          </nav>
          
          {/* User Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer'
              }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#3B82F6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontWeight: 'bold',
                marginRight: '8px'
              }}>
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {dropdownOpen && (
              <div style={{ 
                position: 'absolute', 
                right: 0, 
                top: '50px', 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                minWidth: '200px',
                zIndex: 20
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>Welcome back,</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{user.name || user.email}</div>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    width: '100%', 
                    backgroundColor: 'transparent', 
                    color: '#EF4444', 
                    border: 'none', 
                    padding: '12px 16px', 
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
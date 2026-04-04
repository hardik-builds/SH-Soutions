'use client';
import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle'; // Import ThemeToggle

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header style={{ backgroundColor: 'var(--card-bg, white)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6', textDecoration: 'none' }}>
          SH Solutions
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'var(--text-color, #4B5563)', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
            <Link href="/about" style={{ color: 'var(--text-color, #4B5563)', textDecoration: 'none', transition: 'color 0.3s' }}>About</Link>
            <Link href="/services" style={{ color: 'var(--text-color, #4B5563)', textDecoration: 'none', transition: 'color 0.3s' }}>Services</Link>
            <Link href="/pricing" style={{ color: 'var(--text-color, #4B5563)', textDecoration: 'none', transition: 'color 0.3s' }}>Pricing</Link>
            <Link href="/login" style={{ color: 'var(--text-color, #4B5563)', textDecoration: 'none', transition: 'color 0.3s' }}>Login</Link>
            <Link href="/register" style={{ backgroundColor: '#3B82F6', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', transition: 'background-color 0.3s' }}>Register</Link>
            
            {/* Theme Toggle Button - Moved after Register */}
            <ThemeToggle />
            
            {/* <Link href="/admin/contacts" style={{ color: '#4B5563', textDecoration: 'none', transition: 'color 0.3s' }}>Admin</Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-color, #4B5563)', cursor: 'pointer' }}
            onClick={toggleMenu}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu" style={{ marginTop: '16px', paddingBottom: '16px', display: 'none' }}>
            <Link href="/" style={{ display: 'block', padding: '8px 0', color: 'var(--text-color, #4B5563)', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ display: 'block', padding: '8px 0', color: 'var(--text-color, #4B5563)', textDecoration: 'none' }}>About</Link>
            <Link href="/services" style={{ display: 'block', padding: '8px 0', color: 'var(--text-color, #4B5563)', textDecoration: 'none' }}>Services</Link>
            <Link href="/pricing" style={{ display: 'block', padding: '8px 0', color: 'var(--text-color, #4B5563)', textDecoration: 'none' }}>Pricing</Link>
            <Link href="/login" style={{ display: 'block', padding: '8px 0', color: 'var(--text-color, #4B5563)', textDecoration: 'none' }}>Login</Link>
            <Link href="/register" style={{ display: 'block', padding: '8px 0', marginTop: '16px', backgroundColor: '#3B82F6', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', textAlign: 'center' }}>Register</Link>
            
            {/* Theme Toggle in Mobile Menu - Moved after Register */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <ThemeToggle />
            </div>
            
            {/* <Link href="/admin/contacts" style={{ display: 'block', padding: '8px 0', color: '#4B5563)', textDecoration: 'none' }}>Admin</Link> */}
          </div>
        )}
      </nav>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
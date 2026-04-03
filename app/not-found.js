'use client'
import Link from 'next/link';

export default function NotFound() {
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
        textAlign: 'center', 
        backgroundColor: 'white',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{ 
          fontSize: '120px', 
          fontWeight: '800', 
          color: '#3B82F6', 
          lineHeight: '1',
          marginBottom: '24px'
        }}>
          404
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Page Not Found</h2>
        <p style={{ color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/"
            style={{ 
              backgroundColor: '#3B82F6', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: '600', 
              textDecoration: 'none',
              transition: 'background-color 0.3s'
            }}
          >
            Go Home
          </Link>
          <Link 
            href="/contact"
            style={{ 
              backgroundColor: 'white', 
              color: '#3B82F6', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: '600', 
              textDecoration: 'none',
              border: '2px solid #3B82F6',
              transition: 'all 0.3s'
            }}
          >
            Contact Support
          </Link>
        </div>
        
        <div style={{ marginTop: '48px' }}>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '16px' }}>You might be looking for:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/about" style={{ color: '#3B82F6', textDecoration: 'none', fontSize: '14px' }}>About Us</Link>
            <Link href="/services" style={{ color: '#3B82F6', textDecoration: 'none', fontSize: '14px' }}>Services</Link>
            <Link href="/pricing" style={{ color: '#3B82F6', textDecoration: 'none', fontSize: '14px' }}>Pricing</Link>
            <Link href="/contact" style={{ color: '#3B82F6', textDecoration: 'none', fontSize: '14px' }}>Contact</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (hover: hover) {
          a:hover {
            background-color: #2563EB;
          }
          a:nth-of-type(2):hover {
            background-color: #EFF6FF;
          }
          div:last-child a:hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  )
}
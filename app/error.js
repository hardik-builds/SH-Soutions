'use client';

export default function Error({ error, reset }) {
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
          width: '80px', 
          height: '80px', 
          backgroundColor: '#FEE2E2', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <svg style={{ width: '40px', height: '40px', color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Oops! Something went wrong</h2>
        <p style={{ color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        <button 
          onClick={reset}
          style={{ 
            backgroundColor: '#3B82F6', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            fontWeight: '600', 
            border: 'none', 
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Try Again
        </button>
        <div style={{ marginTop: '24px' }}>
          <Link href="/" style={{ color: '#3B82F6', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
      <style jsx>{`
        @media (hover: hover) {
          button:hover {
            background-color: #2563EB;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  )
}
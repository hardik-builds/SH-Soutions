    import Link from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <nav style={{ padding: '16px 0', backgroundColor: '#F9FAFB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <ol style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
          {items.map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && (
                <svg style={{ width: '16px', height: '16px', color: '#9CA3AF', margin: '0 8px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {item.href ? (
                <Link href={item.href} style={{ color: '#6B7280', textDecoration: 'none', transition: 'color 0.3s' }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: '#3B82F6', fontWeight: '500' }}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <style jsx>{`
        @media (hover: hover) {
          a:hover {
            color: #3B82F6;
          }
        }
      `}</style>
    </nav>
  );
}
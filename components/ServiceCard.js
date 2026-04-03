import Link from 'next/link';

export default function ServiceCard({ title, description, icon, slug }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '12px', 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
      transition: 'transform 0.3s, box-shadow 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ color: '#3B82F6', marginBottom: '16px' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: '#6B7280', marginBottom: '16px' }}>{description}</p>
      <Link 
        href="/services"
        style={{ 
          color: '#3B82F6', 
          fontWeight: '600', 
          textDecoration: 'none', 
          display: 'inline-flex', 
          alignItems: 'center',
          transition: 'color 0.3s'
        }}
      >
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px', marginLeft: '4px' }} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
      <style jsx>{`
        @media (hover: hover) {
          div:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }
          a:hover {
            color: #2563EB;
          }
        }
      `}</style>
    </div>
  );
}
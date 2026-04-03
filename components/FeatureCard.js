export default function FeatureCard({ title, description, icon, isProcess = false, stepNumber }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '12px', 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
      {isProcess ? (
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          backgroundColor: '#3B82F6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '16px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          {stepNumber}
        </div>
      ) : (
        <div style={{ 
          color: '#3B82F6', 
          marginBottom: '16px',
          width: '48px',
          height: '48px'
        }}>
          {icon}
        </div>
      )}
      
      <h3 style={{ 
        fontSize: '20px', 
        fontWeight: 'bold', 
        marginBottom: '12px',
        color: '#1F2937'
      }}>
        {title}
      </h3>
      
      <p style={{ 
        color: '#4B5563', 
        lineHeight: '1.6',
        flexGrow: 1
      }}>
        {description}
      </p>
    </div>
  );
}
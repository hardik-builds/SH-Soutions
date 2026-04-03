'use client'
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

const team = [
  {
    name: 'Hardik L. Singh',
    role: 'Founder & Full-Stack Developer',
    bio: 'A recent B.Sc. (IT) graduate with a strong passion for web development, cybersecurity, and digital innovation. This project is a culmination of my academic learning and my first step into the professional world. I am eager to apply my skills to create impactful digital solutions.',
    image: '/images/hardik-singh.jpeg'
  },
  
];

const achievements = [
  { title: 'Technologies Mastered', value: '15+', description: 'Proficient in a wide range of modern technologies and frameworks' },
  { title: 'Projects Completed', value: '6+', description: 'A portfolio of academic and personal development projects' },
  { title: 'Academic Score', value: '8.5+', description: 'Consistently high performance in IT-related subjects' },
  { title: 'Hours of Learning', value: '1000+', description: 'Dedicated to self-learning and practical application' }
];

export default function About() {
  const { isDark } = useTheme();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transition: 'background-color 0.3s, color 0.3s' }}>
      {/* Hero Section */}
      <section style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom right, #1e3a8a, #0f172a)' 
          : 'linear-gradient(to bottom right, #3B82F6, #06B6D4)', 
        color: 'white', 
        padding: '96px 0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>About ASH Solutions & Innovations</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>Learn more about my journey as a fresher, the skills I've mastered, and the mentorship that guided this project.</p>
        </div>
      </section>

      {/* My Story Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '64px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--primary-color)' }}>My Journey</h2>
              <p style={{ fontSize: '18px', color: 'var(--text-color)', marginBottom: '24px', lineHeight: '1.6' }}>
                My journey with ASH Solutions & Innovations began as a final year project for my Bachelor's degree in Information Technology at Sree Narayana Guru College of Commerce. What started as an academic requirement quickly evolved into a passion project—a platform to consolidate and showcase the full-stack development, cybersecurity principles, and digital marketing strategies I've learned.
              </p>
              <p style={{ fontSize: '18px', color: 'var(--text-color)', marginBottom: '24px', lineHeight: '1.6' }}>
                This website is not just a project; it's a testament to my dedication to modern web technologies and my eagerness to solve real-world problems. As a fresher entering the IT industry, my goal is to leverage these skills to help businesses establish a strong digital footprint.
              </p>
              <p style={{ fontSize: '18px', color: 'var(--text-color)', lineHeight: '1.6' }}>
                SH Solutions & Innovations represents my commitment to innovation, continuous learning, and delivering high-quality, tailored solutions.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--secondary-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '48px' }}>
            <div style={{ 
              backgroundColor: 'var(--card-bg)', 
              padding: '40px', 
              borderRadius: '16px', 
              boxShadow: isDark 
                ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: `1px solid var(--border-color)`
            }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--primary-color)' }}>My Mission</h2>
              <p style={{ color: 'var(--text-color)', lineHeight: '1.6' }}>
                To apply my knowledge in web development, cybersecurity, and digital solutions to help businesses and individuals enhance their online presence. I aim to grow as a developer by delivering practical, secure, and innovative projects.
              </p>
            </div>
            <div style={{ 
              backgroundColor: 'var(--card-bg)', 
              padding: '40px', 
              borderRadius: '16px', 
              boxShadow: isDark 
                ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: `1px solid var(--border-color)`
            }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--primary-color)' }}>My Vision</h2>
              <p style={{ color: 'var(--text-color)', lineHeight: '1.6' }}>
                To continuously evolve my skill set, stay updated with the latest industry trends, and build a reputation for creating reliable and effective digital solutions that make a tangible difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px', color: 'var(--primary-color)' }}>Skills & Milestones</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '32px' }}>
            {achievements.map((achievement, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--info-color)', marginBottom: '16px' }}>{achievement.value}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--primary-color)' }}>{achievement.title}</h3>
                <p style={{ color: 'var(--text-color)' }}>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '96px 0', backgroundColor: 'var(--secondary-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px', color: 'var(--primary-color)' }}>The Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '48px', maxWidth: '900px', margin: '0 auto' }}>
            {team.map((member, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '40px', 
                  borderRadius: '16px', 
                  boxShadow: isDark 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: `1px solid var(--border-color)`
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ 
                      width: '128px', 
                      height: '128px', 
                      borderRadius: '50%', 
                      marginBottom: '24px', 
                      border: '4px solid var(--info-color)', 
                      objectFit: 'cover' 
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{member.name}</h3>
                    <p style={{ color: 'var(--info-color)', fontWeight: '600' }}>{member.role}</p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-color)', lineHeight: '1.6', textAlign: 'center' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '96px 0', 
        background: isDark 
          ? 'linear-gradient(to right, #1e3a8a, #0f172a)' 
          : 'linear-gradient(to right, #3B82F6, #06B6D4)', 
        color: 'white' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Let's Build Something Together</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px', opacity: 0.9 }}>
            I'm excited to bring my skills and fresh perspective to your next project. Get in touch to discuss how I can help.
          </p>
          <Link 
            href="/contact" 
            style={{ 
              backgroundColor: 'white', 
              color: 'var(--primary-color)', 
              padding: '12px 32px', 
              borderRadius: '6px', 
              fontWeight: '600', 
              textDecoration: 'none', 
              fontSize: '18px', 
              transition: 'all 0.3s' 
            }}
          >
            Get In Touch
          </Link>
        </div>
      </section>
      <style jsx>{`
        @media (min-width: 768px) {
          section:nth-of-type(2) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
          section:nth-of-type(3) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
          section:nth-of-type(4) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
          section:nth-of-type(5) > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          section:nth-of-type(4) > div > div {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (hover: hover) {
          a:hover {
            background-color: var(--hover-bg);
          }
        }
      `}</style>
    </div>
  );
}
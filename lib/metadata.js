// lib/metadata.js
export function generateMetadata(pageName, additionalData = {}) {
  // Use environment variable or fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const baseMetadata = {
    metadataBase: new URL(baseUrl),
    robots: {
      index: process.env.NODE_ENV === 'production',
      follow: process.env.NODE_ENV === 'production',
      googleBot: {
        index: process.env.NODE_ENV === 'production',
        follow: process.env.NODE_ENV === 'production',
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  const pageMetadata = {
    home: {
      title: 'SH Solutions - Advanced Digital Solutions for Modern Businesses',
      description: 'Enhance your digital presence, performance, and security with our integrated services in web development, cybersecurity, SEO, game development, and app development.',
      keywords: 'web development, cybersecurity, SEO optimization, game development, app development, cloud solutions, digital solutions, business technology',
      openGraph: {
        title: 'SH Solutions - Advanced Digital Solutions',
        description: 'Enhance your digital presence, performance, and security with our integrated services.',
        url: `${baseUrl}/`,
        images: [
          {
            url: '/og-home.jpg',
            width: 1200,
            height: 630,
            alt: 'SH Solutions - Home',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'SH Solutions - Advanced Digital Solutions',
        description: 'Enhance your digital presence, performance, and security with our integrated services.',
        images: ['/og-home.jpg'],
      },
    },
    about: {
      title: 'About Us - SH Solutions',
      description: 'Learn more about SH Solutions, a smart and integrated web platform providing advanced digital solutions in web development, cybersecurity, SEO, and more.',
      keywords: 'about SH Solutions, company profile, digital solutions company, web development team',
      openGraph: {
        title: 'About SH Solutions',
        description: 'Learn more about our team and our commitment to providing advanced digital solutions.',
        url: `${baseUrl}/about`,
        images: [
          {
            url: '/og-about.jpg',
            width: 1200,
            height: 630,
            alt: 'About SH Solutions',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'About SH Solutions',
        description: 'Learn more about our team and our commitment to providing advanced digital solutions.',
        images: ['/og-about.jpg'],
      },
    },
    services: {
      title: 'Our Services - SH Solutions',
      description: 'Explore our comprehensive range of digital services including web development, cybersecurity, SEO optimization, game development, app development, and cloud solutions.',
      keywords: 'web development services, cybersecurity services, SEO services, game development services, app development services, cloud solutions',
      openGraph: {
        title: 'Our Services - SH Solutions',
        description: 'Explore our comprehensive range of digital services tailored to your business needs.',
        url: `${baseUrl}/services`,
        images: [
          {
            url: '/og-services.jpg',
            width: 1200,
            height: 630,
            alt: 'SH Solutions Services',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Our Services - SH Solutions',
        description: 'Explore our comprehensive range of digital services tailored to your business needs.',
        images: ['/og-services.jpg'],
      },
    },
    pricing: {
      title: 'Pricing Plans - SH Solutions',
      description: 'View our competitive pricing plans for web development, cybersecurity, SEO optimization, game development, app development, and cloud solutions.',
      keywords: 'pricing plans, web development pricing, cybersecurity pricing, SEO pricing, service costs',
      openGraph: {
        title: 'Pricing Plans - SH Solutions',
        description: 'View our competitive pricing plans for all our digital services.',
        url: `${baseUrl}/pricing`,
        images: [
          {
            url: '/og-pricing.jpg',
            width: 1200,
            height: 630,
            alt: 'SH Solutions Pricing',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Pricing Plans - SH Solutions',
        description: 'View our competitive pricing plans for all our digital services.',
        images: ['/og-pricing.jpg'],
      },
    },
    login: {
      title: 'Login - SH Solutions',
      description: 'Login to your SH Solutions account to access your dSHboard and manage your services.',
      keywords: 'login, account access, client dSHboard',
      openGraph: {
        title: 'Login - SH Solutions',
        description: 'Access your SH Solutions account.',
        url: `${baseUrl}/login`,
        images: [
          {
            url: '/og-login.jpg',
            width: 1200,
            height: 630,
            alt: 'SH Solutions Login',
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
      },
    },
    register: {
      title: 'Register - SH Solutions',
      description: 'Create a new account with SH Solutions to get started with our digital solutions.',
      keywords: 'register, create account, sign up',
      openGraph: {
        title: 'Register - SH Solutions',
        description: 'Create a new account with SH Solutions.',
        url: `${baseUrl}/register`,
        images: [
          {
            url: '/og-register.jpg',
            width: 1200,
            height: 630,
            alt: 'SH Solutions Register',
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
      },
    },
    contact: {
      title: 'Contact Us - SH Solutions',
      description: 'Get in touch with SH Solutions to discuss how our digital solutions can help transform your business.',
      keywords: 'contact SH Solutions, get in touch, business inquiry, digital solutions consultation',
      openGraph: {
        title: 'Contact SH Solutions',
        description: 'Get in touch with us to discuss your digital transformation needs.',
        url: `${baseUrl}/contact`,
        images: [
          {
            url: '/og-contact.jpg',
            width: 1200,
            height: 630,
            alt: 'Contact SH Solutions',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Contact SH Solutions',
        description: 'Get in touch with us to discuss your digital transformation needs.',
        images: ['/og-contact.jpg'],
      },
    },
    dSHboard: {
      title: 'DSHboard - SH Solutions',
      description: 'Access your SH Solutions dSHboard to manage your projects, view reports, and track your digital solutions.',
      keywords: 'dSHboard, client portal, project management, SH Solutions account',
      openGraph: {
        title: 'DSHboard - SH Solutions',
        description: 'Access your SH Solutions dSHboard to manage your projects and services.',
        url: `${baseUrl}/dSHboard`,
        images: [
          {
            url: '/og-dSHboard.jpg',
            width: 1200,
            height: 630,
            alt: 'SH Solutions DSHboard',
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
      },
    },
  };

  // Merge base metadata with page-specific metadata and any additional data
  return {
    ...baseMetadata,
    ...pageMetadata[pageName],
    ...additionalData,
  };
}
'use client';
import { useEffect } from 'react';

export default function ResponsiveHandler() {
  useEffect(() => {
    const handleResize = () => {
      const desktopMenu = document.querySelector('.desktop-menu');
      const authMenu = document.querySelector('.auth-menu');
      
      if (window.innerWidth >= 768) {
        if (desktopMenu) {
          desktopMenu.style.display = 'flex';
          desktopMenu.style.gap = '32px';
        }
        if (authMenu) {
          authMenu.style.display = 'flex';
          authMenu.style.gap = '16px';
        }
      } else {
        if (desktopMenu) desktopMenu.style.display = 'none';
        if (authMenu) authMenu.style.display = 'none';
      }
    };
    
    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}
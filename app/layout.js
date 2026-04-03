// app/layout.js
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import ResponsiveHandler from '@/components/ResponsiveHandler';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'ASH Solutions',
  description: 'Advanced digital solutions for modern businesses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'var(--bg-color, #FFFFFF)',
        color: 'var(--text-color, #000000)',
        transition: 'background-color 0.3s, color 0.3s'
      }}>
        <ThemeProvider>
          <ResponsiveHandler />
          <Header />
          <main style={{ flexGrow: 1, backgroundColor: 'var(--bg-color, #FFFFFF)' }}>
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
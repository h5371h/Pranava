import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Navbar from './navbar'
import SessionProviderWrapper from './SessionProviderWrapper'
import { ThemeProvider } from './contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pranava Yoga & Wellness',
  description: 'Transform your life with holistic yoga and wellness practices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${inter.className} bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark transition-colors duration-300`}>
          <SessionProviderWrapper>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-20 pb-8 px-4">{children}</main>
              <Footer />
            </div>
          </SessionProviderWrapper>
        </body>
      </html>
    </ThemeProvider>
  )
}

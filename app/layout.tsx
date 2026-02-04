import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/navbar/Navbar'
import { ToastContainer, Bounce } from 'react-toastify';
import Footer from '../components/footer/Footer';

export const metadata: Metadata = {
  title: 'Target Trail Mailer – Smart Email Campaign & Outreach Platform',
  description:
    'Target Trail Mailer is a modern email campaign and outreach platform built to simplify email marketing, automation, and lead communication at scale.',

  keywords: [
    'Target Trail Mailer',
    'email campaign software',
    'email outreach tool',
    'bulk email sender',
    'email automation platform',
    'email marketing tool',
    'cold email software',
    'Lalitkishor Kanojiya',
    'Lalitkishor developer',
    'full stack developer Lalitkishor'
  ],

  authors: [
    { name: 'Lalitkishor A. Kanojiya', url: 'https://lalitkishor.vercel.app' }
  ],

  creator: 'Lalitkishor A. Kanojiya',
  publisher: 'Target Trail Mailer',

  metadataBase: new URL('https://your-domain.com'), // replace with real domain

  openGraph: {
    title: 'Target Trail Mailer – Smart Email Campaign & Outreach Platform',
    description:
      'Launch, manage, and scale email campaigns easily with Target Trail Mailer. Built for marketers, founders, and growth teams.',
    url: 'https://your-domain.com',
    siteName: 'Target Trail Mailer',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Target Trail Mailer – Email Campaign Platform',
    description:
      'A powerful platform for email outreach, marketing automation, and campaign management.',
    creator: '@lalitkishor', // optional
  },

  alternates: {
    canonical: 'https://your-domain.com',
  }
}


export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/icon.png" />
        </head>
        <body className='flex flex-col min-h-screen'>

          {/* ✅ ALL UI MUST BE INSIDE BODY */}
          <Navbar />

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </body>
      </html>
    </ClerkProvider>
  )
}

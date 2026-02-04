import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/navbar/Navbar'
import { ToastContainer, Bounce } from 'react-toastify';
import Footer from '../components/footer/Footer';

export const metadata: Metadata = {
  title: 'Target Trail Mailer',
  description: 'Ease your email campaigns with Target Trail Mailer',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
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

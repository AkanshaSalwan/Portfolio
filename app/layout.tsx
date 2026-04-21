import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  variable: '--font-fira-code'
});

export const metadata: Metadata = {
  title: 'Akansha Salwan | Frontend Developer',
  description: 'Frontend Developer with experience in React.js and Next.js, building scalable EdTech platforms and management dashboards.',
  generator: 'v0.app',
  keywords: ['Frontend Developer', 'React.js', 'Next.js', 'Web Developer', 'UI/UX', 'JavaScript'],
  authors: [{ name: 'Akansha Salwan' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

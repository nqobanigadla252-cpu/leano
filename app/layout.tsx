import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://leanodistributions.co.za'),
  title: {
    default: 'Leano Distributions — Good things for the everyday',
    template: '%s | Leano Distributions',
  },
  description: 'Thoughtful everyday essentials for the home and family. Find little things for baby, home, outdoors and wherever life takes you.',
  openGraph: {
    title: 'Leano Distributions — Good things for the everyday',
    description: 'Thoughtful everyday essentials for the home and family.',
    type: 'website',
    locale: 'en_ZA',
  },
  generator: 'Leano Distributions',
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

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf8ff' },
    { media: '(prefers-color-scheme: dark)', color: '#171124' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

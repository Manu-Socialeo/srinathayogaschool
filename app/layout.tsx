import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'YogaSchool',
  name: 'Srinatha Yoga Shala',
  description: 'Traditional Mysore Yoga, taught online for the modern world. Certified TTC, Philosophy, and Ayurveda courses.',
  url: 'https://srinathayogaschool.com',
  logo: 'https://srinathayogaschool.com/images/logo.png',
  image: 'https://srinathayogaschool.com/images/logo.png',
  telephone: '+919886512083',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mysore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.instagram.com/yogawithsrinatha/',
    'https://youtube.com',
    'https://facebook.com',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200000',
  },
}

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Srinatha Yoga Shala | Online Ashtanga & Hatha Yoga Teacher Training Mysore',
  description: 'Experience traditional Mysore yoga online. Certified TTC, Philosophy, and Ayurveda courses led by Dr. Srinatha. Yoga Alliance & YACP accredited.',
  keywords: ['yoga', 'ashtanga', 'hatha', 'teacher training', 'mysore', 'online yoga', 'yoga alliance', 'YACP', 'Dr. Srinatha', 'ayurveda', 'philosophy'],
  authors: [{ name: 'Dr. Balasundara Srinatha' }],
  generator: 'v0.app',
  openGraph: {
    title: 'Srinatha Yoga Shala | Online Ashtanga & Hatha Yoga Teacher Training Mysore',
    description: 'Experience traditional Mysore yoga online. Certified TTC, Philosophy, and Ayurveda courses led by Dr. Srinatha. Yoga Alliance & YACP accredited.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srinatha Yoga Shala | Online Ashtanga & Hatha Yoga Teacher Training Mysore',
    description: 'Experience traditional Mysore yoga online. Certified TTC, Philosophy, and Ayurveda courses led by Dr. Srinatha. Yoga Alliance & YACP accredited.',
  },
}

export const viewport: Viewport = {
  themeColor: '#264020',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

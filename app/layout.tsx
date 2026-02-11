import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '../providers/theme-provider'
import { Header } from '../components/Header'
import Footer from '../components/Footer'

const siteUrl = new URL('https://hodlcoin.co.in')

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'hodlCoin | Self-Stabilizing Staking Vaults',
  description: 'Stake in self-stabilizing vaults designed to protect value over time. Earn yield across EVM chains, Ergo, and Alephium—while unstaking fees reward long-term stakers and vault creators.',
  keywords: [
    'hodlCoin',
    'staking',
    'crypto staking',
    'DeFi',
    'self-stabilizing',
    'staking vaults',
    'EVM chains',
    'Ergo',
    'Alephium',
    'blockchain',
    'cryptocurrency',
    'token staking',
    'long-term holding',
  ],
  authors: [{ name: 'Stability Nexus' }],
  creator: 'Stability Nexus',
  publisher: 'Stability Nexus',
  metadataBase: siteUrl,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'hodlCoin',
    title: 'hodlCoin | Self-Stabilizing Staking Vaults',
    description: 'Stake in self-stabilizing vaults designed to protect value over time. Earn yield across EVM chains, Ergo, and Alephium—while unstaking fees reward long-term stakers and vault creators.',
    images: [
      {
        url: new URL('/hodlcoin.png', siteUrl),
        width: 2000,
        height: 1730,
        alt: 'hodlCoin logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hodlCoin | Self-Stabilizing Staking Vaults',
    description: 'Stake in self-stabilizing vaults designed to protect value over time. Earn yield across EVM chains, Ergo, and Alephium.',
    images: [new URL('/hodlcoin.png', siteUrl)],
    creator: '@StabilityNexus',
    site: '@StabilityNexus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={poppins.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1 w-full">
                {children}
              </main>
              <Footer />
            </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

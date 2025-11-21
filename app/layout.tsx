import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '../providers/theme-provider'
import { Header } from '../components/Header'
import Footer from '../components/Footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'hodlCoin Staking Platform | Self-Stabilizing Staking Vaults',
  description: 'Self-Stabilizing Staking vaults where the price is mathematically proven to always increase! Stake your tokens on EVM chains, Ergo, or Alephium. Unstaking fees benefit vault creators and long-term stakers.',
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
  metadataBase: new URL('https://hodlcoin.co.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hodlcoin.co.in',
    siteName: 'hodlCoin Staking Platform',
    title: 'hodlCoin Staking Platform | Self-Stabilizing Staking Vaults',
    description: 'Self-Stabilizing Staking vaults where the price is mathematically proven to always increase! Stake your tokens on EVM chains, Ergo, or Alephium. Unstaking fees benefit vault creators and long-term stakers.',
    images: [
      {
        url: '/hodlcoin.png',
        width: 2000,
        height: 1730,
        alt: 'hodlCoin Logo - Self-Stabilizing Staking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hodlCoin Staking Platform | Self-Stabilizing Staking Vaults',
    description: 'Self-Stabilizing Staking vaults where the price is mathematically proven to always increase! Stake on EVM chains, Ergo, or Alephium.',
    images: ['/hodlcoin.png'],
    creator: '@hodlCoinStaking',
    site: '@hodlCoinStaking',
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
      {/* Fonts are now loaded exclusively through `next/font` */}
      <body className={poppins.className}>
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

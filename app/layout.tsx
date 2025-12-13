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
  title: 'hodlCoin | Multi-Chain Staking with Self-Stabilizing Vaults',
  description: 'Multi-chain staking platform with self-stabilizing vaults. Supports EVM (Ethereum, BSC, Polygon), Ergo & Alephium. Earn more by holding longer.',
  keywords: [
    'hodlCoin',
    'staking',
    'crypto staking',
    'DeFi',
    'self-stabilizing',
    'staking vaults',
    'multi-chain staking',
    'EVM chains',
    'Ethereum staking',
    'BSC staking',
    'Polygon staking',
    'Ergo blockchain',
    'Alephium blockchain',
    'blockchain',
    'cryptocurrency',
    'token staking',
    'long-term holding',
    'passive income',
    'crypto rewards',
    'decentralized finance',
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
    siteName: 'hodlCoin',
    title: 'hodlCoin | Multi-Chain Staking with Self-Stabilizing Vaults',
    description: 'Stake smarter with self-stabilizing vaults on EVM (Ethereum, BSC, Polygon), Ergo & Alephium. Innovative price stability mechanisms reward long-term holders. Start earning more by holding longer.',
    images: [
      {
        url: '/hodlcoin.png',
        width: 1200,
        height: 630,
        alt: 'hodlCoin - Multi-Chain Staking Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hodlCoin | Multi-Chain Staking Platform',
    description: 'Stake smarter with self-stabilizing vaults on EVM, Ergo & Alephium. Hold longer, earn more through innovative unstaking fee rewards.',
    images: ['/hodlcoin.png'],
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

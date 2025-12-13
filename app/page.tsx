'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useMatrixEffect } from '@/hooks/useMatrixEffect'

export default function HomePage() {
  const heroMatrixRef = useMatrixEffect(0.2, 2)
  const sectionMatrixRef = useMatrixEffect(0.15, 1.5)

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full min-h-[90vh] mt-4 overflow-hidden flex flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 pointer-events-none" />

        {/* Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div ref={heroMatrixRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gray-300/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gray-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gray-500/5 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 py-16 space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gradient">
              hodlCoin Staking Platform
            </h1>
            <p className="text-lg text-muted-foreground">
              Self-Stabilizing staking vaults with mathematically increasing value.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl text-gradient text-center">
            Choose the blockchain where you would like to stake:
          </h2>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-col md:flex-row gap-4">
            {[
              { label: 'EVM Chains', href: 'https://evm.hodlcoin.co.in/' },
              { label: 'Ergo', href: 'https://app.hodlcoin.co.in/' },
              { label: 'Alephium', href: 'https://www.phoenixfi.app/' },
            ].map(({ label, href }) => (
              <Link key={label} href={href}>
                <Button
                  size="lg"
                  className="
                    group relative overflow-hidden font-bold
                    bg-gradient-to-r from-primary to-purple-600
                    hover:from-purple-600 hover:to-primary
                    transition-all duration-300
                    hover:scale-105 hover:shadow-2xl hover:shadow-primary/25
                    border-0
                  "
                >
                  <span className="relative z-10 text-primary-foreground group-hover:text-black transition-colors">
                    {label}
                  </span>

                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= INFO SECTION ================= */}
      <section className="relative w-full py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div ref={sectionMatrixRef} className="absolute inset-0 w-full h-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
              <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition">
                <Link href="https://eprint.iacr.org/2023/1029" target="_blank">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/paper.png"
                      alt="Research Paper"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
              </Card>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gradient">
                How hodlCoin Works
              </h2>

              <p className="text-lg text-muted-foreground">
                HodlCoin rewards long-term staking by redistributing unstaking fees to loyal holders.
              </p>

              <Link
                href="https://eprint.iacr.org/2023/1029"
                target="_blank"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Read the Research Paper →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

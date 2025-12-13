import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Types
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  mounted: boolean;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme Context
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  mounted: false
});

// Theme Provider Component
export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initial = stored || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark'): void => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#111827');
      root.style.setProperty('--bg-secondary', '#1f2937');
      root.style.setProperty('--bg-tertiary', '#374151');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#d1d5db');
      root.style.setProperty('--border-color', '#4b5563');
      root.style.backgroundColor = '#111827';
      root.style.color = '#f9fafb';
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb');
      root.style.setProperty('--bg-tertiary', '#f3f4f6');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.backgroundColor = '#ffffff';
      root.style.color = '#111827';
    }
  };

  // Toggle theme function
  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme Toggle Button Component
export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button style={styles.button}>
        <div style={{ width: 20, height: 20 }} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      style={styles.button}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5" style={{ color: '#eab308' }} />
      ) : (
        <Moon className="w-5 h-5" style={{ color: '#60a5fa' }} />
      )}
    </button>
  );
}

// Styles object
const styles = {
  button: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

// HomePage Component (renamed from App for Next.js conventions)
export default function HomePage(): JSX.Element {
  return (
    <ThemeProvider>
      <HomePageContent />
    </ThemeProvider>
  );
}

function HomePageContent(): JSX.Element {
  const { theme, mounted } = useTheme();
  
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'all 0.3s ease'
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    padding: '16px 0'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px'
  };

  if (!mounted) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#111827' }} />;
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>hodlCoin</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Theme Toggle →
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', paddingTop: '32px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            hodlCoin Staking Platform
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 32px', lineHeight: '1.6' }}>
            Self-Stabilizing Staking vaults where the price is mathematically proven to always increase!<br />
            Unstaking fees benefit vault creators and those who keep staking longer.
          </p>
          
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>
            Choose the blockchain where you would like to stake:
          </h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <button style={{ padding: '12px 32px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', border: 'none', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', color: 'white', cursor: 'pointer' }}>
              EVM Chains
            </button>
            <button style={{ padding: '12px 32px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', border: 'none', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', color: 'white', cursor: 'pointer' }}>
              Ergo
            </button>
            <button style={{ padding: '12px 32px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', border: 'none', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', color: 'white', cursor: 'pointer' }}>
              Alephium
            </button>
          </div>
        </div>

        {/* How HodlCoin Works */}
        <div style={{ marginBottom: '64px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
              How hodlCoin Works
            </h2>
            <div style={{ height: '4px', width: '80px', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', borderRadius: '2px', marginBottom: '24px' }} />
            
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
              HodlCoin is a staking protocol that encourages staking ("hodling") assets for long periods of time. When hodling, users deposit coins of a given asset in a vault and receive a proportional amount of corresponding hodlCoins.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              When unhodling, users must pay an unstaking fee that benefits the vault's creator and users who continue hodling longer. Moreover, anyone (especially vault creators) can distribute rewards to hodlers, to further incentivize hodling.
            </p>
          </div>
        </div>

        {/* Why HodlCoin Section */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>
            Why hodlCoin
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* For Vault Creators */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                For Vault Creators
              </h3>
              <div style={{ height: '2px', width: '48px', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', borderRadius: '1px', marginBottom: '20px' }} />
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Reward your Loyal Tokenholders</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Efficiently distribute rewards to all your tokenholders with a single transaction.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Signal your Long-Term Commitment</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Stake your own tokens in a vault with a high unstaking fee, to show your community that you are holding for the long run.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Earn Unstaking Fees</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Receive a portion of fees when users unstake early.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* For Stakers */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                For Stakers
              </h3>
              <div style={{ height: '2px', width: '48px', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', borderRadius: '1px', marginBottom: '20px' }} />
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Earn from Others' Impatience</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Benefit from unstaking fees paid by users who exit early.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Long-Term Value Growth</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>The price of the hodlCoin is mathematically guaranteed to grow w.r.t. the price of the underlying coin, if you hodl longer than others.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Receive Rewards</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Get additional rewards distributed by vault creators who want to incentivize staking.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
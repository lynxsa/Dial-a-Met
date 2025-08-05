import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { DialAMetThemeProvider } from '@/components/theme/DialAMetThemeProvider'
import { AuthProvider } from '@/components/AuthProvider'
import { generateMetadata as generateSEOMetadata, baseSEOConfig } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateSEOMetadata({
  title: baseSEOConfig.siteName,
  description: baseSEOConfig.siteDescription,
  canonical: '/',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance and Analytics Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance monitoring
              if (typeof window !== 'undefined') {
                setTimeout(() => {
                  const script = document.createElement('script');
                  script.type = 'module';
                  script.textContent = \`
                    import { initializePerformanceMonitoring } from '/src/lib/performance.js';
                    initializePerformanceMonitoring();
                  \`;
                  document.head.appendChild(script);
                }, 100);
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen transition-colors duration-200`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DialAMetThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </DialAMetThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

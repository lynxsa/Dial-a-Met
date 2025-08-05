// SEO optimization utilities for Dial-a-Met

import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

// Base SEO configuration for Dial-a-Met
export const baseSEOConfig = {
  siteName: 'Dial-a-Met',
  siteDescription: 'South Africa\'s premier mining consultancy marketplace. Connect with expert metallurgists, mining engineers, and industry specialists.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dial-a-met.com',
  defaultImage: '/images/dial-a-met-og.jpg',
  twitterHandle: '@DialAMet',
  locale: 'en_ZA',
  type: 'website',
}

// Generate comprehensive metadata for Next.js pages
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    image = baseSEOConfig.defaultImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = config

  const fullTitle = title.includes(baseSEOConfig.siteName) 
    ? title 
    : `${title} | ${baseSEOConfig.siteName}`

  const fullUrl = canonical ? `${baseSEOConfig.siteUrl}${canonical}` : baseSEOConfig.siteUrl
  const imageUrl = image.startsWith('http') ? image : `${baseSEOConfig.siteUrl}${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      'mining consultancy',
      'metallurgy',
      'South Africa mining',
      'mining engineers',
      'geological consulting',
      'mining services',
      'mineral processing',
      'extraction consulting',
    ].join(', '),
    authors: author ? [{ name: author }] : [{ name: baseSEOConfig.siteName }],
    creator: baseSEOConfig.siteName,
    publisher: baseSEOConfig.siteName,
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
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      locale: baseSEOConfig.locale,
      url: fullUrl,
      siteName: baseSEOConfig.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      site: baseSEOConfig.twitterHandle,
      creator: baseSEOConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }

  return metadata
}

// Pre-configured metadata for common pages
export const pageMetadata = {
  home: (): Metadata => generateMetadata({
    title: 'Expert Mining Consultancy Marketplace',
    description: 'Connect with South Africa\'s top mining consultants, metallurgists, and geological engineers. Get expert advice for your mining projects.',
    keywords: [
      'mining consultancy marketplace',
      'South African mining experts',
      'metallurgy consultants',
      'geological surveys',
      'mineral extraction',
      'mining project management',
    ],
    canonical: '/',
  }),

  consultants: (): Metadata => generateMetadata({
    title: 'Browse Mining Consultants',
    description: 'Discover qualified mining consultants, metallurgists, and engineers. Filter by expertise, location, and project type.',
    keywords: [
      'mining consultants',
      'metallurgy experts',
      'geological consultants',
      'mining engineers',
      'mineral processing specialists',
    ],
    canonical: '/consultants',
  }),

  projects: (): Metadata => generateMetadata({
    title: 'Mining Projects & Opportunities',
    description: 'Explore mining projects and consulting opportunities across South Africa. Submit proposals and win contracts.',
    keywords: [
      'mining projects',
      'consulting opportunities',
      'mining contracts',
      'geological projects',
      'mineral exploration',
    ],
    canonical: '/projects',
  }),

  about: (): Metadata => generateMetadata({
    title: 'About Dial-a-Met - Mining Consultancy Platform',
    description: 'Learn about Dial-a-Met, South Africa\'s leading platform connecting mining professionals with industry expertise.',
    keywords: [
      'about dial-a-met',
      'mining platform',
      'consultancy network',
      'mining community',
    ],
    canonical: '/about',
  }),

  contact: (): Metadata => generateMetadata({
    title: 'Contact Us - Dial-a-Met Support',
    description: 'Get in touch with Dial-a-Met support team. We\'re here to help with your mining consultancy needs.',
    keywords: [
      'contact dial-a-met',
      'mining support',
      'consultancy help',
      'customer service',
    ],
    canonical: '/contact',
  }),
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: baseSEOConfig.siteName,
    description: baseSEOConfig.siteDescription,
    url: baseSEOConfig.siteUrl,
    logo: `${baseSEOConfig.siteUrl}/images/logo.png`,
    sameAs: [
      'https://twitter.com/DialAMet',
      'https://linkedin.com/company/dial-a-met',
      'https://facebook.com/dialametsouthafrica',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-11-xxx-xxxx',
      contactType: 'customer service',
      availableLanguage: ['English', 'Afrikaans'],
    },
    industry: 'Mining Consultancy',
    numberOfEmployees: '50-100',
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: baseSEOConfig.siteName,
    description: baseSEOConfig.siteDescription,
    url: baseSEOConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseSEOConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: baseSEOConfig.siteName,
    },
  }
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mining Consultancy Marketplace',
    description: 'Professional mining consultancy services connecting experts with industry projects',
    provider: {
      '@type': 'Organization',
      name: baseSEOConfig.siteName,
    },
    serviceType: 'Mining Consultancy',
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mining Consultancy Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Metallurgy Consulting',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Geological Surveys',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mining Engineering',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Environmental Compliance',
          },
        },
      ],
    },
  }
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseSEOConfig.siteUrl}${item.url}`,
    })),
  }
}

// SEO audit utilities
export function auditPageSEO() {
  if (typeof window === 'undefined') return null

  const audit = {
    title: {
      present: !!document.title,
      length: document.title.length,
      optimal: document.title.length >= 30 && document.title.length <= 60,
    },
    metaDescription: {
      present: !!document.querySelector('meta[name="description"]'),
      length: document.querySelector('meta[name="description"]')?.getAttribute('content')?.length || 0,
      optimal: false,
    },
    headings: {
      h1Count: document.querySelectorAll('h1').length,
      h1Present: document.querySelectorAll('h1').length === 1,
      structure: Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => h.tagName),
    },
    images: {
      total: document.querySelectorAll('img').length,
      missingAlt: document.querySelectorAll('img:not([alt])').length,
    },
    links: {
      internal: document.querySelectorAll('a[href^="/"], a[href^="#"]').length,
      external: document.querySelectorAll('a[href^="http"]:not([href*="dial-a-met.com"])').length,
      nofollow: document.querySelectorAll('a[rel*="nofollow"]').length,
    },
  }

  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
  if (description) {
    audit.metaDescription.optimal = description.length >= 120 && description.length <= 160
  }

  return audit
}

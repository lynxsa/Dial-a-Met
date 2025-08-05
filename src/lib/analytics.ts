// Advanced analytics and tracking for Dial-a-Met

export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  properties?: Record<string, string | number | boolean>
}

export interface UserProperties {
  userId?: string
  userType?: 'consultant' | 'client' | 'visitor'
  location?: string
  industry?: string
  experience?: string
  registrationDate?: string
}

// Core Analytics Manager
export class AnalyticsManager {
  private isInitialized = false
  private debugMode = process.env.NODE_ENV !== 'production'

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize()
    }
  }

  private initialize() {
    // Initialize Google Analytics 4
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      this.initializeGA4()
    }

    // Initialize Facebook Pixel
    if (process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
      this.initializeFacebookPixel()
    }

    // Initialize LinkedIn Insight Tag
    if (process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID) {
      this.initializeLinkedInInsight()
    }

    this.isInitialized = true
  }

  private initializeGA4() {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    
    // Load Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function(...args: unknown[]) { window.dataLayer.push(args) }
    
    window.gtag('js', new Date())
    window.gtag('config', gaMeasurementId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        dimension1: 'user_type',
        dimension2: 'industry',
        dimension3: 'experience_level',
      },
    })
  }

  private initializeFacebookPixel() {
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
    if (!pixelId) return
    
    // Create Facebook Pixel script
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)
  }

  private initializeLinkedInInsight() {
    const partnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID
    if (!partnerId) return
    
    // Set LinkedIn tracking variables with proper typing
    const w = window as Window & { 
      _linkedin_partner_id: string; 
      _linkedin_data_partner_ids: string[] 
    }
    w._linkedin_partner_id = partnerId
    w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || []
    w._linkedin_data_partner_ids.push(partnerId)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  // Track custom events
  public trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) return

    const { action, category, label, value, properties } = event

    if (this.debugMode) {
      console.log('Analytics Event:', { action, category, label, value, properties })
    }

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
        custom_parameters: properties,
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', action, {
        category,
        label,
        value,
        ...properties,
      })
    }
  }

  // Set user properties
  public setUserProperties(properties: UserProperties) {
    if (!this.isInitialized) return

    if (this.debugMode) {
      console.log('User Properties:', properties)
    }

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        user_id: properties.userId,
        custom_map: {
          user_type: properties.userType,
          industry: properties.industry,
          experience: properties.experience,
        },
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'CustomizeProduct', properties)
    }
  }

  // Track page views
  public trackPageView(path: string, title?: string) {
    if (!this.isInitialized) return

    if (this.debugMode) {
      console.log('Page View:', { path, title })
    }

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: path,
        page_title: title || document.title,
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
  }

  // E-commerce tracking
  public trackPurchase(transactionData: {
    transactionId: string
    value: number
    currency: string
    items: Array<{
      itemId: string
      itemName: string
      category: string
      quantity: number
      price: number
    }>
  }) {
    if (!this.isInitialized) return

    const { transactionId, value, currency, items } = transactionData

    if (this.debugMode) {
      console.log('Purchase Event:', transactionData)
    }

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value,
        currency,
        items: items.map(item => ({
          item_id: item.itemId,
          item_name: item.itemName,
          item_category: item.category,
          quantity: item.quantity,
          price: item.price,
        })),
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value,
        currency,
        content_ids: items.map(item => item.itemId),
        content_type: 'product',
      })
    }
  }
}

// Pre-defined tracking events for Dial-a-Met
export const dialAMetEvents = {
  // User Registration
  userRegistration: (userType: 'consultant' | 'client') => ({
    action: 'sign_up',
    category: 'engagement',
    label: userType,
    properties: { method: 'email', user_type: userType },
  }),

  // Profile Actions
  profileComplete: (userType: string) => ({
    action: 'complete_profile',
    category: 'engagement',
    label: userType,
    properties: { user_type: userType },
  }),

  // Project Interactions
  projectView: (projectId: string, category: string) => ({
    action: 'view_project',
    category: 'engagement',
    label: category,
    properties: { project_id: projectId, project_category: category },
  }),

  projectApply: (projectId: string, category: string, bidAmount: number) => ({
    action: 'apply_project',
    category: 'conversion',
    label: category,
    value: bidAmount,
    properties: { project_id: projectId, bid_amount: bidAmount },
  }),

  // Search and Discovery
  search: (query: string, filters?: Record<string, string | number | boolean>) => ({
    action: 'search',
    category: 'engagement',
    label: query,
    properties: { search_term: query, filters },
  }),

  consultantView: (consultantId: string, expertise: string) => ({
    action: 'view_consultant',
    category: 'engagement',
    label: expertise,
    properties: { consultant_id: consultantId, expertise_area: expertise },
  }),

  // Communication
  messageStart: (recipientType: 'consultant' | 'client') => ({
    action: 'start_conversation',
    category: 'engagement',
    label: recipientType,
    properties: { recipient_type: recipientType },
  }),

  // Conversion Events
  proposalSubmit: (projectId: string, proposalValue: number) => ({
    action: 'submit_proposal',
    category: 'conversion',
    label: 'proposal',
    value: proposalValue,
    properties: { project_id: projectId, proposal_value: proposalValue },
  }),

  contractAwarded: (contractId: string, value: number) => ({
    action: 'contract_awarded',
    category: 'conversion',
    label: 'contract',
    value,
    properties: { contract_id: contractId, contract_value: value },
  }),

  // Payment Events
  paymentInitiated: (amount: number, method: string) => ({
    action: 'begin_checkout',
    category: 'ecommerce',
    label: method,
    value: amount,
    properties: { payment_method: method, amount },
  }),

  paymentCompleted: (transactionId: string, amount: number) => ({
    action: 'payment_completed',
    category: 'ecommerce',
    label: 'success',
    value: amount,
    properties: { transaction_id: transactionId, amount },
  }),

  // Feature Usage
  featureUsage: (feature: string, context?: string) => ({
    action: 'use_feature',
    category: 'engagement',
    label: feature,
    properties: { feature_name: feature, context },
  }),

  // Error Tracking
  errorEncountered: (errorType: string, errorMessage: string) => ({
    action: 'error_encountered',
    category: 'error',
    label: errorType,
    properties: { error_message: errorMessage, error_type: errorType },
  }),
}

// Heat mapping and user session recording (simplified)
export class UserBehaviorAnalytics {
  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeHotjar()
      this.initializeFullStory()
    }
  }

  private initializeHotjar() {
    const hjid = process.env.NEXT_PUBLIC_HOTJAR_ID
    if (!hjid) return

    const script = document.createElement('script')
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hjid},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `
    document.head.appendChild(script)
  }

  private initializeFullStory() {
    const orgId = process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID
    if (!orgId) return

    const w = window as unknown as Window & {
      _fs_debug: boolean;
      _fs_host: string;
      _fs_script: string;
      _fs_org: string;
      _fs_namespace: string;
    }
    w._fs_debug = false
    w._fs_host = 'fullstory.com'
    w._fs_script = 'edge.fullstory.com/s/fs.js'
    w._fs_org = orgId
    w._fs_namespace = 'FS'

    const script = document.createElement('script')
    script.src = `https://${w._fs_script}`
    script.async = true
    document.head.appendChild(script)
  }

  public identifyUser(userId: string, properties?: Record<string, string | number | boolean>) {
    const w = window as unknown as { hj?: (...args: unknown[]) => void; FS?: (...args: unknown[]) => void }
    
    // Hotjar
    if (w.hj) {
      w.hj('identify', userId, properties)
    }

    // FullStory
    if (w.FS) {
      w.FS('identify', userId, properties)
    }
  }

  public tagSession(tags: Record<string, string | number | boolean>) {
    const w = window as unknown as { hj?: (...args: unknown[]) => void; FS?: (...args: unknown[]) => void }
    
    // Hotjar
    if (w.hj) {
      Object.entries(tags).forEach(([key, value]) => {
        w.hj!('tag', `${key}:${value}`)
      })
    }

    // FullStory
    if (w.FS) {
      w.FS('setUserVars', tags)
    }
  }
}

// Initialize analytics
export const analytics = new AnalyticsManager()
export const behaviorAnalytics = new UserBehaviorAnalytics()

// Export tracking function for easy use
export function trackEvent(event: AnalyticsEvent) {
  analytics.trackEvent(event)
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
    hj: (...args: unknown[]) => void
    FS: (...args: unknown[]) => void
    _linkedin_partner_id: string
    _linkedin_data_partner_ids: string[]
  }
}

// Image utilities for the Dial-a-Met application
export const getOptimizedImageUrl = (
  baseUrl: string, 
  width: number, 
  height: number, 
  quality: number = 80
): string => {
  // For Unsplash images, use their URL API for optimization
  if (baseUrl.includes('unsplash.com')) {
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&q=${quality}&auto=format`
  }
  
  // For other sources, return as-is
  return baseUrl
}

// Mining-related placeholder images from Unsplash
export const MINING_IMAGES = {
  // Mining operations - Industrial mining site images
  openPit: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', // Large open pit mine
  industrialComplex: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12', // Industrial mining processing plant
  miningEquipment: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', // Heavy industrial machinery
  steelMining: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1', // Steel and mining industrial
  quarryMining: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866', // Large quarry operation
  underground: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866',
  processing: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12',
  equipment: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866',
  industrialMining: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12', // Industrial mining complex
  
  // Minerals and geology
  goldOre: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
  coalMining: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
  ironOre: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce',
  diamonds: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b',
  
  // Environmental and safety
  tailings: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce',
  safety: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b',
  environmental: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce',
  
  // Professional and team
  engineer: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  team: 'https://images.unsplash.com/photo-1494790108755-2616b612b977',
  consultation: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  
  // Technology and mobile
  mobileApp: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  analytics: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  
  // Default fallback
  defaultMining: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
}

// Get category-specific image
export const getCategoryImage = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'Gold & Precious Metals': MINING_IMAGES.goldOre,
    'Coal Mining': MINING_IMAGES.coalMining,
    'Iron Ore & Manganese': MINING_IMAGES.ironOre,
    'Chrome Mining': MINING_IMAGES.processing,
    'Diamond Mining': MINING_IMAGES.diamonds,
    'Environmental Compliance': MINING_IMAGES.environmental,
    'Mineral Processing': MINING_IMAGES.processing,
    'Mine Planning': MINING_IMAGES.openPit,
    'Tailings Management': MINING_IMAGES.tailings,
    'Geological Assessment': MINING_IMAGES.goldOre,
    'Equipment Selection': MINING_IMAGES.equipment,
    'Safety & Compliance': MINING_IMAGES.safety,
  }
  
  return categoryMap[category] || MINING_IMAGES.defaultMining
}

// Professional consultant images
export const CONSULTANT_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  'https://images.unsplash.com/photo-1494790108755-2616b612b977',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296'
]

// Get random consultant avatar
export const getConsultantAvatar = (index: number = 0): string => {
  return CONSULTANT_AVATARS[index % CONSULTANT_AVATARS.length]
}

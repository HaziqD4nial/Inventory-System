import categoryImage from 'figma:asset/0e8740c06ab43773efe28c56f3e8c585accb6854.png';

export interface CategoryDetail {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  color: string;
  bgGradient: string;
  requirements: {
    temperature?: string;
    humidity?: string;
    specialHandling?: string[];
  };
  storageInstructions: string[];
  qualityChecks: string[];
  commonItems: string[];
  averageDeliveryTime: string;
  perishability: 'high' | 'medium' | 'low';
  handlingPriority: 'urgent' | 'high' | 'medium' | 'low';
}

export const categoryDetails: CategoryDetail[] = [
  {
    id: 'frozen-products',
    name: 'Frozen Products',
    description: 'Temperature-sensitive frozen food items requiring immediate cold storage and careful handling',
    icon: '❄️',
    image: categoryImage,
    color: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-100',
    requirements: {
      temperature: '-18°C to -20°C (0°F to -4°F)',
      humidity: 'Low humidity environment',
      specialHandling: [
        'Immediate refrigeration required',
        'Use insulated containers',
        'Monitor temperature continuously',
        'First in, first out rotation'
      ]
    },
    storageInstructions: [
      'Store in designated freezer units immediately',
      'Maintain consistent temperature',
      'Keep packaging sealed until use',
      'Label with date received and expiration'
    ],
    qualityChecks: [
      'Check for ice crystals or freezer burn',
      'Verify packaging integrity',
      'Confirm temperature logs',
      'Inspect for contamination signs'
    ],
    commonItems: ['Frozen meals', 'Ice cream', 'Frozen vegetables', 'Meat products', 'Frozen desserts'],
    averageDeliveryTime: '30-45 minutes',
    perishability: 'high',
    handlingPriority: 'urgent'
  },
  {
    id: 'fresh-produce',
    name: 'Fresh Produce',
    description: 'Fresh fruits and vegetables requiring careful handling and optimal storage conditions',
    icon: '🥬',
    color: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-100',
    requirements: {
      temperature: '1°C to 4°C (34°F to 40°F)',
      humidity: '85-95% relative humidity',
      specialHandling: [
        'Gentle handling to prevent bruising',
        'Separate ethylene producers',
        'Maintain cold chain',
        'Quick processing required'
      ]
    },
    storageInstructions: [
      'Store in refrigerated produce area',
      'Sort by product type and ripeness',
      'Maintain proper air circulation',
      'Remove damaged items immediately'
    ],
    qualityChecks: [
      'Inspect for freshness and color',
      'Check for bruises or damage',
      'Verify proper ripeness',
      'Assess shelf life remaining'
    ],
    commonItems: ['Lettuce', 'Tomatoes', 'Carrots', 'Apples', 'Bananas', 'Herbs'],
    averageDeliveryTime: '45-60 minutes',
    perishability: 'high',
    handlingPriority: 'high'
  },
  {
    id: 'dairy-products',
    name: 'Dairy Products',
    description: 'Milk, cheese, and dairy items requiring refrigerated storage and date monitoring',
    icon: '🥛',
    color: 'from-amber-400 to-yellow-500',
    bgGradient: 'from-amber-50 to-yellow-100',
    requirements: {
      temperature: '1°C to 4°C (34°F to 40°F)',
      humidity: 'Controlled humidity',
      specialHandling: [
        'Keep refrigerated at all times',
        'Check expiration dates carefully',
        'Handle glass containers with care',
        'Maintain sterile conditions'
      ]
    },
    storageInstructions: [
      'Place in dairy refrigeration section',
      'Organize by expiration date',
      'Keep away from strong odors',
      'Maintain consistent temperature'
    ],
    qualityChecks: [
      'Verify expiration dates',
      'Check packaging for leaks',
      'Assess product consistency',
      'Confirm proper temperature'
    ],
    commonItems: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Eggs'],
    averageDeliveryTime: '30-45 minutes',
    perishability: 'medium',
    handlingPriority: 'high'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Liquid refreshments including soft drinks, juices, and specialty beverages',
    icon: '🥤',
    color: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-50 to-indigo-100',
    requirements: {
      temperature: 'Room temperature or refrigerated as specified',
      specialHandling: [
        'Handle glass bottles carefully',
        'Check for carbonation levels',
        'Avoid shaking or dropping',
        'Store upright when possible'
      ]
    },
    storageInstructions: [
      'Sort by beverage type',
      'Store according to temperature requirements',
      'Keep away from direct sunlight',
      'Maintain proper inventory rotation'
    ],
    qualityChecks: [
      'Inspect containers for damage',
      'Check carbonation if applicable',
      'Verify expiration dates',
      'Assess clarity and color'
    ],
    commonItems: ['Soft drinks', 'Juices', 'Water bottles', 'Energy drinks', 'Coffee', 'Tea'],
    averageDeliveryTime: '45-60 minutes',
    perishability: 'low',
    handlingPriority: 'medium'
  },
  {
    id: 'dry-goods',
    name: 'Dry Goods',
    description: 'Non-perishable items including grains, canned goods, and packaged products',
    icon: '📦',
    color: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-100',
    requirements: {
      temperature: 'Room temperature (15°C to 25°C)',
      humidity: 'Low humidity to prevent spoilage',
      specialHandling: [
        'Check packaging integrity',
        'Protect from moisture',
        'Handle heavy items safely',
        'Organize by category'
      ]
    },
    storageInstructions: [
      'Store in dry, cool environment',
      'Stack items safely',
      'Rotate stock using FIFO method',
      'Keep away from moisture sources'
    ],
    qualityChecks: [
      'Inspect packaging for tears',
      'Check for pest activity',
      'Verify expiration dates',
      'Assess structural integrity'
    ],
    commonItems: ['Canned goods', 'Rice', 'Pasta', 'Flour', 'Spices', 'Snacks'],
    averageDeliveryTime: '60-90 minutes',
    perishability: 'low',
    handlingPriority: 'low'
  },
  {
    id: 'cleaning-supplies',
    name: 'Cleaning Supplies',
    description: 'Sanitation and cleaning products requiring safe handling and proper storage',
    icon: '🧽',
    color: 'from-teal-500 to-cyan-600',
    bgGradient: 'from-teal-50 to-cyan-100',
    requirements: {
      temperature: 'Room temperature',
      specialHandling: [
        'Handle chemicals with care',
        'Ensure proper ventilation',
        'Check for leaks or spills',
        'Use protective equipment'
      ]
    },
    storageInstructions: [
      'Store in designated chemical area',
      'Keep away from food items',
      'Ensure proper ventilation',
      'Maintain safety data sheets'
    ],
    qualityChecks: [
      'Inspect containers for leaks',
      'Verify chemical concentrations',
      'Check safety labels',
      'Assess packaging integrity'
    ],
    commonItems: ['Disinfectants', 'Detergents', 'Paper towels', 'Sanitizers', 'Floor cleaners'],
    averageDeliveryTime: '45-75 minutes',
    perishability: 'low',
    handlingPriority: 'medium'
  }
];

export function getCategoryById(id: string): CategoryDetail | undefined {
  return categoryDetails.find(category => category.id === id);
}

export function getCategoriesByPriority(priority: CategoryDetail['handlingPriority']): CategoryDetail[] {
  return categoryDetails.filter(category => category.handlingPriority === priority);
}
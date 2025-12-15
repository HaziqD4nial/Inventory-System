import { Product } from '../types';

export const products: Product[] = [
  // Main Dishes
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTkyNjI2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'mains',
    available: true,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on crispy crust',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1705079895550-60f462c08461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1hcmdoZXJpdGElMjBmb29kfGVufDF8fHx8MTc1OTIwMjg5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'mains',
    available: true,
  },
  {
    id: '3',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, parmesan cheese, and black pepper',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGRpc2h8ZW58MXx8fHwxNzU5Mjc1NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'mains',
    available: true,
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and caesar dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1739436776460-35f309e3f887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc1OTIzMDI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'salads',
    available: true,
  },
  
  // Beverages
  {
    id: '5',
    name: 'Espresso',
    description: 'Rich and bold Italian coffee shot',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1655655025180-4cbd1faddd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGRyaW5rfGVufDF8fHx8MTc1OTMwNDA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'beverages',
    available: true,
  },
  {
    id: '6',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice with pulp',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1707569517904-92b134ff5f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlfGVufDF8fHx8MTc1OTIyMjQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'beverages',
    available: true,
  },
  {
    id: '7',
    name: 'Sparkling Water',
    description: 'Refreshing sparkling mineral water',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1707569517904-92b134ff5f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlfGVufDF8fHx8MTc1OTIyMjQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'beverages',
    available: true,
  },
  
  // Desserts
  {
    id: '8',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with dark chocolate ganache',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NTkyMTM2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'desserts',
    available: true,
  },
  {
    id: '9',
    name: 'Vanilla Ice Cream',
    description: 'Creamy vanilla ice cream with chocolate chips',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1729462043494-dda667c69fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHZhbmlsbGF8ZW58MXx8fHwxNzU5MzA0MDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'desserts',
    available: true,
  },
  {
    id: '10',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NTkyMTM2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'desserts',
    available: true,
  },
];

export const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'mains', name: 'Main Dishes', icon: '🍝' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];
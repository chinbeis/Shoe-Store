export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max 270',
    brand: 'Nike',
    category: 'Running',
    price: 129.99,
    originalPrice: 159.99,
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red'],
    description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
    features: ['Air Max cushioning', 'Breathable mesh upper', 'Durable rubber outsole'],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isSale: true
  },
  {
    id: '2',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    category: 'Running',
    price: 189.99,
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Blue'],
    description: 'Experience endless energy with Ultraboost 22 running shoes.',
    features: ['Boost midsole', 'Primeknit upper', 'Continental rubber outsole'],
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    category: 'Casual',
    price: 59.99,
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
    colors: ['Black', 'White', 'Red', 'Navy'],
    description: 'The iconic Chuck Taylor All Star sneaker.',
    features: ['Canvas upper', 'Rubber toe cap', 'Classic design'],
    rating: 4.3,
    reviewCount: 256,
    inStock: true
  },
  {
    id: '4',
    name: 'Air Jordan 1 Mid',
    brand: 'Nike',
    category: 'Basketball',
    price: 119.99,
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Black', 'Royal Blue'],
    description: 'Inspired by the original AJ1, offering classic style.',
    features: ['Leather upper', 'Air-Sole unit', 'Rubber outsole'],
    rating: 4.6,
    reviewCount: 189,
    inStock: true
  },
  {
    id: '5',
    name: 'Classic Leather',
    brand: 'Reebok',
    category: 'Casual',
    price: 74.99,
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Navy'],
    description: 'Timeless style meets modern comfort.',
    features: ['Leather upper', 'EVA midsole', 'Rubber outsole'],
    rating: 4.2,
    reviewCount: 67,
    inStock: true
  },
  {
    id: '6',
    name: 'Fresh Foam X 1080v12',
    brand: 'New Balance',
    category: 'Running',
    price: 149.99,
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Gray'],
    description: 'Maximum cushioning for long-distance running.',
    features: ['Fresh Foam X midsole', 'Hypoknit upper', 'Blown rubber outsole'],
    rating: 4.4,
    reviewCount: 112,
    inStock: true
  }
];

export const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Converse'];
export const categories = ['Running', 'Basketball', 'Casual', 'Formal', 'Sneakers'];
export const sizes = ['6', '7', '8', '9', '10', '11', '12', '13'];
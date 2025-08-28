'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  category: string;
  brand: string;
  size: string;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    brand: '',
    size: ''
  });

  const categories = ['Бүгд', 'Гүйлтийн', 'Сагсны', 'Өдөр тутмын', 'Албан', 'Пүүз'];
  const brands = ['Бүгд', 'Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Converse'];
  const sizes = ['Бүгд', '6', '7', '8', '9', '10', '11', '12', '13'];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, filters);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top bar with logo and navigation */}
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-gray-500 transition-colors text-sm font-medium py-2">
              Нүүр
            </Link>
            <Link href="/products" className="text-gray-900 hover:text-gray-500 transition-colors text-sm font-medium py-2">
              Шинэ бүтээгдэхүүн
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-gray-500 transition-colors text-sm font-medium py-2">
              Холбоо барих
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-900 hover:text-gray-500 transition-colors"
            >
              <Search size={20} />
            </button>
            
            <Link href="/cart" className="relative p-2 text-gray-900 hover:text-gray-500 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-900 hover:text-gray-500"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Бүтээгдэхүүн хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 p-2 text-gray-900 hover:text-gray-500"
                >
                  <Search size={20} />
                </button>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 p-2 text-gray-900 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm font-medium text-gray-700">Шүүлтүүр:</span>
                
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'Бүгд' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand === 'Бүгд' ? '' : brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.size}
                  onChange={(e) => setFilters({...filters, size: e.target.value})}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                >
                  {sizes.map(size => (
                    <option key={size} value={size === 'Бүгд' ? '' : size}>
                      Хэмжээ {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link href="/" className="block py-2 text-gray-900 hover:text-gray-500">
              Нүүр
            </Link>
            <Link href="/products" className="block py-2 text-gray-900 hover:text-gray-500">
              Шинэ бүтээгдэхүүн
            </Link>
            <Link href="/contact" className="block py-2 text-gray-900 hover:text-gray-500">
              Холбоо барих
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
  searchQuery?: string;
  categoryFilter?: string;
  brandFilter?: string;
  sizeFilter?: string;
}

export default function ProductGrid({ 
  products, 
  searchQuery = '', 
  categoryFilter = '', 
  brandFilter = '', 
  sizeFilter = '' 
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      const matchesBrand = brandFilter === '' || product.brand === brandFilter;
      const matchesSize = sizeFilter === '' || product.sizes.includes(sizeFilter);
      
      return matchesSearch && matchesCategory && matchesBrand && matchesSize;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, searchQuery, categoryFilter, brandFilter, sizeFilter, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Results header and sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `"${searchQuery}" хайлтын үр дүн` : 'Бүх бүтээгдэхүүн'}
          </h2>
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} бүтээгдэхүүн олдлоо
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Нэрээр эрэмбэлэх</option>
            <option value="price">Үнээр эрэмбэлэх</option>
            <option value="rating">Үнэлгээгээр эрэмбэлэх</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      {/* Active filters */}
      {(categoryFilter || brandFilter || sizeFilter) && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Идэвхтэй шүүлтүүр:</span>
          {categoryFilter && (
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Ангилал: {categoryFilter}
            </span>
          )}
          {brandFilter && (
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Брэнд: {brandFilter}
            </span>
          )}
          {sizeFilter && (
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Хэмжээ: {sizeFilter}
            </span>
          )}
        </div>
      )}
      
      {/* Products grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👟</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Бүтээгдэхүүн олдсонгүй</h3>
          <p className="text-gray-600">Хайлт эсвэл шүүлтүүрийн шалгуураа тохируулна уу</p>
        </div>
      )}
    </div>
  );
}
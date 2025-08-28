'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { mockProducts, categories, sizes } from '../data/products';
import { Search, Filter, X } from 'lucide-react';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearAllFilters = () => {
    setCategoryFilter('');
    setSizeFilter('');
    setSearchQuery('');
  };

  const activeFiltersCount = (categoryFilter ? 1 : 0) + (sizeFilter ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Clean Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium text-black mb-4">
            Бүтээгдэхүүн
          </h1>
          <p className="text-lg text-gray-800 font-normal">
            {mockProducts.length} бүтээгдэхүүн
          </p>
        </div>
        
        {/* Minimal Search and Filter */}
        <div className="mb-12">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            {/* Clean Search */}
            <form onSubmit={handleSearch} className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-black outline-none transition-colors bg-transparent text-black"
              />
              <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
            
            {/* Filter Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-black transition-colors text-black"
            >
              <Filter size={16} />
              <span>Шүүлтүүр</span>
              {activeFiltersCount > 0 && (
                <span className="bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Simple Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-4">Ангилал</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setCategoryFilter('')}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        categoryFilter === '' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 text-black hover:border-gray-400'
                      }`}
                    >
                      Бүгд
                    </button>
                    {categories.map(category => (
                      <button 
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-4 py-2 text-sm border transition-colors ${
                          categoryFilter === category 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-300 text-black hover:border-gray-400'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Size Filter */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-4">Хэмжээ</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSizeFilter('')}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        sizeFilter === '' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 text-black hover:border-gray-400'
                      }`}
                    >
                      Бүгд
                    </button>
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSizeFilter(size)}
                        className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors ${
                          sizeFilter === size 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-300 text-black hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {activeFiltersCount > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-600 hover:text-black underline"
                  >
                    Бүх шүүлтүүрийг арилгах
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Active Filters */}
          {(categoryFilter || sizeFilter) && (
            <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gray-200">
              {categoryFilter && (
                <span className="flex items-center gap-2 text-sm text-black">
                  Ангилал: {categoryFilter}
                  <button 
                    onClick={() => setCategoryFilter('')}
                    className="text-gray-400 hover:text-black"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {sizeFilter && (
                <span className="flex items-center gap-2 text-sm text-black">
                  Хэмжээ: {sizeFilter}
                  <button 
                    onClick={() => setSizeFilter('')}
                    className="text-gray-400 hover:text-black"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Products Grid */}
        <ProductGrid 
          products={mockProducts}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          sizeFilter={sizeFilter}
        />
      </main>
      
      <Footer />
    </div>
  );
}
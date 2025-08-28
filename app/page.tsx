'use client';

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { mockProducts } from './data/products';
import Link from 'next/link';

interface SearchFilters {
  category: string;
  brand: string;
  size: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    brand: '',
    size: ''
  });

  const handleSearch = (query: string, searchFilters: SearchFilters) => {
    setSearchQuery(query);
    setFilters(searchFilters);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Ангилалаар дэлгүүрлэх</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Гүйлтийн', 'Сагсны', 'Өдөр тутмын', 'Албан'].map(category => (
              <Link key={category} href={`/category/${category.toLowerCase()}`} className="group">
                <div className="aspect-square bg-gray-100 mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors">
                      {category}
                    </span>
                  </div>
                </div>
                <h3 className="text-gray-900 font-medium group-hover:underline">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Онцлох бүтээгдэхүүн</h2>
            <Link href="/products" className="text-black hover:underline font-medium">
              Бүгдийг харах
            </Link>
          </div>
          
          <ProductGrid 
            products={mockProducts.slice(0, 4)}
            searchQuery={searchQuery}
            categoryFilter={filters.category}
            brandFilter={filters.brand}
            sizeFilter={filters.size}
          />
        </div>
      </section>
      
      {/* Brand Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Шилдэг брэндүүд</h2>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Converse'].map(brand => (
              <Link key={brand} href={`/brands/${brand.toLowerCase()}`} className="group">
                <div className="aspect-square bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:border-black transition-colors">
                  <span className="text-xl font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                    {brand}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="bg-gray-50 text-black py-16 relative overflow-hidden border-t border-b border-gray-200">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-black"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-black"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-black"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:flex items-center justify-between">
            <div className="md:w-3/5 md:pr-8 md:text-left text-center mb-8 md:mb-0">
              <span className="inline-block px-4 py-1 bg-gray-200 rounded-full text-sm font-medium mb-4">
                ОНЦГОЙ БОЛОМЖ
              </span>
              <h2 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
                Манай гишүүнчлэлийн хөтөлбөрт нэгдээрэй
              </h2>
              <p className="text-gray-600 text-lg max-w-xl">
                Үнэгүй бүртгүүлээд онцгой санал, бүтээгдэхүүний эртээдрийн гаргалт болон бусад зүйлсийг авах боломжтой.
              </p>
            </div>
            
            <div className="md:w-2/5 bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Одоо нэгдэх</h3>
              <div className="mb-4">
                <input 
                  type="email" 
                  placeholder="И-мэйл хаяг" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 mb-3"
                />
                <Link 
                  href="/membership" 
                  className="block w-full bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Бүртгүүлэх
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Бүртгүүлснээр та манай <Link href="/terms" className="underline">үйлчилгээний нөхцөл</Link> болон <Link href="/privacy" className="underline">нууцлалын бодлого</Link>-г хүлээн зөвшөөрч байна.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

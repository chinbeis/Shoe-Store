'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Removed unused supabase import
import { mockProducts, Product } from '../../data/products';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  
  useEffect(() => {
    if (id) {
      fetchProduct(id as string);
    }
  }, [id]);
  
  async function fetchProduct(productId: string) {
    try {
      setLoading(true);
      // In a real implementation, this would fetch from Supabase
      // For now, we'll use the mock data
      const foundProduct = mockProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
        if (foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-12">
            <p>Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-12">
            <h1 className="text-3xl font-medium text-black mb-4">Product Not Found</h1>
            <p>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image 
                src={selectedImage} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button 
                onClick={() => setSelectedImage(product.image)}
                className={`w-20 h-20 rounded-md overflow-hidden relative ${selectedImage === product.image ? 'ring-2 ring-black' : 'opacity-70'}`}
              >
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
              
              {product.images.map((img: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-md overflow-hidden relative ${selectedImage === img ? 'ring-2 ring-black' : 'opacity-70'}`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} ${index + 1}`} 
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-medium text-black">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star 
                      key={index} 
                      size={18} 
                      className={index < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.reviewCount} reviews</span>
              </div>
            </div>
            
            <div className="text-2xl font-medium">
              ${product.price.toFixed(2)}
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Brand & Category */}
            <div className="flex space-x-4 text-sm">
              <div>
                <span className="text-gray-500">Brand:</span>
                <span className="ml-1 font-medium">{product.brand}</span>
              </div>
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-1 font-medium">{product.category}</span>
              </div>
            </div>
            
            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Colors</h3>
              <div className="flex space-x-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedColor === color ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                <button className="text-sm text-gray-500 underline">Size Guide</button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-center rounded-md text-sm font-medium ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Features */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Add to Cart */}
            <button 
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              disabled={!selectedSize}
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group">
      <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        {(product.isNew || (product.isSale && discountPercentage > 0)) && (
          <div className="absolute top-2 left-2">
            {product.isNew && (
              <span className="inline-block bg-black text-white text-xs px-2 py-1 mb-1">
                Шинэ
              </span>
            )}
            {product.isSale && discountPercentage > 0 && (
              <span className="inline-block bg-red-600 text-white text-xs px-2 py-1">
                -{discountPercentage}%
              </span>
            )}
          </div>
        )}
        
        {/* Wishlist button */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={16} className="text-gray-900" />
        </button>
        
        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 text-white text-center py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300">
          <button className="text-sm font-medium">Сагсанд нэмэх</button>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 group-hover:underline">
              {product.name}
            </h3>
          </Link>
          <div className="text-sm font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">{product.category}</div>
          {product.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </div>
          )}
        </div>
        
        {/* Color options preview */}
        <div className="mt-2 flex space-x-1">
          {product.colors.slice(0, 3).map((color, index) => (
            <div 
              key={index} 
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color.toLowerCase() }}
            ></div>
          ))}
          {product.colors.length > 3 && (
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-600">
              +{product.colors.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
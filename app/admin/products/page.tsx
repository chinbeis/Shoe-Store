'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import server actions instead of direct DB access
import { getProducts, deleteProductById } from '../../actions/products';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number | string; // Accept either type
  image: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      // Use the server action instead
      const { products, error } = await getProducts();
      if (error) {
        console.error(error);
        return;
      }
      setProducts(products as Product[]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      // Use the server action instead
      const { success, error } = await deleteProductById(id);
      if (error) {
        console.error(error);
        return;
      }
      if (success) {
        // Refresh the product list
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-black">
            Products
          </h1>
          <Link href="/admin/products/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800">
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No products found</p>
            <Link href="/admin/products/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800">
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id}>
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-black">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.brand} · {product.category}</p>
                        </div>
                        <div className="text-lg font-medium text-black">
                          {/* Fix the price display in the JSX */}
                          {/* Change this line: */}
                          {/* ${product.price.toFixed(2)} */}
                          {/* To: */}
                          {/* ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)} */}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <Link href={`/admin/products/edit/${product.id}`} className="mr-2 p-2 text-gray-400 hover:text-gray-500">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
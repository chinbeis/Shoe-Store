'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium text-black mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-800 font-normal">
            Manage your shoe store products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link href="/admin/products" className="bg-gray-100 hover:bg-gray-200 p-8 rounded-xl transition-colors">
            <h2 className="text-2xl font-medium mb-2">Manage Products</h2>
            <p className="text-gray-600">Add, edit, or delete shoe products</p>
          </Link>
          
          <Link href="/admin/orders" className="bg-gray-100 hover:bg-gray-200 p-8 rounded-xl transition-colors">
            <h2 className="text-2xl font-medium mb-2">Manage Orders</h2>
            <p className="text-gray-600">View and manage customer orders</p>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
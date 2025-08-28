import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Үндсэн хуудсууд</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Нүүр хуудас
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Бүтээгдэхүүн
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Холбоо барих
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Дэмжлэг</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Хүргэлт
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Буцаалт
                </Link>
              </li>
              <li>
                <Link href="/order-status" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Захиалгын төлөв
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Манай мэдээллийн товхимолд бүртгүүлэх</h3>
            <p className="text-gray-400 text-sm mb-4">
              Бүтээгдэхүүний шинэчлэлт болон онцгой санал хүлээн авахын тулд манай мэдээллийн товхимолд бүртгүүлээрэй.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="И-мэйл хаяг"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white text-sm"
              />
              <button className="px-4 py-2 bg-white text-black rounded-r-md hover:bg-gray-200 transition-colors text-sm font-medium">
                Нэгдэх
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full">
              <Youtube size={18} />
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs">
            <p className="text-gray-400">
              © 2024 ShoeStore, Inc. Бүх эрх хуулиар хамгаалагдсан
            </p>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Ашиглах нөхцөл
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Нууцлалын бодлого
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
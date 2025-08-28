import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gray-100 text-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 space-y-8">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider">Шинэ цуглуулга</span>
              <h1 className="text-5xl sm:text-6xl font-bold mt-2 leading-tight">
                Зүгээр л хий
                <span className="block">Өөрийн аргаар</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-lg">
              Бүх төрлийн үйл явдалд зориулсан манай чанарын гутлын цуглуулгыг нээгээрэй.
              Гүйцэтгэлд зориулж бүтээгдсэн, загварт зориулж дизайн хийгдсэн.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors text-center"
              >
                Одоо худалдаж авах
              </Link>
              <Link
                href="/collections"
                className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg border border-black hover:bg-gray-100 transition-colors text-center"
              >
                Цуглуулгыг судлах
              </Link>
            </div>
          </div>
          
          <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-200 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-30deg]">
                  <Image 
                    src="/hero/hero.jpg" 
                    alt="Featured Shoe" 
                    width={600} 
                    height={400}
                    className="rounded-3xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-400 to-black"></div>
    </section>
  );
}
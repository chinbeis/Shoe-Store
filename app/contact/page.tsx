'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm mb-4">
            <MessageCircle size={16} className="mr-2" />
            24/7 Тусламж
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Бидэнтэй <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black">холбогдох</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Бидний бүтээгдэхүүн, үйлчилгээний талаар асуух зүйл байна уу? Манай мэргэжлийн баг танд тусламж үзүүлэхэд бэлэн байна.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Quick Contact Cards */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl w-fit mb-4">
              <Phone size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Утасаар холбогдох</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">+976 (99) 123-4567</p>
            <p className="text-gray-500 text-sm flex items-center">
              <Clock size={14} className="mr-1" />
              Даваа-Баасан 8:00-18:00
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl w-fit mb-4">
              <Mail size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">И-мэйл илгээх</h3>
            <p className="text-lg font-semibold text-gray-900 mb-1">support@shoestore.com</p>
            <p className="text-gray-500 text-sm">24 цагийн дотор хариу өгнө</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl w-fit mb-4">
              <MapPin size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Дэлгүүр очих</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              123 Гутлын гудамж<br />
              Хувцасны дүүрэг, УБ 10001
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Бидэнд мессеж илгээх</h2>
              <p className="text-gray-600">Таны асуулт, саналыг бид анхааралтайгаар хүлээн авч, хариулах болно.</p>
            </div>
            
            {submitSuccess ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl relative mb-6 shadow-sm" role="alert">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <p className="font-semibold">Мессеж амжилттай илгээгдлээ!</p>
                    <p className="text-sm">Бид тантай 24 цагийн дотор холбогдох болно.</p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Таны нэр *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Нэрээ оруулна уу"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    И-мэйл хаяг *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Сэдэв *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                >
                  <option value="">Сэдэв сонгоно уу</option>
                  <option value="order">📦 Захиалгын лавлагаа</option>
                  <option value="product">👟 Бүтээгдэхүүний мэдээлэл</option>
                  <option value="return">🔄 Буцаалт ба солилцоо</option>
                  <option value="support">🎧 Техникийн тусламж</option>
                  <option value="partnership">🤝 Хамтын ажиллагаа</option>
                  <option value="other">💬 Бусад</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Мессеж *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Таны мессежийг энд бичнэ үү..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 px-6 rounded-xl hover:from-black hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Илгээж байна...
                  </span>
                ) : (
                  <span className="flex items-center justify-center font-semibold">
                    <Send size={18} className="mr-2" />
                    Мессеж илгээх
                  </span>
                )}
              </button>
            </form>
          </div>
          
          {/* Map and Location Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Дэлгүүрийн байршил</h2>
              
              {/* Interactive Map */}
              <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.8477!2d106.9057307!3d47.9184676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA2LjUiTiAxMDbCsDU0JzIwLjYiRQ!5e0!3m2!1sen!2smn!4v1620000000000!5m2!1sen!2smn"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
                <div className="absolute top-4 right-4">
                  <a
                    href="https://maps.app.goo.gl/CezSXSHsv1CZXicL9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <MapPin size={16} className="mr-1" />
                    Том харах
                  </a>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl">
                    <MapPin size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Хаяг</h3>
                    <p className="text-gray-600 leading-relaxed">
                      123 Гутлын гудамж<br />
                      Хувцасны дүүрэг, УБ 10001<br />
                      Монгол улс
                    </p>
                    <a
                      href="https://maps.app.goo.gl/CezSXSHsv1CZXicL9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Газрын зураг дээр харах
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl">
                    <Clock size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ажлын цаг</h3>
                    <div className="space-y-1 text-gray-600">
                      <p className="flex justify-between">
                        <span>Даваа - Баасан:</span>
                        <span className="font-medium">8:00 - 18:00</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Бямба гариг:</span>
                        <span className="font-medium">9:00 - 17:00</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Ням гариг:</span>
                        <span className="font-medium text-red-600">Амардаг</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Яагаад биднийг сонгох ёстой вэ?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Чанартай бүтээгдэхүүн
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Хурдан хүргэлт
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  24/7 үйлчлүүлэгчийн тусламж
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
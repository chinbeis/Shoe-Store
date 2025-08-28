'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { categories, sizes, brands } from '../../../data/products';
import { Upload, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

// Import the server action instead of direct DB access
import { createProduct } from '../../../actions/products';

// Import the storage utilities
// Replace this line:
// import { uploadFile } from '../../../utils/supabase/storage';

// With this:
import { uploadFile } from '../../../utils/blob-storage';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    description: '',
    features: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAdditionalImageFiles(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const addColor = () => {
    if (colorInput && !selectedColors.includes(colorInput)) {
      setSelectedColors(prev => [...prev, colorInput]);
      setColorInput('');
    }
  };

  const removeColor = (color: string) => {
    setSelectedColors(prev => prev.filter(c => c !== color));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Creating product...');
      
      // Log form data instead of productData which doesn't exist yet
      console.log('Starting product creation with form data:', {
        ...formData,
        sizes: selectedSizes,
        colors: selectedColors
      });
      
      // Upload the main image to Supabase Storage
      let mainImageUrl = '';
      if (mainImageFile) {
        try {
          console.log('Processing main image, size:', mainImageFile.size);
          mainImageUrl = await uploadFile(mainImageFile);
          console.log('Main image processed, data URL length:', mainImageUrl.length);
        } catch (error) {
          console.error('Error uploading main image:', error);
          toast.dismiss(loadingToast);
          toast.error(`Failed to upload main image: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setLoading(false);
          return;
        }
      }
      
      // Inside the handleSubmit function, update how images are processed
      
      // Upload additional images to Supabase Storage
      const additionalImageUrls = [];
      for (const file of additionalImageFiles) {
        try {
          const url = await uploadFile(file);
          console.log('Additional image uploaded:', url); // Log for debugging
          
          // Ensure the URL is a clean string
          additionalImageUrls.push(String(url));
        } catch (error) {
          console.error('Error uploading additional image:', error);
          toast.error(`Failed to upload an additional image: ${error instanceof Error ? error.message : 'Unknown error'}`);
          // Continue with other images
        }
      }
      
      // Create the product data object with camelCase field names
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: formData.price, 
        description: formData.description,
        features: formData.features.split('\n')
          .map(f => f.trim())
          .filter(f => f !== ''),
        image: mainImageUrl ? String(mainImageUrl).trim() : '', 
        images: additionalImageUrls.length > 0 ? 
          additionalImageUrls.map(url => String(url).trim()) : 
          [], 
        sizes: selectedSizes,
        colors: selectedColors,
        rating: '0', 
        // Use camelCase field names to match the schema
        reviewCount: 0,
        inStock: true,
        isNew: true,
      };
      
      // Use the server action instead of direct DB access
      const { product, error } = await createProduct(productData);
      
      if (error) {
        toast.dismiss(loadingToast);
        toast.error(`Error: ${error}`);
        throw new Error(error);
      }
      
      console.log('Product created:', product);
      toast.dismiss(loadingToast);
      toast.success('Product created successfully!');
      
      // Redirect to the products admin page
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(`Error creating product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-black mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Fill in the details to create a new shoe product
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Description and Features */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Description & Features</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter each feature on a new line"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Product Images</h2>
            
            <div className="space-y-6">
              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Product Image *
                </label>
                
                {mainImagePreview ? (
                  <div className="relative w-40 h-40 border border-gray-300 rounded-md overflow-hidden">
                    <Image 
                      src={mainImagePreview || '/placeholder.jpg'} 
                      alt="Main product preview" 
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMainImageFile(null);
                        setMainImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload image</span>
                  </div>
                )}
              </div>
              
              {/* Additional Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images
                </label>
                
                <div className="flex flex-wrap gap-3">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                      <Image 
                        src={preview} 
                        alt={`Additional image ${index + 1}`} 
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <div
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        // Convert the regular Event to unknown first, then to the React type
                        const event = e as unknown as React.ChangeEvent<HTMLInputElement>;
                        handleAdditionalImageChange(event);
                      };
                      input.click();
                    }}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Plus size={24} className="text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Add image</span>
                  </div>
                </div>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleMainImageChange}
                accept="image/*"
                className="hidden"
                required={!mainImageFile}
              />
            </div>
          </div>
          
          {/* Sizes and Colors */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Sizes & Colors</h2>
            
            <div className="space-y-6">
              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes *
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        selectedSizes.includes(size)
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                {selectedSizes.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">Please select at least one size</p>
                )}
              </div>
              
              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Colors *
                </label>
                
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder="Enter color name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedColors.map(color => (
                    <div 
                      key={color} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center space-x-1"
                    >
                      <span>{color}</span>
                      <button 
                        type="button" 
                        onClick={() => removeColor(color)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                {selectedColors.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">Please add at least one color</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || selectedSizes.length === 0 || selectedColors.length === 0}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Product...' : 'Create Product'}
            </button>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { categories, brands } from '../../../../data/products';
import { db } from '../../../../db';
import { products } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { uploadFile, deleteFile } from '../../../../utils/supabase/storage';

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    description: '',
    features: '',
  });

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  async function fetchProduct() {
    try {
      setLoadingProduct(true);
      const result = await db.select().from(products).where(eq(products.id, params.id));

      if (!result || result.length === 0) {
        alert('Product not found');
        router.push('/admin/products');
        return;
      }

      const product = result[0];
      setFormData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        features: Array.isArray(product.features) ? product.features.join('\n') : '',
      });

      setMainImagePreview(product.image);
      setAdditionalImagePreviews(product.images || []);
      setSelectedSizes(product.sizes || []);
      setSelectedColors(product.colors || []);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert(`Error fetching product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoadingProduct(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
      setMainImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setAdditionalImageFiles(prev => [...prev, ...files]);
      setAdditionalImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch current product
      const [currentProduct] = await db.select().from(products).where(eq(products.id, params.id));
      if (!currentProduct) {
        alert('Product not found');
        return;
      }

      // Handle main image upload
      let mainImageUrl = mainImagePreview || '';
      if (mainImageFile) {
        mainImageUrl = await uploadFile(mainImageFile);
        if (currentProduct.image) {
          try { await deleteFile(currentProduct.image); } catch (err) { console.error(err); }
        }
      }

      // Handle additional images
      const additionalImageUrls = [...additionalImagePreviews];
      for (const file of additionalImageFiles) {
        const url = await uploadFile(file);
        additionalImageUrls.push(url);
      }

      // Prepare data
      const featuresArray = formData.features.split('\n').map(f => f.trim()).filter(f => f !== '');
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: formData.price, // string to match schema
        description: formData.description,
        features: featuresArray,
        image: mainImageUrl,
        images: additionalImageUrls,
        sizes: selectedSizes,
        colors: selectedColors,
      };

      // Update main fields
      await db.update(products)
        .set({
          name: productData.name,
          brand: productData.brand,
          category: productData.category,
          price: productData.price,
          description: productData.description,
          image: productData.image,
        })
        .where(eq(products.id, params.id));

      // Update array fields separately
      await db.update(products)
        .set({
          features: productData.features,
          images: productData.images,
          sizes: productData.sizes,
          colors: productData.colors,
        })
        .where(eq(products.id, params.id));

      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`Error updating product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-center text-gray-500">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-medium mb-2">Edit Product</h1>
        <p className="text-gray-600 mb-8">Update the product details</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Product Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">Price ($) *</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium mb-1">Brand *</label>
              <select id="brand" name="brand" value={formData.brand} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md">
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category *</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description & Features */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full px-3 py-2 border rounded-md" />

            <label htmlFor="features" className="block text-sm font-medium mt-4 mb-1">Features (one per line)</label>
            <textarea id="features" name="features" value={formData.features} onChange={handleChange} rows={4} className="w-full px-3 py-2 border rounded-md" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded-md">{loading ? 'Updating...' : 'Update Product'}</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

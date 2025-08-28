/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { db, withRetry } from '../db';
import { products as productsTable } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
// Keep supabaseAdmin import as it might be used in other parts of the file
import { supabaseAdmin } from '../utils/supabase/server';

export async function getProducts() {
  try {
    const result = await db.select().from(productsTable);
    return { products: result, error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], error: 'Failed to fetch products' };
  }
}

export async function deleteProductById(id: string) {
  try {
    // Get the product to delete its images (if needed)
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    
    if (product) {
      // Delete the product from the database
      await db.delete(productsTable).where(eq(productsTable.id, id));
      return { success: true, error: null };
    }
    return { success: false, error: 'Product not found' };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

// Define an interface for the product data with camelCase field names
interface ProductData {
  name: string;
  brand: string;
  category: string;
  price: string; // Using string for decimal type
  description: string;
  features: string[];
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating?: string; // Optional as it has a default value
  reviewCount?: number; // Use camelCase to match schema
  inStock?: boolean; // Use camelCase to match schema
  isNew?: boolean; // Use camelCase to match schema
}

export async function createProduct(productData: ProductData) {
  try {
    // Step 1: Insert basic product data WITHOUT the image and arrays
    const insertResult = await withRetry(async () => {
      return db.insert(productsTable).values({
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        price: productData.price,
        description: productData.description,
        // Skip image here
        rating: productData.rating || '0',
        reviewCount: productData.reviewCount || 0,
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        isNew: productData.isNew !== undefined ? productData.isNew : true
      }).returning({ id: productsTable.id });
    }, 3, 3000); // Fewer retries with longer initial delay
    
    if (!insertResult || insertResult.length === 0) {
      throw new Error('Failed to insert product');
    }
    
    const productId = insertResult[0].id;
    
    // Step 2: Update image separately
    if (productData.image) {
      await withRetry(async () => {
        return db.execute(sql`
          UPDATE products 
          SET image = ${String(productData.image).replace(/`/g, '')}
          WHERE id = ${productId}
        `);
      }, 3, 3000);
    }
    
    // Step 3: Update arrays separately
    await withRetry(async () => {
      return db.execute(sql`
        UPDATE products 
        SET 
          features = ${Array.isArray(productData.features) ? productData.features : []},
          images = ${Array.isArray(productData.images) ? 
            productData.images.map(img => String(img).replace(/`/g, '')) : 
            []},
          sizes = ${Array.isArray(productData.sizes) ? productData.sizes : []},
          colors = ${Array.isArray(productData.colors) ? productData.colors : []}
        WHERE id = ${productId}
      `);
    }, 3, 3000);
    
    // Step 4: Get the updated product
    const updatedProduct = await withRetry(async () => {
      const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId));
      return product;
    }, 3, 3000);
    
    return { product: updatedProduct, error: null };
  } // In the catch block of createProduct function
  catch (error) {
    console.error('Error creating product:', error);
    // Add more detailed error information
    const errorMessage = error instanceof Error ? 
      `${error.message} (${error.name})` : 
      'Unknown error';
    return { product: null, error: errorMessage };
  }
}
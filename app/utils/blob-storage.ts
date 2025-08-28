import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

/**
 * Converts a File object to a data URL string with compression
 * @param file The file to convert
 * @param maxWidth Maximum width for image compression
 * @returns Promise with the data URL
 */
export async function fileToDataUrl(file: File, maxWidth = 400): Promise<string> {
  // For non-image files, use a simple data URL
  if (!file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // For images, compress them before converting to data URL
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress the image
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to data URL with compression
        const quality = file.type === 'image/jpeg' || file.type === 'image/jpg' ? 0.3 : 0.5;
        const dataUrl = canvas.toDataURL(file.type, quality);
        
        resolve(dataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a file to Vercel Blob storage
 * @param file The file to upload
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(file: File): Promise<string> {
  try {
    // Generate a unique filename
    const fileId = uuidv4();
    const fileExt = file.name.split('.').pop() || 'bin';
    const filename = `products/${fileId}.${fileExt}`;
    
    // Upload to Vercel Blob
    const { url } = await put(filename, file, { 
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    
    console.log(`File uploaded: ${file.name}, URL: ${url}`);
    
    return url;
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Deletes a file from Vercel Blob storage
 * @param url The URL of the file to delete
 */
export async function deleteFile(url: string): Promise<void> {
  try {
    // Extract the pathname from the URL for deletion
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    // Note: Vercel Blob deletion requires the del function
    // For now, we'll just log the deletion attempt
    console.log(`File deletion requested for: ${pathname}`);
    
    // TODO: Implement actual deletion when needed
    // const { del } = await import('@vercel/blob');
    // await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
  } catch (error) {
    console.error('Error deleting file from Vercel Blob:', error);
    // Don't throw error for deletion failures to avoid breaking the flow
  }
}
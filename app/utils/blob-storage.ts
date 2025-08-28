/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

/**
 * Converts a File object to a data URL string with compression
 * @param file The file to convert
 * @param maxWidth Maximum width for image compression
 * @returns Promise with the data URL
 */
// In the fileToDataUrl function
export async function fileToDataUrl(file: File, maxWidth = 400): Promise<string> { // Reduced from 600 to 400
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
        // Inside the img.onload function, reduce quality further
        // When setting quality
        const quality = file.type === 'image/jpeg' || file.type === 'image/jpg' ? 0.3 : 0.5; // Reduced quality
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
 * Uploads a file by converting it to a compressed data URL
 * @param file The file to upload
 * @returns The data URL of the file
 */
export async function uploadFile(file: File): Promise<string> {
  try {
    // Generate a unique ID for the file
    const fileId = uuidv4();
    const fileExt = file.name.split('.').pop();
    
    // Convert the file to a compressed data URL
    const dataUrl = await fileToDataUrl(file);
    
    console.log(`File processed: ${file.name}, Size: ${Math.round(dataUrl.length / 1024)}KB`);
    
    // Return the data URL which contains the file data
    return dataUrl;
  } catch (error) {
    console.error('Error converting file to data URL:', error);
    throw new Error('Failed to process file');
  }
}
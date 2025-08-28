/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from './client';
import { supabaseAdmin } from './server';

/**
 * Uploads a file to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket name
 * @param folder The folder path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(file: File, bucket = 'products', folder = 'images') {
  try {
    // Create a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload the file to Supabase Storage using the admin client to bypass RLS
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file);
      
    if (error) throw error;
    
    // Get the public URL for the file
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    // Return the URL as a plain string without any template literals or string interpolation
    return String(publicUrl).trim();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(url: string, bucket = 'products') {
  try {
    // Extract the file path from the URL
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const filePath = pathSegments.slice(pathSegments.indexOf(bucket) + 1).join('/');
    
    // Delete the file from Supabase Storage using the admin client to bypass RLS
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
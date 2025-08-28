import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_D2At3HiQSTNV@ep-curly-brook-ad0u313x-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: true,
  },
  connectionTimeoutMillis: 60000,
  idleTimeoutMillis: 120000,
  max: 5,
  statement_timeout: 60000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const db = drizzle(pool, { schema });

export async function withRetry<T>(operation: () => Promise<T>, maxRetries = 5, delay = 2000): Promise<T> {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: unknown) {
      console.warn(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
      lastError = error;
      
      const dbError = error as { code?: string; message?: string; cause?: { code?: string; message?: string } };
      const errorMessage = dbError.message || (dbError.cause && dbError.cause.message) || '';
      const errorCode = dbError.code || (dbError.cause && dbError.cause.code) || '';
      
      if (!errorCode.includes('TIME') && 
          !errorMessage.includes('timeout') && 
          !errorMessage.includes('terminated') &&
          !errorMessage.includes('connection') &&
          !errorMessage.includes('Connection terminated')) {
        throw error;
      }
      
      if (attempt < maxRetries) {
        const backoffTime = delay * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }
  
  throw lastError;
}
/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require('pg');
require('dotenv').config();

// Get the connection string from environment variables
const connectionString = process.env.DATABASE_URL;

console.log('Attempting to connect to database...');

// Create a PostgreSQL connection pool with IPv4 forced
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: true,
  },
  // Force IPv4 connections only to avoid IPv6 timeout issues
  family: 4,
  // Increase timeouts
  connectionTimeoutMillis: 60000, // 60 seconds
  idleTimeoutMillis: 120000, // 120 seconds
  statement_timeout: 60000, // 60 seconds
});

async function insertTestProduct() {
  let client;
  try {
    // Connect to the database
    console.log('Connecting to the database...');
    client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Insert a test product
    console.log('Inserting test product...');
    const insertQuery = `
      INSERT INTO products (
        name, brand, category, price, description, 
        rating, review_count, in_stock, is_new
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    
    const values = [
      'Test Shoe ' + Date.now(), // Unique name using timestamp
      'Test Brand',
      'Test Category',
      99.99,
      'This is a test product description',
      4.5,
      10,
      true,
      true
    ];
    
    const result = await client.query(insertQuery, values);
    console.log('Product inserted successfully with ID:', result.rows[0].id);
    
    // Count products
    const countResult = await client.query('SELECT COUNT(*) FROM products');
    console.log(`There are now ${countResult.rows[0].count} products in the database.`);
    
  } catch (error) {
    console.error('Error during database operation:', error);
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
      console.log('Database connection closed.');
    }
    // End the pool
    await pool.end();
  }
}

// Run the insert test
insertTestProduct();
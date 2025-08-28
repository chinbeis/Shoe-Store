import { pgTable, text, decimal, boolean, timestamp, uuid, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  category: text('category').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  features: text('features').array(),
  image: text('image'),
  images: text('images').array(),
  sizes: text('sizes').array(),
  colors: text('colors').array(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  inStock: boolean('in_stock').default(true),
  isNew: boolean('is_new').default(true)
});
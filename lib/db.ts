import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Check your .env.local file.')
}

export const sql = neon(process.env.DATABASE_URL)
export const db = drizzle(sql, { schema })

// Database schema initialization
export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      guest_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      room_type VARCHAR(100) NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INTEGER NOT NULL DEFAULT 1,
      special_requests TEXT,
      total_amount DECIMAL(10,2),
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(100) NOT NULL,
      capacity INTEGER NOT NULL,
      price_per_night DECIMAL(10,2) NOT NULL,
      description TEXT,
      amenities JSONB DEFAULT '[]',
      is_available BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'unread',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `

  console.log('✅ Database tables initialized')
}
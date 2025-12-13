// src/lib/prisma.js (Simplified for Express)

// 
import { PrismaClient } from '../generated/prisma/client.js'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config'; // Ensure env vars are loaded

const connectionString = process.env.DATABASE_URL;

// 1. Create the Pool and Adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Instantiate the client immediately
const prisma = new PrismaClient({ adapter });

// 3. Export the single instance
export default prisma;


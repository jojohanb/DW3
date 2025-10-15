import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  out: './drizzle', // Onde as migrations serão salvas
  schema: './src/infra/db/schema.js', // Onde nosso schema será criado
	dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
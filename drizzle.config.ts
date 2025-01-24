import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/shared/modules/drizzle/schemas/*',
    './src/shared/modules/drizzle/relations/*',
  ],
  out: './drizzle/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  introspect: {
    casing: 'preserve',
  },
  casing: 'snake_case',
  dbCredentials: {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: +process.env.DB_PORT!,
    ssl: false,
  },
});

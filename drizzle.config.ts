import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './app/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // required
  dbCredentials: {
    user: 'neondb_owner',
    password: 'npg_D2At3HiQSTNV',
    host: 'ep-curly-brook-ad0u313x-pooler.c-2.us-east-1.aws.neon.tech',
    database: 'neondb',
    ssl: true,
  },
};

export default config;

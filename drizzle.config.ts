import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './app/db/schema.ts',
  out: './drizzle',
};

export default config;
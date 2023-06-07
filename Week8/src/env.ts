import dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().nonempty(),
  MONGO_DB_ACCESS_POINT: z.string().nonempty(),
  JWT_SALT: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);

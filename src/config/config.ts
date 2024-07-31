// src/config/config.ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const environment = process.env.NODE_ENV || 'development';
export const logDirectory = process.env.LOG_DIR || path.resolve('logs');
export const port=process.env.PORT

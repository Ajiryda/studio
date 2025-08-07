'use server';

import {isProd} from 'genkit';

if (isProd()) {
  process.exit();
}

import {config} from 'dotenv';
config();

import '@/ai/flows/generate-screening-recommendation.ts';

// Impor flow baru di sini

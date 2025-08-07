'use server';

import {isProd} from 'genkit';

if (isProd()) {
  process.exit();
}

import {config} from 'dotenv';
config();

// Flows for analytics are temporarily disabled
// import '@/ai/flows/analyze-health-trends.ts';
// import '@/ai/flows/visualize-health-data.ts';
import '@/ai/flows/generate-screening-recommendation.ts';

// Impor flow baru di sini

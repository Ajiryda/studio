'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {next} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI(),
    next({
      // Opsi bisa ditambahkan di sini jika diperlukan
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
  enableTracingAndMetrics: true,
  logLevel: 'debug',
});

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
  enableTracingAndMetrics: true,
});

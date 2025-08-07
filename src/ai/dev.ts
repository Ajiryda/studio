'use server';

import {isProd} from 'genkit';

if (isProd()) {
  process.exit();
}

import {config} from 'dotenv';
config();

// Impor flow baru di sini

'use server';

/**
 * @fileOverview Menganalisis data kesehatan siswa untuk mengidentifikasi masalah kesehatan umum dan menyarankan obat-obatan serta persediaan yang dibutuhkan.
 *
 * - analyzeHealthTrends - Fungsi yang menganalisis data kesehatan siswa.
 * - AnalyzeHealthTrendsInput - Tipe input untuk fungsi analyzeHealthTrends.
 * - AnalyzeHealthTrendsOutput - Tipe return untuk fungsi analyzeHealthTrends.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHealthTrendsInputSchema = z.object({
  healthData: z
    .string()
    .describe('String berisi data kesehatan siswa, termasuk gejala dan alasan kunjungan.'),
});
export type AnalyzeHealthTrendsInput = z.infer<typeof AnalyzeHealthTrendsInputSchema>;

const AnalyzeHealthTrendsOutputSchema = z.object({
  commonIssues: z
    .string()
    .describe('Ringkasan masalah kesehatan paling umum yang teridentifikasi dari data.'),
  suggestedMedications: z
    .string()
    .describe('Daftar saran obat-obatan dan perlengkapan berdasarkan analisis.'),
});
export type AnalyzeHealthTrendsOutput = z.infer<typeof AnalyzeHealthTrendsOutputSchema>;

export async function analyzeHealthTrends(input: AnalyzeHealthTrendsInput): Promise<AnalyzeHealthTrendsOutput> {
  return analyzeHealthTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHealthTrendsPrompt',
  input: {schema: AnalyzeHealthTrendsInputSchema},
  output: {schema: AnalyzeHealthTrendsOutputSchema},
  prompt: `Anda adalah asisten perawat sekolah. Analisis data kesehatan siswa berikut untuk mengidentifikasi masalah kesehatan umum dan menyarankan obat-obatan serta persediaan yang dibutuhkan.

Data Kesehatan: {{{healthData}}}

Balas dengan ringkasan masalah umum dan daftar saran obat-obatan dan perlengkapan.`,
});

const analyzeHealthTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeHealthTrendsFlow',
    inputSchema: AnalyzeHealthTrendsInputSchema,
    outputSchema: AnalyzeHealthTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

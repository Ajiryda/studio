'use server';

/**
 * @fileOverview File ini mendefinisikan alur Genkit untuk memvisualisasikan data kesehatan yang dianalisis dan kebutuhan pasokan.
 *
 * - visualizeHealthData - Fungsi yang menghasilkan visualisasi data kesehatan dan kebutuhan pasokan.
 * - VisualizeHealthDataInput - Tipe masukan untuk fungsi visualizeHealthData, termasuk data kesehatan dan kebutuhan pasokan.
 * - VisualizeHealthDataOutput - Tipe keluaran untuk fungsi visualizeHealthData, memberikan ringkasan tekstual.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualizeHealthDataInputSchema = z.object({
  mostCommonReason: z.string().describe('Alasan paling umum untuk kunjungan ke UKS (unit kesehatan sekolah).'),
  suggestedMedications: z.string().describe('Daftar saran obat-obatan berdasarkan data kesehatan.'),
});
export type VisualizeHealthDataInput = z.infer<typeof VisualizeHealthDataInputSchema>;

const VisualizeHealthDataOutputSchema = z.object({
  summary: z.string().describe('Ringkasan data kesehatan dan kebutuhan pasokan.'),
});
export type VisualizeHealthDataOutput = z.infer<typeof VisualizeHealthDataOutputSchema>;

export async function visualizeHealthData(input: VisualizeHealthDataInput): Promise<VisualizeHealthDataOutput> {
  return visualizeHealthDataFlow(input);
}

const visualizeHealthDataPrompt = ai.definePrompt({
  name: 'visualizeHealthDataPrompt',
  input: {schema: VisualizeHealthDataInputSchema},
  output: {schema: VisualizeHealthDataOutputSchema},
  prompt: `Anda adalah seorang ahli visualisasi data untuk data kesehatan sekolah.

  Berdasarkan informasi berikut, buatlah ringkasan singkat yang dapat digunakan oleh administrator sekolah untuk memahami tren kesehatan dan membuat keputusan alokasi sumber daya. Ringkasan harus mencakup wawasan utama tentang masalah kesehatan umum dan saran obat/perlengkapan.

  Alasan paling umum untuk kunjungan: {{{mostCommonReason}}}
  Saran obat-obatan: {{{suggestedMedications}}}
  `,
});

const visualizeHealthDataFlow = ai.defineFlow(
  {
    name: 'visualizeHealthDataFlow',
    inputSchema: VisualizeHealthDataInputSchema,
    outputSchema: VisualizeHealthDataOutputSchema,
  },
  async input => {
    const {output} = await visualizeHealthDataPrompt(input);
    return output!;
  }
);

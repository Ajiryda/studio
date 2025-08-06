'use server';

/**
 * @fileOverview Generates health screening recommendations based on student data.
 *
 * - generateScreeningRecommendation - A function that analyzes student screening data.
 * - GenerateScreeningRecommendationInput - The input type for the function.
 * - GenerateScreeningRecommendationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScreeningRecommendationInputSchema = z.object({
  studentData: z.string().describe('A JSON string containing the student\'s screening data.'),
});
export type GenerateScreeningRecommendationInput = z.infer<typeof GenerateScreeningRecommendationInputSchema>;

const GenerateScreeningRecommendationOutputSchema = z.object({
  physicalStatus: z.string().describe('One of: "Sehat", "Perlu Tindak Lanjut".'),
  mentalHealth: z.string().describe('One of: "Normal", "Waspada", "Perlu Intervensi".'),
  lifestyle: z.string().describe('One of: "Sehat", "Perlu Pembinaan".'),
  recommendations: z.array(z.string()).describe('A list of actionable recommendations for the student, school nurse, or counselor.'),
});
export type GenerateScreeningRecommendationOutput = z.infer<typeof GenerateScreeningRecommendationOutputSchema>;


export async function generateScreeningRecommendation(input: GenerateScreeningRecommendationInput): Promise<GenerateScreeningRecommendationOutput> {
  return generateScreeningRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScreeningRecommendationPrompt',
  input: {schema: GenerateScreeningRecommendationInputSchema},
  output: {schema: GenerateScreeningRecommendationOutputSchema},
  prompt: `You are an expert school health assistant. Analyze the following student health screening data.
Based on the data, determine the status for physical health, mental health, and lifestyle.
Then, provide a list of concrete, actionable recommendations.

Here is the data:
{{{studentData}}}

Respond with the determined status and recommendations in the specified JSON format. The recommendations should be clear and targeted (e.g., "Jadwalkan konsultasi dengan guru BK untuk membahas perasaan cemas", "Rujuk ke Puskesmas untuk pemeriksaan penglihatan lebih lanjut", "Berikan edukasi tentang pentingnya sarapan").
`,
});

const generateScreeningRecommendationFlow = ai.defineFlow(
  {
    name: 'generateScreeningRecommendationFlow',
    inputSchema: GenerateScreeningRecommendationInputSchema,
    outputSchema: GenerateScreeningRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

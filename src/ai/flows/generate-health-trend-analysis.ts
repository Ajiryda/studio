'use server';
/**
 * @fileOverview Analyzes school health data to identify trends.
 *
 * - generateHealthTrendAnalysis - Analyzes UKS visit and screening data.
 * - GenerateHealthTrendAnalysisInput - The input type for the function.
 * - GenerateHealthTrendAnalysisOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHealthTrendAnalysisInputSchema = z.object({
  uksVisits: z.string().describe('A JSON string of UKS visit data for the last month.'),
  medicationStock: z.string().describe('A JSON string of current medication stock levels.'),
});
export type GenerateHealthTrendAnalysisInput = z.infer<typeof GenerateHealthTrendAnalysisInputSchema>;

const GenerateHealthTrendAnalysisOutputSchema = z.object({
  summary: z.string().describe('A brief, insightful summary of the overall health situation.'),
  commonComplaints: z.array(z.object({
    complaint: z.string().describe('The health complaint.'),
    count: z.number().describe('The number of times this complaint was recorded.'),
  })).describe('A list of the most common health complaints.'),
  stockRecommendations: z.array(z.object({
    medicationName: z.string().describe('The name of the medication or supply.'),
    recommendation: z.string().describe('The recommendation, e.g., "Segera restock" or "Stok cukup".'),
  })).describe('Recommendations for medication and supply stock levels.'),
});
export type GenerateHealthTrendAnalysisOutput = z.infer<typeof GenerateHealthTrendAnalysisOutputSchema>;


export async function generateHealthTrendAnalysis(input: GenerateHealthTrendAnalysisInput): Promise<GenerateHealthTrendAnalysisOutput> {
  return generateHealthTrendAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHealthTrendAnalysisPrompt',
  input: {schema: GenerateHealthTrendAnalysisInputSchema},
  output: {schema: GenerateHealthTrendAnalysisOutputSchema},
  prompt: `You are a school health data analyst AI. Your task is to analyze UKS (School Health Unit) data to provide actionable insights for school staff.

Analyze the provided data:
1.  **UKS Visits Data (JSON)**: {{{uksVisits}}}
2.  **Medication Stock Data (JSON)**: {{{medicationStock}}}

Based on your analysis, provide the following in the specified JSON format:
1.  **Summary**: Write a short (2-3 sentences) summary of the key health trends observed from the visit data.
2.  **Common Complaints**: Identify the top 3-5 most common complaints from the UKS visits.
3.  **Stock Recommendations**: Based on the common complaints and current stock levels, provide a recommendation for each medication. State if the stock is sufficient ("Stok cukup") or needs restocking ("Segera restock").
`,
});

const generateHealthTrendAnalysisFlow = ai.defineFlow(
  {
    name: 'generateHealthTrendAnalysisFlow',
    inputSchema: GenerateHealthTrendAnalysisInputSchema,
    outputSchema: GenerateHealthTrendAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

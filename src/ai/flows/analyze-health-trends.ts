'use server';

/**
 * @fileOverview Analyzes student health data to identify common health issues and suggest needed medications and supplies.
 *
 * - analyzeHealthTrends - A function that analyzes student health data.
 * - AnalyzeHealthTrendsInput - The input type for the analyzeHealthTrends function.
 * - AnalyzeHealthTrendsOutput - The return type for the analyzeHealthTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHealthTrendsInputSchema = z.object({
  healthData: z
    .string()
    .describe('A string containing student health data, including symptoms and visit reasons.'),
});
export type AnalyzeHealthTrendsInput = z.infer<typeof AnalyzeHealthTrendsInputSchema>;

const AnalyzeHealthTrendsOutputSchema = z.object({
  commonIssues: z
    .string()
    .describe('A summary of the most common health issues identified in the data.'),
  suggestedMedications: z
    .string()
    .describe('A list of suggested medications and supplies based on the analysis.'),
});
export type AnalyzeHealthTrendsOutput = z.infer<typeof AnalyzeHealthTrendsOutputSchema>;

export async function analyzeHealthTrends(input: AnalyzeHealthTrendsInput): Promise<AnalyzeHealthTrendsOutput> {
  return analyzeHealthTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHealthTrendsPrompt',
  input: {schema: AnalyzeHealthTrendsInputSchema},
  output: {schema: AnalyzeHealthTrendsOutputSchema},
  prompt: `You are a school nurse assistant. Analyze the following student health data to identify common health issues and suggest needed medications and supplies.

Health Data: {{{healthData}}}

Respond with a summary of common issues and a list of suggested medications and supplies.`,
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

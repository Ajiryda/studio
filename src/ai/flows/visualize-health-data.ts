// src/ai/flows/visualize-health-data.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for visualizing analyzed health data and supply needs.
 *
 * - visualizeHealthData - A function that generates a visualization of health data and supply needs.
 * - VisualizeHealthDataInput - The input type for the visualizeHealthData function, including health data and supply needs.
 * - VisualizeHealthDataOutput - The output type for the visualizeHealthData function, providing a textual summary and potentially a data URI for a chart image.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const VisualizeHealthDataInputSchema = z.object({
  mostCommonReason: z.string().describe('The most common reason for visits to the UKS (school health unit).'),
  suggestedMedications: z.string().describe('A list of suggested medications based on the health data.'),
});
export type VisualizeHealthDataInput = z.infer<typeof VisualizeHealthDataInputSchema>;

// Define the output schema
const VisualizeHealthDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the health data and supply needs.'),
});
export type VisualizeHealthDataOutput = z.infer<typeof VisualizeHealthDataOutputSchema>;

// Exported function to call the flow
export async function visualizeHealthData(input: VisualizeHealthDataInput): Promise<VisualizeHealthDataOutput> {
  return visualizeHealthDataFlow(input);
}

// Define the prompt
const visualizeHealthDataPrompt = ai.definePrompt({
  name: 'visualizeHealthDataPrompt',
  input: {schema: VisualizeHealthDataInputSchema},
  output: {schema: VisualizeHealthDataOutputSchema},
  prompt: `You are a data visualization expert for school health data.

  Based on the following information, generate a concise summary that a school administrator can use to understand health trends and make resource allocation decisions.  The summary should include key insights into common health issues and suggested medications/supplies.

  Most common reason for visits: {{{mostCommonReason}}}
  Suggested medications: {{{suggestedMedications}}}
  `,
});

// Define the flow
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

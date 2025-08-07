
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
  studentData: z.string().describe('A JSON string containing the student\'s screening data, including their name and BMI.'),
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
  prompt: `You are an expert school health assistant AI. Your task is to analyze student health screening data and provide a concise, actionable assessment.

Analyze the student data provided in the JSON input. Based on this data, you must:
1.  Determine the status for Physical Health, Mental Health, and Lifestyle.
2.  Generate a list of 3-5 concrete, actionable recommendations for the school nurse, counselor, or the student.

**Student Data:**
\`\`\`json
{{{studentData}}}
\`\`\`

**Analysis and Status Guidelines:**

**1. Physical Status:**
   - **"Sehat":** BMI is within a normal range (18.5-24.9), no vision/hearing problems, no major dental issues (like bleeding gums or cavities), and no other significant physical complaints.
   - **"Perlu Tindak Lanjut":** BMI is underweight (<18.5) or overweight (>25), there are positive reports of vision or hearing problems, reports of significant dental issues (gigi berlubang, gusi berdarah), or other persistent physical complaints (pusing, mual, etc.).

**2. Mental Health Status:**
   - **"Normal":** The student answers "tidak" to most questions about sadness, anxiety, motivation, and loneliness.
   - **"Waspada":** The student answers "ya" to one or two of the questions. This indicates a potential issue that needs monitoring.
   - **"Perlu Intervensi":** The student answers "ya" to three or more questions, or reports any instance of self-harm, violence, or bullying. This requires immediate attention from a counselor.

**3. Lifestyle Status:**
   - **"Sehat":** The student has generally positive habits: regular breakfast, adequate water intake, eats fruits/vegetables, has a balanced sleep schedule (7+ hours), and engages in regular physical activity (2-3 times a week or more).
   - **"Perlu Pembinaan":** The student has several areas for improvement: frequently skips breakfast, low water intake, poor snack choices, insufficient sleep (<7 hours), excessive screen time (>4 hours), or infrequent physical activity (<2 times a week). Any report of smoking or alcohol automatically falls into this category.

**Recommendation Guidelines:**

- Be specific and action-oriented.
- Target the recommendation to the appropriate person (e.g., "Rujuk ke Puskesmas...", "Jadwalkan konsultasi dengan guru BK...", "Edukasi siswa tentang...").
- Base recommendations directly on the data provided.

**Example Recommendations:**
- "Jadwalkan konsultasi dengan guru BK untuk membahas perasaan cemas dan tidak semangat ke sekolah."
- "Rujuk ke Puskesmas untuk pemeriksaan penglihatan lebih lanjut karena siswa mengeluh sulit melihat papan tulis."
- "Berikan edukasi kepada siswa tentang pentingnya sarapan dan konsumsi air putih untuk meningkatkan konsentrasi."
- "Pantau status gizi siswa karena BMI berada di kategori overweight. Sarankan aktivitas fisik tambahan."

Now, analyze the provided student data and respond ONLY with the determined statuses and recommendations in the specified JSON format.
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

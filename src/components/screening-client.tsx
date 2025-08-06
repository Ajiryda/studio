"use client";

import { useState } from 'react';
import { ScreeningForm } from '@/components/screening-form';
import { ScreeningResultDisplay } from '@/components/screening-result-display';
import { Card, CardContent } from '@/components/ui/card';
import type { ScreeningResult } from '@/lib/types';
import type { ScreeningFormValues } from '@/components/screening-form';

export function ScreeningClient() {
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(Date.now());

  const handleNewScreening = () => {
    setResult(null);
    setError(null);
    setLoading(false);
    setFormKey(Date.now());
  };


  return (
    <Card>
      <CardContent className="p-6">
        {result ? (
          <ScreeningResultDisplay result={result} onNewScreening={handleNewScreening} />
        ) : (
          <ScreeningForm
            key={formKey}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
            loading={loading}
            error={error}
          />
        )}
      </CardContent>
    </Card>
  );
}

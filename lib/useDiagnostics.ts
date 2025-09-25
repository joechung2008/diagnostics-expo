import type { EnvironmentType } from '@/lib/environment';
import type { Diagnostics } from '@/lib/types';
import { useEffect, useState } from 'react';

export function useDiagnostics(environment: EnvironmentType) {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      if (!environment) {
        return;
      }

      setLoading(true);
      setError(undefined);
      try {
        const response = await fetch(environment);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch diagnostics: ${response.statusText}`
          );
        }
        const data: Diagnostics = await response.json();
        setDiagnostics(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostics();
  }, [environment]);

  return { diagnostics, error, loading };
}

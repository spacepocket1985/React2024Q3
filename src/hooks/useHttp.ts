import { useState, useCallback } from 'react';

type UseHttpReturnType<T> = {
  loading: boolean;
  request: (url: string) => Promise<T>;
  error: string;
  clearError: () => void;
};

export const useHttp = <T>(): UseHttpReturnType<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(async (url: string): Promise<T> => {
    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data: T = await response.json();

      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
        throw e;
      } else {
        setError('An unknown error occurred');
        throw new Error('An unknown error occurred');
      }
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { loading, request, error, clearError };
};

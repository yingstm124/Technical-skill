import { useState, useCallback } from 'react';

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseFetchOptions<T> {
  initialData?: T | null;
  enabled?: boolean;
  retryOnFailure?: boolean;
  retryDelay?: number;
}

export const useFetch = <T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions<T> = {}
) => {
  const {
    initialData = null,
    enabled = true,
    retryOnFailure = false,
    retryDelay = 2000,
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const fetch = useCallback(async () => {
    if (!enabled) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      
      if (retryOnFailure) {
        setTimeout(() => {
          fetch();
        }, retryDelay);
      }
    }
  }, [enabled, fetchFn, retryOnFailure, retryDelay]);

  return {
    ...state,
    fetch,
    refetch: fetch,
  };
};

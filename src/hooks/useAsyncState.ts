import { useState, useCallback } from 'react';

export interface AsyncState<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

export function useAsyncState<T>(initialData?: T): [
  AsyncState<T>,
  {
    setData: (data: T) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | undefined) => void;
    reset: () => void;
    execute: <P extends unknown[]>(asyncFn: (...args: P) => Promise<T>, ...args: P) => Promise<T | undefined>;
  }
] {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: undefined,
  });

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data, loading: false, error: undefined }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: Error | undefined) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: undefined,
    });
  }, [initialData]);

  const execute = useCallback(async <P extends unknown[]>(
    asyncFn: (...args: P) => Promise<T>,
    ...args: P
  ): Promise<T | undefined> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: undefined }));
      const result = await asyncFn(...args);
      setState(prev => ({ ...prev, data: result, loading: false, error: undefined }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      setState(prev => ({ ...prev, error: errorObj, loading: false }));
      console.error('Async operation failed:', errorObj);
      return undefined;
    }
  }, []);

  return [state, { setData, setLoading, setError, reset, execute }];
}

// Utility for handling API errors
export function handleApiError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return new Error(String(error.message));
  }
  
  return new Error('An unexpected error occurred');
}

// Utility for safe async operations with error handling
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.error('Safe async operation failed:', handleApiError(error));
    return fallback;
  }
}

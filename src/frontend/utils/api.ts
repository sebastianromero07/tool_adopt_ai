/**
 * Utilities for API calls and data fetching
 */

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiCall<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchWithTimeout<T>(
  url: string,
  options: FetchOptions & { timeout?: number } = {}
): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

export default async function myFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  context: FetchContext = FetchContext.Default
): Promise<IMyFetchResponse<T>> {
  let json: any;
  try {
    const response = await fetch(input, init);
    json = (await response.json()) as any;
    if (response.ok) return { data: json as T, error: null };
    return { data: null, error: response.statusText };
  } catch (e) {
    if (e instanceof SyntaxError) {
      return { data: null, error: e.message };
    }
    if (e instanceof Error) {
      return { data: null, error: e.message };
    }
    return { data: null, error: `Something went wrong - ${e}` };
  }
}

export type IMyFetchResponse<T> =
  | {
      data: T;
      error: null;
    }
  | { error: string; data: null };

enum FetchContext {
  Default,
  JSON,
}

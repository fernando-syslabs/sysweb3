/**
 * The largest possible chain ID we can handle.
 * Explanation: https://gist.github.com/rekmarks/a47bd5f2525936c4b8eee31a16345553
 */
export const MAX_SAFE_CHAIN_ID = 4503599627370476;
import { getFetchWithTimeout } from './fetch-with-timeout';

const fetchWithTimeout = getFetchWithTimeout(1000 * 30);

export const jsonRpcRequest = async (rpcUrl: string, rpcMethod: string, rpcParams = []) => {
  let fetchUrl = rpcUrl;

  const headers: { 'Content-Type': string, Authorization?: string } = {
    'Content-Type': 'application/json',
  };

  // Convert basic auth URL component to Authorization header
  const { origin, pathname, username, password, search } = new URL(rpcUrl);

  // URLs containing username and password needs special processing
  if (username && password) {
    const encodedAuth = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );

    headers.Authorization = `Basic ${encodedAuth}`;
    fetchUrl = `${origin}${pathname}${search}`;
  }

  const jsonRpcResponse = await fetchWithTimeout(fetchUrl, {
    method: 'POST',
    body: JSON.stringify({
      id: Date.now().toString(),
      jsonrpc: '2.0',
      method: rpcMethod,
      params: rpcParams,
    }),
    headers,
    cache: 'default',
  }).then((httpResponse) => httpResponse.json());

  if (
    !jsonRpcResponse ||
    Array.isArray(jsonRpcResponse) ||
    typeof jsonRpcResponse !== 'object'
  ) {
    throw new Error(`RPC endpoint ${rpcUrl} returned non-object response.`);
  }

  const { error, result } = jsonRpcResponse;

  if (error) {
    throw new Error(error?.message || error);
  }

  return result;
}
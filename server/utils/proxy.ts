const apiUrl = process.env.API_URL;

type Optional<T> = T | null | undefined;

class ProxyError extends Error {

  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message)
    this.message = message;
    this.statusCode = statusCode;
  }
}

function notEmpty<T>(value: Optional<T>): value is T {
  return value !== null && value !== undefined;
}

function joinUrl(...segments: Optional<string>[]): string {
  return segments
    .filter(notEmpty)
    .map((seg) => {
      if (seg.startsWith("/")) {
        seg = seg.substring(1);
      }
      return seg;
    })
    .join("/");
}

class ChefProxy {
  public async get(path: string) {
    const url = joinUrl(apiUrl, path);
    console.debug(`GET ${url}`);
    try {

      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new ProxyError(response.status, `Proxy query failed with status ${response.status}, ${response.statusText}`)
      }

      return await response.json();

    } catch(err: unknown) {
      if (!(err as ProxyError).statusCode) {
        throw new ProxyError(503, `Fetch error, service at ${url} not available`)
      } else {
        throw err;
      }
    }
    
  }

  public async post(path: string) {
    throw new Error("Not implemented!");
  }
}

export const chef = new ChefProxy();

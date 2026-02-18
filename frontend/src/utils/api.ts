/**
 * Retorna a URL da API conforme o contexto:
 * - Server-side (SSR): API_URL_SERVER (Docker/Vercel) ou NEXT_PUBLIC_API_URL (Vercel) ou localhost:8000 (dev local).
 * - Client-side (browser): NEXT_PUBLIC_API_URL (localhost:8080 ou configurado).
 */
export function getApiUrl(): string {
  if (typeof window === "undefined") {
    // Server-side: prioridade API_URL_SERVER (Docker/Vercel), depois NEXT_PUBLIC (Vercel usa na build)
    return (
      process.env.API_URL_SERVER ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    );
  }
  // Client-side (browser)
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
}

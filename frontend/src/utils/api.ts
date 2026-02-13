/**
 * Retorna a URL da API conforme o contexto:
 * - Server-side (SSR): API_URL_SERVER (Docker: backend:8000) ou localhost:8000 (dev local).
 *   Nunca usa NEXT_PUBLIC_API_URL no servidor - localhost:8080 só funciona no browser.
 * - Client-side (browser): NEXT_PUBLIC_API_URL (localhost:8080 ou configurado).
 */
export function getApiUrl(): string {
  if (typeof window === "undefined") {
    // Server-side: só API_URL_SERVER ou fallback localhost:8000 (backend em dev local)
    return process.env.API_URL_SERVER || "http://localhost:8000";
  }
  // Client-side (browser)
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
}

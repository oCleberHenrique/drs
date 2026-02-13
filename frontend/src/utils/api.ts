/**
 * Retorna a URL da API conforme o contexto:
 * - No servidor (SSR): usa API_URL_SERVER para comunicação entre containers Docker (backend:8000)
 * - No cliente ou local: usa NEXT_PUBLIC_API_URL (localhost:8080 ou configurado)
 */
export function getApiUrl(): string {
  if (typeof window === "undefined") {
    // Server-side (SSR): usa hostname Docker quando em container
    return process.env.API_URL_SERVER || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  }
  // Client-side (browser)
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
}

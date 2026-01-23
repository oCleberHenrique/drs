export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";

 
  if (path.startsWith("http")) return path;

  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}
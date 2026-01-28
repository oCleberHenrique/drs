export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";

  const httpBackend = "http://31.97.242.139:8000";

  if (path.startsWith(httpBackend)) {
    return path.replace(httpBackend, "");
  }

  if (path.startsWith("http")) return path;

  return path.startsWith('/') ? path : `/${path}`;
}
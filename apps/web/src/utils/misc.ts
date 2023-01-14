export function getImageUrl(id: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${encodeURIComponent(id)}`;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getImagePlaceholder = (
  imageId: string,
  width = 300,
  height = 300
) => {
  return `${BACKEND_URL}/images/${imageId}/placeholder?width=${width}&height=${height}`;
};

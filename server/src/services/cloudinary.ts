import sharp from "sharp";

import { cloudinaryConfig } from "../config/cloudinary";
import { generateImagePlaceholder } from "../utils/placeholder";
import { uploadFromBuffer } from "../utils/upload";

cloudinaryConfig();

export const uploadPhoto = async (
  buffer: Buffer
): Promise<{
  id: string;
  src: string;
  width: number;
  height: number;
  placeholder: string;
  mimeType: string;
}> => {
  const sharpImg = await sharp(buffer)
    .resize(undefined, 1280)
    .webp({ quality: 100 })
    .toBuffer();
  const placeholder = await generateImagePlaceholder(buffer);

  const { public_id, url, width, height, format } = await uploadFromBuffer(
    sharpImg
  );

  return {
    id: public_id,
    src: url,
    width,
    height,
    placeholder,
    mimeType: format,
  };
};
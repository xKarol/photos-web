import sharp from "sharp";

import { generateImagePlaceholder } from "../utils/placeholder";
import { uploadFromBuffer } from "../utils/upload";

export const uploadPhoto = async (buffer: Buffer) => {
  const sharpImg = await sharp(buffer).webp({ quality: 20 }).toBuffer();
  const placeholder = await generateImagePlaceholder(buffer);

  const { secure_url, height, width } = await uploadFromBuffer(sharpImg);

  return {
    src: secure_url,
    height,
    width,
    placeholder,
  };
};

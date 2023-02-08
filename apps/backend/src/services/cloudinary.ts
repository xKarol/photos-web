import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

import { cloudinaryConfig } from "../config/cloudinary";
import { generateImagePlaceholder } from "../utils/placeholder";
import { uploadFromBuffer } from "../utils/upload";

cloudinaryConfig();

export const uploadPhoto = async (
  buffer: Buffer,
  folder = "images"
): Promise<{
  id: string;
  src: string;
  width: number;
  height: number;
  placeholder: string;
  mimeType: string;
}> => {
  const sharpImg = await sharp(buffer).webp({ quality: 100 }).toBuffer();
  const placeholder = await generateImagePlaceholder(buffer);

  const { asset_id, url, width, height, format } = await uploadFromBuffer(
    sharpImg,
    folder
  );

  return {
    id: asset_id,
    src: url,
    width,
    height,
    placeholder,
    mimeType: format,
  };
};

export const deleteCloudinaryImageById = async (imageId: string) => {
  const res = await cloudinary.uploader.destroy(imageId);
  return res;
};

export const deleteManyCloudinaryImages = async (imageIds: string[]) => {
  const res = await cloudinary.api.delete_resources(imageIds);
  return res;
};

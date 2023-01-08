import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

import { cloudinaryConfig } from "../config/cloudinary";
import { generateImagePlaceholder } from "../utils/placeholder";
import { uploadFromBuffer } from "../utils/upload";

cloudinaryConfig();

export const uploadPhoto = async (buffer: Buffer) => {
  const sharpImg = await sharp(buffer)
    .resize(undefined, 1280)
    .webp({ quality: 100 })
    .toBuffer();
  const placeholder = await generateImagePlaceholder(buffer);

  const data = await uploadFromBuffer(sharpImg);

  return { ...data, placeholder };
};

type Resource = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
  next_cursor: string;
  derived: unknown[];
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
};

export const getImageById = async (id: string): Promise<Resource> => {
  const data = await cloudinary.api.resource(id);
  console.log(data);
  return data;
};

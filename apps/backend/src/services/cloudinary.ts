import { v2 as cloudinary, type AdminAndResourceOptions } from "cloudinary";
import sharp from "sharp";
import type { Image } from "@prisma/client";
import { cloudinaryConfig } from "../config/cloudinary";
import { uploadFromBuffer } from "../utils/upload";

cloudinaryConfig();

export const uploadPhoto = async (
  buffer: Buffer,
  folder = "images"
): Promise<Pick<Image, "id" | "src" | "width" | "height" | "mimeType">> => {
  const sharpImg = await sharp(buffer).webp({ quality: 100 }).toBuffer();

  const { asset_id, url, width, height, format } = await uploadFromBuffer(
    sharpImg,
    folder
  );

  return {
    id: asset_id,
    src: url,
    width,
    height,
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

export const getImageByIds = async (
  imageIds: string[],
  options?: AdminAndResourceOptions
) => {
  const res = await cloudinary.api.resources_by_asset_ids(imageIds, options);
  return res.resources;
};

export const deleteAllCloudinaryImages = async () => {
  const res = await cloudinary.api.delete_all_resources({ all: true });
  return res;
};

export type ResourceType = {
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
};

export const getCloudinaryImages = async (
  options?: AdminAndResourceOptions
) => {
  const data = await cloudinary.api.resources(options);
  return data.resources as ResourceType[];
};

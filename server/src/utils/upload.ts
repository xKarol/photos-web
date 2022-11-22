import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

import { bufferToStream } from "./buffer";

export const uploadFromBuffer = (
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "photos",
      },
      (error, result) => {
        if (result) return resolve(result);
        reject(error);
      }
    );

    bufferToStream(buffer).pipe(stream);
  });
};

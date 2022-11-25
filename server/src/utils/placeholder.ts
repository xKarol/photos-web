import sharp from "sharp";

export const generateImagePlaceholder = async (
  buffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    sharp(buffer)
      .resize(10, 10)
      .toBuffer((error, sharpBuffer) => {
        if (error) return reject(error);
        resolve(Buffer.from(sharpBuffer).toString("base64"));
      });
  });
};

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "readable-stream";

export const bufferToStream = (buffer: Buffer) =>
  new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });

export const getPlaceholderURL = (
  public_id: string,
  width = 300,
  height = 300
) => {
  return cloudinary.url(public_id, {
    transformation: [{ effect: "blur:5000" }, { width, height, crop: "fill" }],
  });
};

export const getPlaceholderString = (placeholder: Buffer) => {
  return `data:image/png;base64,${Buffer.from(placeholder).toString("base64")}`;
};

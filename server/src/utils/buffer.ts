import { Readable } from "readable-stream";

export const bufferToStream = (buffer: Buffer) =>
  new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });

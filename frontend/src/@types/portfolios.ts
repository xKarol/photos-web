import { PhotoType } from "./photos";

export type Portfolio = {
    id: string;
    name: string;
    images: PhotoType[];
    updatedAt: string;
    createdAt: string;
  };
  
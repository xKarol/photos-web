import { apiUrls } from "@app/config";
import type { Photo } from "@app/types";

import axios from "../../../libs/axios";

export const getPhotos: Photo.Api["findAll"] = async (params) => {
  const { data } = await axios.get(apiUrls.photo.findAll, {
    params,
  });
  return data;
};

export const getPhoto: Photo.Api["findOne"] = async (photoId) => {
  const { data } = await axios.get(apiUrls.photo.findOne(photoId));
  return data;
};

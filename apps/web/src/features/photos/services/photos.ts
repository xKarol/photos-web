import { apiUrls } from "@app/config";
import type { API } from "@app/types";

import axios from "../../../libs/axios";

export const getPhotos = async (
  page = 1,
  limit = 10
): Promise<API["Photos"]["Get"]> => {
  const { data } = await axios.get(apiUrls.photo.findAll, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getPhoto = async (
  photoId: string
): Promise<API["Photos"]["GetOne"]> => {
  const { data } = await axios.get(apiUrls.photo.findOne(photoId));
  return data;
};

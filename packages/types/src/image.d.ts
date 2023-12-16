export type Api = {
  findOne: (imageId: string) => Promise<ArrayBuffer>;
};

export type ApiResponse = {
  findOne: ArrayBuffer;
};

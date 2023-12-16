export type Api = {
  findOne: (imageId: string) => Promise<ArrayBuffer>;
  getPlaceholder: (imageId: string) => Promise<ArrayBuffer>;
};

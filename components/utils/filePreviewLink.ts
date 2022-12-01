// Returns previewable link of image from ipfs id

export const filePreviewLink = (ipfs: string): string => {
  const image = ipfs.split("/");
  const imageUrl = "https://" + image[2] + ".ipfs.w3s.link/" + image[3];
  return imageUrl;
};

export const NftPreviewLink = (ipfs: string): string => {
  return ipfs;
};

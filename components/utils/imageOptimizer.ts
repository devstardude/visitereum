import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.4,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const imageOptimizer = async (file: File): Promise<File> => {
  const optimizedImage = await imageCompression(file, options);
  return optimizedImage;
};

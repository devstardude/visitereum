import { Web3Storage } from "web3.storage";

// Store image assets in IPFS

const namePrefix = "ImageGallery";
export async function storeImage(imageFile: File, caption: string) {
  const web3StorageClient = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB_STORAGE_TOKEN,
  });

  const uploadName = [namePrefix, caption].join("|");

  function jsonFile(filename: string, obj: object) {
    return new File([JSON.stringify(obj)], filename);
  }
  const metadataFile = jsonFile("metadata.json", {
    path: imageFile.name,
    caption,
  });

  const cid = await web3StorageClient.put([imageFile, metadataFile], {
    name: uploadName,
  });

  const imageURI = `ipfs://${cid}/${imageFile.name}`;
  return imageURI;
}

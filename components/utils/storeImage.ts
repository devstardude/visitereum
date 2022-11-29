import { Web3Storage } from "web3.storage";

const namePrefix = "ImageGallery";
export async function storeImage(imageFile: File, caption: string) {
  const uploadName = [namePrefix, caption].join("|");

  function jsonFile(filename: string, obj: object) {
    return new File([JSON.stringify(obj)], filename);
  }
  const metadataFile = jsonFile("metadata.json", {
    path: imageFile.name,
    caption,
  });

  function getSavedToken() {
    return localStorage.getItem("w3storage-token");
  }

  const token = getSavedToken();
  if (!token) {
    return;
  }
  const web3storage = new Web3Storage({ token });

  const cid = await web3storage.put([imageFile, metadataFile], {
    name: uploadName,
  });

  //   const metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
  //   const imageGatewayURL = makeGatewayURL(cid, imageFile.name);
  const imageURI = `ipfs://${cid}/${imageFile.name}`;
  return { cid, imageURI };
}

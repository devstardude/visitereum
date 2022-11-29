import { caption } from "./../../../../openSource/mantine/src/mantine-demos/src/demos/core/Image/Image.demo.caption";
import { userData } from "../main/ProfilePage/types";
import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";
import { uploadImage } from "@self.id/image-utils";
import { Web3Storage } from "web3.storage";
import process from "process";
export const writeProfile = async (address: string, data: userData) => {
  const web3StorageClient = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB_STORAGE_TOKEN,
  });
  const client = new WebClientSession({
    ceramic: "testnet-clay",
  });
  const authProvider = new EthereumAuthProvider(window.ethereum, address);
  await client.authenticate(authProvider);
  const self = new SelfID({ client });
  // const imageSources = await uploadImage(
  //   `https://ipfs.infura.io:5001/${process.env.NEXT_PUBLIC_IPFS_API}/v0`,
  //   data.image,
  //   [
  //     { width: 60, height: 60 },
  //     { width: 200, height: 200 },
  //   ]
  // );
  const imageFile = data.image;
  const caption = data.image.name;
  const namePrefix = "ImageGallery";
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
  console.log("imageURI", imageURI);

  const imageSources = {
    original: {
      src: imageURI,
      mimeType: "image/*",
      width: 400,
      height: 400,
    },
  };
  const ids = await self.set("basicProfile", {
    name: data.name,
    image: imageSources,
    description: data.bio,
    birthDate: data.birthday,
    gender: data.gender,
    homeLocation: data.address,
  });
  console.log(ids);
  return ids;
};

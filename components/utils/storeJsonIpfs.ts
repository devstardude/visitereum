import { encryptedDid } from "./encrptyDid";
import { Web3Storage } from "web3.storage";

// Store encrypted DID of user into ipfs 

const makeFileObjects = (obj: object) => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "did.json"),
  ];
  return files;
};

const storeFiles = async (file: any) => {
  const web3StorageClient = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB_STORAGE_TOKEN,
  });

  const cid = await web3StorageClient.put(file);
  console.log("stored files with cid:", cid);
  return cid;
};

export const storeJsonIpfs = async (did: string) => {
  const obj = { did: encryptedDid(did) };
  const file = makeFileObjects(obj);
  const cid = await storeFiles(file);
  return cid;
};

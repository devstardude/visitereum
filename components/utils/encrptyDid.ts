import CryptoJS from "crypto-js";

// Encrypt and Decrypt DID for uploading in ipfs

export const encryptedDid = (did: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(
    did,
    process.env.NEXT_PUBLIC_SECRET_TOKEN
  ).toString();
  return ciphertext;
};

export const decryptDid = (did: string): string => {
  var bytes = CryptoJS.AES.decrypt(did, process.env.NEXT_PUBLIC_SECRET_TOKEN);
  var originalDid = bytes.toString(CryptoJS.enc.Utf8);
  return originalDid;
};

// fetch JSON data of user's encrypted DID from IPFS

import { decryptDid } from "./encrptyDid";
export const fetchJsonIpfs = async (cid: string) => {
  const fetchJson = await fetch(`https://${cid}.ipfs.w3s.link/did.json`);
  const res = await fetchJson.json();
  const finalDid = decryptDid(res.did);
  return finalDid;
};

import { userData } from "../main/ProfilePage/types";
import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";
export const writeProfile = async (address: string, data: userData) => {
  const client = new WebClientSession({
    ceramic: "testnet-clay",
  });
  const authProvider = new EthereumAuthProvider(window.ethereum, address);
  await client.authenticate(authProvider);
  const self = new SelfID({ client });

  const imageSources = {
    original: {
      src: data.image,
      mimeType: "image/*",
      width: 400,
      height: 400,
    },
  };
  const ids = await self.set("basicProfile", {
    name: data.name,
    image: imageSources,
    description: data.description,
    birthDate: data.birthDate,
    gender: data.gender,
    homeLocation: data.homeLocation,
  });
  console.log(ids);
  return ids;
};

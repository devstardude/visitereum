import { userData } from "../main/ProfilePage/types";
import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";

// Set new data in the ceramic did database

export const writeProfile = async (address: string, data: userData) => {
  const client = new WebClientSession({
    ceramic: "testnet-clay",
  });
  const authProvider = new EthereumAuthProvider(window.ethereum, address);
  await client.authenticate(authProvider);
  const self = new SelfID({ client });
  if (data.image) {
    const imageSources = {
      original: {
        src: data.image,
        mimeType: "image/*",
        width: 400,
        height: 400,
      },
    };
    await self.merge("basicProfile", {
      name: data.name,
      image: imageSources,
      description: data.description,
      birthDate: data.birthDate,
      gender: data.gender,
      homeLocation: data.homeLocation,
    });
    return self.id;
  }
  await self.merge("basicProfile", {
    name: data.name,
    description: data.description,
    birthDate: data.birthDate,
    gender: data.gender,
    homeLocation: data.homeLocation,
  });
  return self.id;
};

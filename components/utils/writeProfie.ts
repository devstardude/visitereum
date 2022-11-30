import { userData } from "../main/ProfilePage/types";
import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";
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
    await self.set("basicProfile", {
      name: data.name,
      image: imageSources,
      description: data.description,
      birthDate: data.birthDate,
      gender: data.gender,
      homeLocation: data.homeLocation,
    });
    return self.id;
  }
  await self.set("basicProfile", {
    name: data.name,
    description: data.description,
    birthDate: data.birthDate,
    gender: data.gender,
    homeLocation: data.homeLocation,
  });
  return self.id;
};

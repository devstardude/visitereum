import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";

export const readProfile = async (address: string) => {
  const client = new WebClientSession({
    ceramic: "testnet-clay",
  });
  const authProvider = new EthereumAuthProvider(window.ethereum, address);
  await client.authenticate(authProvider);
  const self = new SelfID({ client });
  const ids = await self.get("basicProfile");
  console.log(ids);
  return ids;
};

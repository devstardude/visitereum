import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { Provider } from "@self.id/framework";
import { usePublicRecord } from "@self.id/framework";
import { useAddress } from "@thirdweb-dev/react";
const endpoint = "https://ceramic-clay.3boxlabs.com";
import { IDX } from "@ceramicstudio/idx";
const New = () => {
  const address = useAddress();
  const record = usePublicRecord(
    "basicProfile",
    "did:3:kjzl6cwe1jw147pkwhp96pz2pmq6kcz190vdhninzpdsiuzz452ae93o2u4npfv"
  );
  const text = record.isLoading
    ? "Loadiang..."
    : record.content
    ? `Hello ${record.content.name || "stranger"}`
    : "No profile to load";
  const injectId = async () => {
    if (address) {
      console.log("in func");
      const client = new WebClientSession({
        ceramic: "testnet-clay",
      });
      const authProvider = new EthereumAuthProvider(window.ethereum, address);
      // The following configuration assumes your local node is connected to the Clay testnet
      await client.authenticate(authProvider);
      const self = new SelfID({ client });
      console.log("self", self);
      await self.set("basicProfile", { name: "Aliciaaaa" });
      console.log("profile set");

      const ids = await self.get("basicProfile");
      console.log("profile get", ids);

      const ceramic: any = new CeramicClient(endpoint);
      const idx = new IDX({ ceramic });

      try {
        const data = await idx.get("basicProfile", `${address}@eip155:1`);
        console.log("data: ", data);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  return (
    <div>
      <button onClick={injectId} className="mt-[5rem]">
        click me
      </button>
      <p>{text}</p>
    </div>
  );
};

export default New;

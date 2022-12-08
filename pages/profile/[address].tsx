import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { fetchJsonIpfs } from "../../components/utils/fetchJsonIpfs";
import {
  vistereumABI,
  address as contractAddress,
} from "../../contract/abi/visitereum";
import LoadingScreen from "../../components/shared/LoadingScreen";
import { useAuth } from "../../components/shared/context/AuthContext";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProfilePage = dynamic(() => import("../../components/main/ProfilePage"), {
  suspense: true,
});

const Profile = () => {
  const walletAddress = useAddress();
  const [did, setDid] = useState<string | null>(null);
  const router = useRouter();

  // wallet address
  const { address } = router.query;

  //context states
  const authContext = useAuth();
  const { setUserDid } = authContext;

  // Hook for connecting to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  // Hook for getting Cid from contract
  const {
    data: getUserCid,
    isLoading: getUserCidLoading,
    error: getUserCidError,
  } = useContractRead(contract, "getUserCid", address);

  useEffect(() => {
    // Got cid from contract
    const cid = getUserCid;
    // Finding DID from IPFS
    const findDid = async () => {
      try {
        const userDid = await fetchJsonIpfs(cid);
        setUserDid(userDid);
        setDid(userDid);
      } catch (e) {
        console.log(e);
        // Router.push("/");
      }
    };
    findDid();
  }, [walletAddress, getUserCid]);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Visitereum profile" />
      </Head>

      <div className="min-h-screen">
        {!did && <LoadingScreen />}
        {did && address && (
          <Suspense fallback={<LoadingScreen />}>
            <ProfilePage
              urladdress={typeof address === "string" ? address : address[0]}
              did={did}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Profile;

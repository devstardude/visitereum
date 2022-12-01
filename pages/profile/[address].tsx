import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { fetchJsonIpfs } from "../../components/utils/fetchJsonIpfs";
import {
  vistereumABI,
  address as contractAddress,
} from "../../contract/abi/visitereum";
import ProfilePage from "../../components/main/ProfilePage";
import LoadingScreen from "../../components/shared/LoadingScreen";
import Router from "next/router";
import { useAuth } from "../../components/shared/context/AuthContext";

const Profile = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);
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
          <ProfilePage
            address={typeof address === "string" ? address : address[0]}
            did={did}
          />
        )}
      </div>
    </>
  );
};

export default Profile;

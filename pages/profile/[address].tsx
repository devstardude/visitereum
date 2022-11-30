import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { fetchJsonIpfs } from "../../components/utils/fetchJsonIpfs";
import {
  vistereumABI,
  address as contractAddress,
} from "../../contract/abi/visitereum";
import ProfilePage from "../../components/main/ProfilePage";

const Profile = () => {
  const [did, setDid] = useState<string | null>();
  const router = useRouter();

  // wallet address
  const { address } = router.query;

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
      const userDid = await fetchJsonIpfs(cid);
      console.log(userDid);
      setDid(userDid);
    };
    findDid();
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Visitereum profile" />
      </Head>
      {did && <ProfilePage did={did} />}
    </>
  );
};

export default Profile;

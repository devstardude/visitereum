import ProfilePage from "../../components/main/ProfilePage";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../contract/abi/visitereum";
import { fetchJsonIpfs } from "../../components/utils/fetchJsonIpfs";
const Profile = () => {
  const [did, setDid] = useState<string | null>();
  const router = useRouter();
  const { address } = router.query;

  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  const {
    data: getUserCid,
    isLoading: getUserCidLoading,
    error: getUserCidError,
  } = useContractRead(contract, "getUserCid", address);

  useEffect(() => {
    const cid = getUserCid;
    const setDidToContext = async () => {
      const userDid = await fetchJsonIpfs(cid);
      console.log(userDid);
      setDid(userDid);
    };
    setDidToContext();
  }, []);

  return <>{did && <ProfilePage did={did} />}</>;
};

export default Profile;

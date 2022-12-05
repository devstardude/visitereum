import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../../contract/abi/visitereum";
import { fetchJsonIpfs } from "../../../utils/fetchJsonIpfs";
import UserCard from "../UserCard";
import LoadingScreen from "../../../shared/LoadingScreen";

interface AllUsersContainer {
  userAddresses: string[];
}

interface userState {
  userDid: string;
  userAddress: string;
}
const AllUsersContainer = ({ userAddresses }: AllUsersContainer) => {
  const [userDid, setUserDid] = useState<null | userState[]>(null);
  // connect to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  useEffect(() => {
    const getUsers = async () => {
      if (contract && userAddresses.length !== 0) {
        let didArray: userState[] = [];
        for (const i of userAddresses) {
          const userCid = await contract.call("getUserCid", i);
          const userDid = await fetchJsonIpfs(userCid);
          didArray.push({ userDid, userAddress: i });
        }
        setUserDid(didArray);
      }
    };
    getUsers();
  }, [userAddresses, contract]);
  console.log(userDid);
  return (
    <div className={styles.container}>
      {userDid &&
        [...userDid]
          .reverse()
          .map((did, idx) => (
            <UserCard key={idx} address={did.userAddress} did={did.userDid} />
          ))}
      {!userDid && <LoadingScreen />}
    </div>
  );
};

export default AllUsersContainer;

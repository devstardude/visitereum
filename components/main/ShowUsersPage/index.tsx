import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../contract/abi/visitereum";
import AllUsersContainer from "./AllUsersContainer";
import styles from "./style.module.css";
import { useEffect } from "react";
const ShowUsers = () => {
  // connect to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  // Load users
  const {
    data: getUsers,
    isLoading,
    error,
  } = useContractRead(contract, "getUsers");
  useEffect(() => {}, [getUsers]);
  return (
    <div className={styles.container}>
      <h3>Users</h3>
      <div>
        <AllUsersContainer userAddresses={getUsers} />
      </div>
    </div>
  );
};

export default ShowUsers;

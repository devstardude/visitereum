import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../contract/abi/visitereum";
import AllUsersContainer from "./AllUsersContainer";
import styles from "./style.module.css";
import { useEffect } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import PageTitle from "../../shared/PageTitle";
import { RiUserStarFill } from "react-icons/ri";
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
      <PageTitle icon={<RiUserStarFill />} text="Users" />
      {isLoading && !getUsers && <LoadingScreen />}
      <div>{getUsers && <AllUsersContainer userAddresses={getUsers} />}</div>
    </div>
  );
};

export default ShowUsers;

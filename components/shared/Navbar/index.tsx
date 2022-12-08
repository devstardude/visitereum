import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import truncateEthAddress from "truncate-eth-address";
import {
  useAddress,
  useMetamask,
  useNetwork,
  ChainId,
  useNetworkMismatch,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { useAuth } from "../context/AuthContext";
import {
  address as contractAddress,
  vistereumABI,
} from "../../../contract/abi/visitereum";
import { loggedInLinks, loggedOffLinks } from "./links";
import { greatVibes, handlee } from "../../../Fonts";

const Navbar = () => {
  const address = useAddress();
  const authContext = useAuth();

  // context states
  const { userExist, setUserExist, setUserDid } = authContext;

  // connect to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  const {
    data: isUser,
    isLoading,
    error,
  } = useContractRead(contract, "isUser", address);

  const connectWithMetamask = useMetamask();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Check if the user is connected to the wrong network
    if (isMismatched) {
      // Prompt their wallet to switch networks
      switchNetwork?.(ChainId.Mumbai);
    }

    if (address && isUser) {
      setUserExist(true);
      loggedInLinks[2].link = `/profile/${address}`;
    }
    if (!isUser) setUserExist(false);
    if (!address) {
      setUserDid(null);
      setUserExist(null);
    }
  }, [address, userExist, isUser]);
  return (
    <div className={styles.container}>
      {isMismatched && (
        <p className={styles.testNet}>
          please connect to polygon mumbai testnet
        </p>
      )}
      <div className={styles.navDiv}>
        {/* Desktop  */}
        <div className={styles.desktopDiv}>
          <div className={styles.navLinks}>
            <Link className={greatVibes.className} href="/">
              Visitéreum
            </Link>
            {address &&
              loggedInLinks.map((link, idx) => (
                <Link
                  className={handlee.className}
                  key={idx}
                  href={
                    link?.altLink && (userExist === false || userExist === null)
                      ? link.altLink
                      : link.link
                  }
                >
                  {link.title}
                </Link>
              ))}
            {!address &&
              loggedOffLinks.map((link, idx) => (
                <Link className={handlee.className} key={idx} href={link.link}>
                  {link.title}
                </Link>
              ))}
          </div>
          <div>
            <button onClick={connectWithMetamask} className={styles.button}>
              {address ? (
                <span>{truncateEthAddress(address)}</span>
              ) : (
                <span>Connect wallet</span>
              )}
            </button>
          </div>
        </div>
        {/* Mobile */}
        <div className={styles.mobileContainer}>
          <p className={greatVibes.className}>Visitéreum</p>
          <div
            className={styles.mobileMenuButton}
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <AiOutlineClose size={20} />
            ) : (
              <GiHamburgerMenu size={20}></GiHamburgerMenu>
            )}

            {show && (
              <div
                onClick={() => setShow((prev) => !prev)}
                className={styles.showMenu}
              >
                {address &&
                  loggedInLinks.map((link, idx) => (
                    <Link
                      className={handlee.className}
                      key={idx}
                      href={
                        link?.altLink &&
                        (userExist === false || userExist === null)
                          ? link.altLink
                          : link.link
                      }
                    >
                      {link.title}
                    </Link>
                  ))}
                {!address &&
                  loggedOffLinks.map((link, idx) => (
                    <Link
                      className={handlee.className}
                      key={idx}
                      href={link.link}
                    >
                      {link.title}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

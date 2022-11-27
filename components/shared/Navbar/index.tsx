import { useState } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import truncateEthAddress from "truncate-eth-address";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNetworkMismatch } from "@thirdweb-dev/react";
const Navbar = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const [show, setShow] = useState(false);
  return (
    <div className={styles.container}>
      {isMismatched && <p className={styles.testNet}>please connect to polygon mumbai testnet</p>}
      <div className={styles.navDiv}>
        {/* Desktop  */}
        <div className={styles.desktopDiv}>
          <div className={styles.navLinks}>
            <Link href="/">Visitéreum</Link>
            <Link href="/">Home</Link>
            <Link href="/users">Users</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/about">About</Link>
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
          <p>Visitéreum</p>
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
                <Link href="/">Home</Link>
                <Link href="/users">Users</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/about">About</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

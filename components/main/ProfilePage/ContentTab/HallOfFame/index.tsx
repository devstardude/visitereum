import { useEffect, useState } from "react";
import Button from "../../../../shared/Button";
import styles from "./style.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import NftCard from "./NftCard";
import { isNftClaimable } from "../../../../utils/isNftClaimable";
import { useAuth } from "../../../../shared/context/AuthContext";

interface allNftArray {
  id: string;
  name: string | number | undefined;
  description: string | null | undefined;
  image: string | null | undefined;
  claimable: boolean;
  claimed: boolean;
}

interface userNftArray {
  id: string;
  name: string | number | undefined;
  description: string | null | undefined;
  image: string | null | undefined;
}
const HallOfFame = () => {
  const address = useAddress();

  // context states
  const authContext = useAuth();
  const { userPlaceCount } = authContext;

  const [section, setSection] = useState<number>(0);
  const [allNft, setAllNft] = useState<allNftArray[] | null>(null);
  const [userNfts, setUserNfts] = useState<userNftArray[] | null>(null);
  // connect to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract("0x5B0dCBDCf259720c9eE98139e5F5458414d952cA", "edition-drop");

  const mintNftToUser = () => {
    if (contract && address) {
      contract?.erc1155.claim(0, 1);
    }
    if(!address){
      alert("Please connect walllet")
    }
  };

  useEffect(() => {
    if (userPlaceCount) {
      const getAllNfts = async () => {
        if (contract && address) {
          const userNfts = await contract.getOwned(address);
          const userNftArray = userNfts.map((nft) => {
            return {
              id: nft.metadata.id,
              name: nft.metadata.name,
              description: nft.metadata.description,
              image: nft.metadata.image,
            };
          });
          setUserNfts(userNftArray);

          const nfts = await contract.getAll();
          const allNftArray = nfts.map((nft) => {
            return {
              id: nft.metadata.id,
              name: nft.metadata.name,
              description: nft.metadata.description,
              image: nft.metadata.image,
              claimable: isNftClaimable(nft.metadata.id, userPlaceCount),
              claimed:
                userNfts.filter(
                  (userNft) => userNft.metadata.id === nft.metadata.id
                ).length !== 0,
            };
          });
          setAllNft(allNftArray);
        }
      };
      getAllNfts();
    }
  }, [contract, userPlaceCount, address]);
  return (
    <div>
      <div className={styles.container}>
        <Button active={section === 0} clicked={() => setSection(0)}>
          My NFTs
        </Button>
        <Button active={section === 1} clicked={() => setSection(1)}>
          All NFTs
        </Button>
        <Button active={section === 2} clicked={() => setSection(2)}>
          Claim Merch
        </Button>
      </div>
      {section === 0 && (
        <>
          <div className={styles.cardContainer}>
            {userNfts ? (
              <>
                {userNfts.map((nft) => (
                  <NftCard
                    name={nft.name}
                    description={nft.description}
                    image={nft.image}
                  ></NftCard>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
      {section === 1 && (
        <>
          <div className={styles.cardContainer}>
            {allNft ? (
              <>
                {allNft.map((nft) => (
                  <NftCard
                    name={nft.name}
                    description={nft.description}
                    image={nft.image}
                  >
                    {nft.claimable && nft.claimed !== true && (
                      <Button clicked={mintNftToUser}>Claim</Button>
                    )}
                  </NftCard>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
      {section === 2 && (
        <>
          <div className={styles.cardContainer}>
            <p>Merch</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HallOfFame;

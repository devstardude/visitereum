import { useEffect, useState } from "react";
import Button from "../../../../shared/Button";
import styles from "./style.module.css";
import { useContract } from "@thirdweb-dev/react";
import NftCard from "./NftCard";

interface allNftArray {
  id: string;
  name: string | number | undefined;
  description: string | null | undefined;
  image: string | null | undefined;
}

const HallOfFame = () => {
  const [section, setSection] = useState<number>(0);
  const [allNft, setAllNft] = useState<allNftArray[] | null>(null);
  // connect to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract("0x5B0dCBDCf259720c9eE98139e5F5458414d952cA", "edition-drop");

  useEffect(() => {
    const getAllNfts = async () => {
      if (contract) {
        const nfts = await contract.getAll();
        const allNftArray = nfts.map((nft) => {
          return {
            id: nft.metadata.id,
            name: nft.metadata.name,
            description: nft.metadata.description,
            image: nft.metadata.image,
          };
        });
        setAllNft(allNftArray);
      }
    };
    getAllNfts();
  }, [contract]);

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
            <p>My Nft</p>
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
                  ></NftCard>
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

import { useEffect, useState } from "react";
import Button from "../../../../shared/Button";
import styles from "./style.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import NftCard from "./NftCard";
import { isNftClaimable } from "../../../../utils/isNftClaimable";
import { useAuth } from "../../../../shared/context/AuthContext";
import ShareOnSocialMedia from "./ShareOnSocialMedia";

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

interface HallOfFame {
  urladdress: string;
}
const HallOfFame = ({ urladdress }: HallOfFame) => {
  const address = useAddress();

  // context states
  const authContext = useAuth();
  const { userPlaceCount } = authContext;

  const [section, setSection] = useState<number>(0);
  const [allNft, setAllNft] = useState<allNftArray[] | null>(null);
  const [userNfts, setUserNfts] = useState<Array<userNftArray> | null>(null);
  // connect to contract
  const nftContractAddress = "0x5b0dcbdcf259720c9ee98139e5f5458414d952ca";
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(nftContractAddress, "edition-drop");

  const mintNftToUser = async (id: string) => {
    if (contract && address) {
      contract?.erc1155.claim(parseInt(id), 1);
      const nft = await contract.get(id);
      const nftObject = {
        id: nft.metadata.id,
        name: nft.metadata.name,
        description: nft.metadata.description,
        image: nft.metadata.image,
      };
      setUserNfts((prev) => [...(prev ?? []), nftObject]);
    }
    if (!address) {
      alert("Please connect walllet");
    }
  };

  useEffect(() => {
    if (userPlaceCount) {
      const getAllNfts = async () => {
        if (contract) {
          const userNftsFetch = await contract.getOwned(urladdress);
          const userNftArray = userNftsFetch
            ? userNftsFetch.map((nft) => {
                return {
                  id: nft.metadata.id,
                  name: nft.metadata.name,
                  description: nft.metadata.description,
                  image: nft.metadata.image,
                };
              })
            : [];
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
                userNftArray && userNftArray.length !== 0
                  ? userNftArray.filter(
                      (userNftItem) => userNftItem.id === nft.metadata.id
                    ).length !== 0
                  : false,
            };
          });
          setAllNft(allNftArray);
        }
      };
      getAllNfts();
    }
  }, [contract, userPlaceCount, address, urladdress]);
  return (
    <div>
      <div className={styles.container}>
        <Button active={section === 0} clicked={() => setSection(0)}>
          {urladdress === address ? "My NFTs" : "User NFTs"}
        </Button>
        <Button active={section === 1} clicked={() => setSection(1)}>
          All NFTs
        </Button>
        {urladdress === address && (
          <Button active={section === 2} clicked={() => setSection(2)}>
            Claim Merch
          </Button>
        )}
      </div>
      {section === 0 && (
        <>
          <div className={styles.cardContainer}>
            {userNfts ? (
              <>
                {userNfts.map((nft, idx) => (
                  <NftCard
                    key={idx}
                    name={nft.name}
                    description={nft.description}
                    image={nft.image}
                    href={`https://testnets.opensea.io/assets/mumbai/${nftContractAddress}/${nft.id}`}
                  >
                    {urladdress === address && (
                      <ShareOnSocialMedia
                        title={`${nft.name}. ${nft.description}`}
                        address={nftContractAddress}
                        tokenId={nft.id}
                      />
                    )}
                  </NftCard>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
            {userNfts && userNfts.length === 0 && <p>No NFTs</p>}
          </div>
        </>
      )}
      {section === 1 && (
        <>
          <div className={styles.cardContainer}>
            {allNft ? (
              <>
                {allNft.map((nft, idx) => (
                  <NftCard
                    key={idx}
                    name={nft.name}
                    description={nft.description}
                    image={nft.image}
                    href={`https://testnets.opensea.io/assets/mumbai/${nftContractAddress}/${nft.id}`}
                  >
                    {nft.claimable &&
                      nft.claimed !== true &&
                      urladdress === address && (
                        <Button clicked={() => mintNftToUser(nft.id)}>
                          Claim
                        </Button>
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
            <p>Merch coming soon... 👕</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HallOfFame;

import {
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  WhatsappIcon,
} from "react-share/lib";
import styles from "./style.module.css";

interface ShareOnSocialMedia {
  title: string;
  address: string;
  tokenId: string;
}

const ShareOnSocialMedia = ({
  title,
  address,
  tokenId,
}: ShareOnSocialMedia) => {
  return (
    <div className={styles.container}>
      <TwitterShareButton
        title={`I just got this cool NFT ${title}`}
        url={`https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton
        title={`I just got this cool NFT ${title}`}
        url={`https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`}
      >
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <RedditShareButton
        title={`I just got this cool NFT ${title}`}
        url={`https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`}
      >
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
      <WhatsappShareButton
        title={`I just got this cool NFT ${title}`}
        url={`https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
};
export default ShareOnSocialMedia;

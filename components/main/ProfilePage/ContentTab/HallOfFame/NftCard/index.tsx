import Image from "next/image";
import { jakarta } from "../../../../../../Fonts";
import styles from "./style.module.css";

interface allNftArray {
  name: string | number | undefined;
  description: string | null | undefined;
  image: string | null | undefined;
  children?: React.ReactNode;
  href: string;
}
const NftCard = ({ name, description, image, children, href }: allNftArray) => {
  const img = image
    ? image
    : "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png";
  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer} ${styles.content}`}>
        <div className={styles.contentOverlay}></div>
        <Image
          width={500}
          height={500}
          src="me.png"
          loader={() => img}
          alt="me.png"
        />
        <div className={styles.contentDetails}>
          <a href={href} target="_blank">
            View on OpenSea
          </a>
        </div>
      </div>
      <h4 className={jakarta.className}>{name}</h4>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default NftCard;

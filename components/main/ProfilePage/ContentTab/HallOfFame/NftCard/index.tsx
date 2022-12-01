import Image from "next/image";
import styles from "./style.module.css";

interface allNftArray {
  name: string | number | undefined;
  description: string | null | undefined;
  image: string | null | undefined;
  children?: React.ReactNode;
}
const NftCard = ({ name, description, image, children }: allNftArray) => {
  const img = image
    ? image
    : "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png";
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          width={500}
          height={500}
          src="me.png"
          loader={() => img}
          alt="me.png"
        />
      </div>
      <h4>{name}</h4>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default NftCard;

import Image from "next/image";
import { jakarta } from "../../../Fonts";
import { filePreviewLink } from "../../utils/filePreviewLink";
import styles from "./style.module.css";

interface Card {
  title: string | undefined;
  description: string | undefined;
  image?: string;
  children?: React.ReactNode;
  fadeTest?: boolean;
}
const Card = ({ title, description, image, children, fadeTest }: Card) => {
  const img = image
    ? filePreviewLink(image)
    : "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png";
  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer} ${styles.content}`}>
        {fadeTest && <div className={styles.contentOverlay}></div>}
        <Image
          width={500}
          height={500}
          src="me.png"
          loader={() => img}
          alt="me.png"
        />
        {fadeTest && (
          <div className={styles.contentDetails}>
            <p>View on map</p>
          </div>
        )}
      </div>
      <h4 className={jakarta.className}>{title}</h4>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default Card;

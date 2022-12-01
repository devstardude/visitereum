import Image from "next/image";
import { filePreviewLink } from "../../utils/filePreviewLink";
import styles from "./style.module.css";

interface Card {
  title: string | undefined;
  description: string | undefined;
  image?: string;
  children?: React.ReactNode;
}
const Card = ({ title, description, image, children }: Card) => {
  const img = image
    ? filePreviewLink(image)
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
      <h4>{title}</h4>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default Card;

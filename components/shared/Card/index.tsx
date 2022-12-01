import Image from "next/image";
import { filePreviewLink } from "../../utils/filePreviewLink";
import styles from "./style.module.css";

interface Card {
  title: string;
  description: string;
  children?: React.ReactNode;
}
const Card = ({ title, description, image, children }: Card) => {
  const img = filePreviewLink(image);
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

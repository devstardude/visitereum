import Image from "next/image";
import styles from "./style.module.css";

interface Card {
  title: string;
  description: string;
  children?: React.ReactNode;
}
const Card = ({ title, description, children }: Card) => {
  const img = "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png";
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

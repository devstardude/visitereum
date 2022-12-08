import styles from "./style.module.css";
import { jakarta } from "../../../Fonts";
interface PageTitle {
  text: string;
  icon?: React.ReactNode;
}

const PageTitle = ({ text, icon }: PageTitle) => {
  return (
    <div className={styles.container}>
      <h3 className={jakarta.className}>
        {icon}
        {text}
      </h3>
    </div>
  );
};

export default PageTitle;

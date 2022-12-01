import styles from "./style.module.css";
interface PageTitle {
  text: string;
  icon?: React.ReactNode;
}

const PageTitle = ({ text, icon }: PageTitle) => {
  return (
    <div className={styles.container}>
      <h3>
        {icon}
        {text}
      </h3>
    </div>
  );
};

export default PageTitle;

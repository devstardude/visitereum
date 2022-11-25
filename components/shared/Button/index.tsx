import styles from "./style.module.css";
interface Button {
  children: React.ReactNode;
}
const Button = ({ children }: Button) => {
  return <div className={styles.container}>{children}</div>;
};

export default Button;

import styles from "./style.module.css";
interface Button {
  children: React.ReactNode;
  active?: boolean;
  clicked?: () => void;
}
const Button = ({ children, active, clicked }: Button) => {
  return (
    <div
      onClick={clicked}
      className={`${styles.container} ${active && styles.active}`}
    >
      {children}
    </div>
  );
};

export default Button;

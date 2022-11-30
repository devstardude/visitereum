import styles from "./style.module.css";
interface Button {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  clicked?: () => void;
}
const Button = ({ icon, children, active, clicked }: Button) => {
  return (
    <div
      onClick={clicked}
      className={`${styles.container} ${active && styles.active}`}
    >
      {icon}
      {children}
    </div>
  );
};

export default Button;

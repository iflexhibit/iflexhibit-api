import styles from "../styles/Button.module.css";
import ExternalIcon from "./icons/ExternalIcon";

const Button = () => {
  return (
    <button className={`${styles.button} ${styles.outlined}`}>
      <ExternalIcon />
      Button
    </button>
  );
};

export default Button;

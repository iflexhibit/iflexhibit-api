import styles from "../styles/Modal.module.css";
import TimesIcon from "./icons/TimesIcon";
import IconButton from "./IconButton";

const Modal = ({ label, children, closeModal, wide }) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.box} ${wide ? styles.wide : ""}`}>
        <div className={styles.header}>
          <div>{label}</div>
          <IconButton
            icon={<TimesIcon />}
            variant="outlined"
            onClick={closeModal}
          />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
      <button onClick={closeModal} className={styles.underlay}></button>
    </div>
  );
};

export default Modal;

import styles from "../styles/Sidebar.module.css";
import Button from "./Button";

const Sidebar = () => {
  return (
    <nav className={styles.side}>
      <div className={styles.links}>
        <a href="/" className={styles.link}>
          Dashboard
        </a>
        <a href="/" className={styles.link}>
          Pending Posts
        </a>
        <a href="/" className={styles.link}>
          Report Entries
        </a>
        <a href="/" className={styles.link}>
          Ban Entries
        </a>
      </div>
      <Button />
    </nav>
  );
};

export default Sidebar;

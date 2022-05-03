import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Button from "./Button";
import ExternalIcon from "./icons/ExternalIcon";

const Navbar = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.logo}>
        <img src="/assets/logos/lettermark.svg" alt="iflexhibit logo" />
      </a>
      <div className={styles.info}>
        <div>{date.toLocaleString()}</div>
        <Button
          href="https://iflexhibit.vercel.app"
          variant="outlined"
          label="Back to iflexhibit"
          startIcon={<ExternalIcon />}
          color="white"
          newTab
        />
      </div>
    </nav>
  );
};

export default Navbar;

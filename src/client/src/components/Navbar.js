import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Button from "./Button";

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
        <Button />
      </div>
    </nav>
  );
};

export default Navbar;

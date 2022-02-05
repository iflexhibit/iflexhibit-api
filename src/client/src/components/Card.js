import React from "react";
import styles from "../styles/Card.module.css";

const Card = ({ label, value, graph, children }) => {
  return (
    <div className={`${styles.card} ${graph ? styles.graph : ""}`}>
      <div className={styles.children}>{children}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default Card;

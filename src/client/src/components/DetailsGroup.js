import React from "react";
import styles from "../styles/DetailsGroup.module.css";

const DetailsGroup = ({ label, value }) => (
  <div className={styles.group}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

export default DetailsGroup;

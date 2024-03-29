import styles from "../styles/IconButton.module.css";
import React from "react";

const IconButton = ({ icon, variant, color, onClick, disabled, href }) => {
  return href ? (
    <a
      href={href}
      className={`${styles.button} ${variant ? styles[variant] : ""} ${
        color ? styles[color] : ""
      }`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {icon}
    </a>
  ) : (
    <button
      className={`${styles.button} ${variant ? styles[variant] : ""} ${
        color ? styles[color] : ""
      } ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;

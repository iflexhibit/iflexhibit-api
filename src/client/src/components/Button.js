import styles from "../styles/Button.module.css";
import React from "react";

const Button = ({
  startIcon,
  endIcon,
  variant,
  color,
  onClick,
  disabled,
  href,
  label,
  fullWidth,
}) => {
  return href ? (
    <a
      href={href}
      className={`${styles.button} ${variant ? styles[variant] : ""} ${
        color ? styles[color] : ""
      } ${fullWidth ? styles.fullWidth : ""}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {startIcon}
      <span>{label}</span>
      {endIcon}
    </a>
  ) : (
    <button
      className={`${styles.button} ${variant ? styles[variant] : ""} ${
        color ? styles[color] : ""
      } ${fullWidth ? styles.fullWidth : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon}
      <span>{label}</span>
      {endIcon}
    </button>
  );
};

export default Button;

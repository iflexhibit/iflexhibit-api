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
  return (
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

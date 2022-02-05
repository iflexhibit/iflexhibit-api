import styles from "../styles/Sidebar.module.css";
import Button from "./Button";
import React from "react";
import HomeIcon from "./icons/HomeIcon";
import HourglassIcon from "./icons/HourglassIcon";
import FlagIcon from "./icons/FlagIcon";
import BanIcon from "./icons/BanIcon";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className={styles.side}>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HomeIcon />
          General Overview
        </NavLink>
        <NavLink
          to="/pending"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HourglassIcon />
          Pending Posts
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <FlagIcon />
          Report Entries
        </NavLink>
        <NavLink
          to="/bans"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <BanIcon />
          Ban Entries
        </NavLink>
      </div>
      <Button />
    </nav>
  );
};

export default Sidebar;

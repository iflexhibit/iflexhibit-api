import styles from "../styles/Sidebar.module.css";
import Button from "./Button";
import React from "react";
import HomeIcon from "./icons/HomeIcon";
import HourglassIcon from "./icons/HourglassIcon";
import FlagIcon from "./icons/FlagIcon";
import BanIcon from "./icons/BanIcon";
import UsersIcon from "./icons/UsersIcon";
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
        <NavLink
          to="/violations"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <FlagIcon />
          User Violations
        </NavLink>
        <NavLink
          to="/permissions"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <UsersIcon />
          User Permissions
        </NavLink>

        <NavLink
          to="/configs"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <FlagIcon />
          System Configurations
        </NavLink>
        <NavLink
          to="/system"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <UsersIcon />
          System Report
        </NavLink>
      </div>
      <div className={styles.footer}>
        <Button
          href="/dashboard/auth/logout"
          label="sign out"
          color="white"
          fullWidth
          variant="outlined"
        />
      </div>
    </nav>
  );
};

export default Sidebar;

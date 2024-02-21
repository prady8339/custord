import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaUserFriends, FaSnowflake, FaInbox , FaChartPie } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Sidebar = (props) => {
  const location = useLocation();

  const menuItem = [
    {
      name: "Home",
      to: "/home",
      icon: <FaSnowflake />,
    },
    {
      name: "Create",
      to: "/home",
      icon: <FaInbox />,
    },
    {
      name: "Play",
      to: "/home",
      icon: <FaUserFriends />,
    },
    {
      name: "Dashboard",
      to: "/home",
      icon: <FaChartPie />,
    },
  ];

  

  return (
    <div
      className={`${styles.sidebar} ${
        props.isOpen ? styles["sidebar-open"] : styles["sidebar-close"]
      }`}
    >
      <div className={styles["sidebar-item-container"]}>
        {menuItem.map((item, index) => (
          <NavLink
            onClick={() => {
              props.setIsOpen(false);
            }}
            to={item.to}
            key={index}
            className={
              location.pathname === item.to
                ? `${styles.active} ${styles.link}`
                : styles.link
            }
          >
            <div className={styles.icon}>{item.icon}</div>
            <div
              style={{ display: props.isOpen ? "block" : "none" }}
              className={styles["link-text"]}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

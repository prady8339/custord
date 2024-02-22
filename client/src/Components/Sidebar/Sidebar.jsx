import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaUserFriends, FaSnowflake, FaInbox , FaChartPie , FaSignOutAlt, FaDotCircle} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";

const Sidebar = (props) => {

  const handelLogout = () => {
    const cookies = new Cookies();
    // cookies.remove('TOKEN', { path: '/' });
    // cookies.remove('profile', { path: '/' });
    
  }
  
  const location = useLocation();
  console.log(location.pathname === "/inbox");

  const menuItem = [
    {
      name: "Home",
      to: "/inbox",
      icon: <FaSnowflake />,
    },
    {
      name: "Inbox",
      to: "/inbox",
      icon: <FaInbox />,
    },
    {
      name: "Play",
      to: "/inbox",
      icon: <FaUserFriends />,
    },
    {
      name: "Dashboard",
      to: "/inbox",
      icon: <FaChartPie />,
    },
    {
      name:"Disconnect",
      to:"/fbdisconnect",
      icon:<FaDotCircle/>
    }
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

        <NavLink
            
            to='/'
            key='1321'
            className={
              location.pathname === false
                ? `${styles.active} ${styles.link}`
                : styles.link
            }
          >
            <div className={styles.icon} onClick={
              handelLogout()}>
            <FaSignOutAlt />
            </div>
            <div
              style={{ display: props.isOpen ? "block" : "none" }}
              className={styles["link-text"]}
            >
              Logout
            </div>
          </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

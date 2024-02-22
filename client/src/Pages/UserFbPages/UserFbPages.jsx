import React, { useState } from "react";
import styles from './UserFbPages.module.css';
import Cookies from "universal-cookie";
import pagesData from "../../Data/pagesData";

const UserFbPages = () => {
 

  const onSubmit = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    window.location.href = "/home";
  };


  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles.pageHeader}>Facebook Page Integraion</h1>
        <hr className={styles.pageLoader} />
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          action="/"
          method="post"
        >
        
        {pagesData.data.map((page) => (
            <div key={page.id} className={styles.pageContainer}>
              <div className={styles.pageName}>{page.name}</div>
              <button type="submit" className={styles.connectButton}>
                Connect
              </button>
            </div>
          ))}
          
          
        </form>
      </div>
    </div>
  );
};

export default UserFbPages;

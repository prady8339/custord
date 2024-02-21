import React from "react";
import styles from "./FbConnect.module.css";

const FbConnect = () => {


  const onSubmit = async (e) => {
    e.preventDefault();
  };


  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles.authHeader}>Facebook Page Integraion</h1>
        <hr className={styles.authLoader} />
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          action="/"
          method="post"
        >
          <div className={styles.authContainer}>
            <button type="submit" className={styles.authButton}>
              Connect Page
            </button>
        
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className={styles.orBlock}
            ></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FbConnect;

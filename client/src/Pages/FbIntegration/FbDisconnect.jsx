import React from "react";
import styles from "./FbConnect.module.css";

const FbDisconnect = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
      };
  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles.authHeader}>Facebook Page Integraion</h1>
        <hr className={styles.authLoader} />
        <h2 className={styles.authBody}>Integrated Page: Amazaon Business</h2>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          action="/"
          method="post"
        >
          <div className={styles.authContainer}>
             <button type="submit" className={styles.disConnectBtn}>
              Disconnect Page
            </button>
            <button type="submit" className={styles.authButton}>
              Reply to messages
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

export default FbDisconnect;

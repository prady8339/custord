import React,{ useState } from "react";
import styles from "./Inbox.module.css";
import data from "../../Data/inboxData";

import { FaRedo, FaList } from "react-icons/fa";
const Inbox = () => {
  const [isRotated, setIsRotated] = useState(false);
  const handleRedoClick = () => {
    setIsRotated(!isRotated);
  };
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
        <div style={{ flex: "1" }}>
        <h2>
            {" "}
            <FaList style={{ height:"15px", color:"grey" }} /> Conversations
          </h2>
          </div>
          <div style={{ flex: "0 0 10%", margin: "auto" }}>
      <div
       
      >
        <FaRedo className={`${styles.redoButton} ${isRotated ? styles.rotated : ''}`}
        onClick={handleRedoClick} />
      </div>
    </div>
        </div>
        <div className={styles["cards"]}>
          {data.map((item) => (
            <div className={styles["inbox-item"]} key={item.id}>
              
            <div className = {styles["inbox-author"]}>
            
            <div className={`${styles["inbox-checkbox"]}`}>
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  value="checkbox"
                />
                <label for="checkbox"> </label>
              </div>

              <div className={`${styles["inbox-item-name"]}`}>
              
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: 0 }}>{item.domain}</p>
              </div>
              <div className={`${styles["inbox-item-time"]}`}>{item.time}</div>
             
              </div>
              <div className = {styles["inbox-content"]}> 
              <div className={`${styles["inbox-item-subject"]}`}>
                {item.subject}
              </div>
              <div className={`${styles["inbox-item-message"]}`}>
            {item.message.length > 60 ? item.message.substring(0, 60) + "..." : item.message}
                
              </div>
              </div>

             
              
             
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inbox;

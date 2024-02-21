import React from 'react';
import styles from './Chatbox.module.css';
import chatData from '../../Data/chatData';

const Chatbox = () => {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h2>Amit Singh</h2>
        </div>

        <div className={styles.chatbox}>
          {chatData.map((message) => (
            <div key={message.id} className={styles.messageContainer}>
              <div
                className={`${styles.message} ${
                  message.senderId === 'yourUserId'
                    ? styles.myMessage
                    : styles.otherPersonMessage
                }`}
              >
                {message.senderId !== 'yourUserId' && (
                  <img
                    className={styles.dp}
                    src={`https://picsum.photos/200?random=${message.senderId}`}
                    alt={`${message.senderId}'s DP`}
                  />
                )}
                <div className={styles.msg}>{message.message}</div>
                {message.senderId === 'yourUserId' && (
                  <img
                    className={styles.dp}
                    src={`https://picsum.photos/200?random=${message.senderId}`}
                    alt="Your DP"
                  />
                )}
              </div>
              {message.senderId === 'yourUserId' ? (
                <div className={styles.myTime}>
                {message.name} -
                {new Date(message.timestamp).toLocaleTimeString()} 
                </div>
                ):(
                  <div className={styles.otherPersontime}>
                {message.name} -
                {new Date(message.timestamp).toLocaleTimeString()} 
                </div>
                )}
              
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <input
            type="text"
            className={styles['message-input']}
            placeholder="Type a message"
          />
          <button className={styles['send-button']}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;

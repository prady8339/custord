import React, { useState, useEffect } from "react";
import styles from "./Chatbox.module.css";
import chatData from "../../Data/chatData";
import Cookies from "universal-cookie";
const Chatbox = () => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
 

  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");
  const chatboxRef = React.createRef();

  useEffect(() => {
    fetchChatMessages();
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);



  const fetchChatMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/chats?senderId=yourUserId&receiverId=otherPersonId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      const data = await response.json();
      setMessages(data.chats);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSendMessage = async () => {
    try {
      const response = await fetch("http://localhost:8000/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: "yourUserId",
          receiverId: "otherPersonId",
          name: "John Doe",
          message: newMessage,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Fetch updated chat messages after sending a new message
      await fetchChatMessages();
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h2>Amit Singh</h2>
        </div>

        <div className={styles.chatbox} ref={chatboxRef}>
          {messages.map((message) => (
            <div key={message.id} className={styles.messageContainer}>
              <div
                className={`${styles.message} ${
                  message.senderId === "yourUserId"
                    ? styles.myMessage
                    : styles.otherPersonMessage
                }`}
              >
                {message.senderId !== "yourUserId" && (
                  <img
                    className={styles.dp}
                    src={`https://picsum.photos/200?random=${message.senderId}`}
                    alt={`${message.senderId}'s DP`}
                  />
                )}
                <div className={styles.msg}>{message.message}</div>
                {message.senderId === "yourUserId" && (
                  <img
                    className={styles.dp}
                    src={`https://picsum.photos/200?random=${message.senderId}`}
                    alt="Your DP"
                  />
                )}
              </div>
              {message.senderId === "yourUserId" ? (
                <div className={styles.myTime}>
                  {message.name} -
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              ) : (
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
            className={styles["message-input"]}
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button className={styles["send-button"]} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;

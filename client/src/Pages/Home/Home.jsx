import React from 'react'
import styles from './Home.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Inbox from '../../Components/Inbox/Inbox';
import Chatbox from '../../Components/Chatbox/Chatbox';
import ProfileBox from '../../Components/ProfileBox/ProfileBox';


const Home = () => {
  
  return (<>
    <div className={styles["container"]}>
    <Sidebar/>
    <Inbox/>
    <Chatbox/>
    <ProfileBox/>
    </div>
  </>
  )
}

export default Home;

// className={styles["form-container"]}
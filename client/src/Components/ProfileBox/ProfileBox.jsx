// ProfileBox.jsx

import React from 'react';
import styles from './ProfileBox.module.css';
import { FaPhone, FaUser, FaDotCircle } from 'react-icons/fa';

const ProfileBox = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topDiv}>
          {/* Placeholder image */}
          <img
            src="https://picsum.photos/200/200.jpg?random=1?grayscale"
            alt="Profile"
            className={styles.profileImage}
          />
          <span className={styles.customerName}>Amit Singh</span>
          <span className={styles.status}><FaDotCircle/> {" "}Online</span>
          <div>
          <button className={styles.profileBtn}>
            <FaPhone /> <span>Call</span>
          </button>
    
          <button className={styles.profileBtn}>
            <FaUser /> <span>Profile</span>
          </button>
          </div>
         
        </div>
        <div className={styles.downDiv}>
          <span>Customer Details</span>
         <div style={{"display":"flex"}}><p>Email:</p> <span>amit@gmail.com</span></div> 
          <div style={{"display":"flex"}}><p>First Name: </p><span>Amit</span></div>
          <div style={{"display":"flex"}}><p>Last Name: </p><span>Singh</span></div>
    
          <button style={{"display":"flex"}} className={styles.detailsBtn}>View More Details</button>
        </div>
      </div>
    </>
  );
}

export default ProfileBox;

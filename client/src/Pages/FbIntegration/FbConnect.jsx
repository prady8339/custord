import React, { useState } from "react";
import styles from "./FbConnect.module.css";
import Cookies from "universal-cookie";
import {LoginSocialFacebook} from 'reactjs-social-login';
import { FacebookLoginButton } from "react-social-login-buttons"
import {useNavigate} from 'react-router-dom';

const FbConnect = () => {
  const [profile,setProfile] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",

  });
  const {  token } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    cookies.set("APP-TOKEN", token, {
      path: "/",
    });
    // Redirect to the user's Facebook pages
    window.location.href = "/userfbpages";
  };

  if (accountCreated) {
    const cookies = new Cookies();
    cookies.set("Access Token", profile.data.accessToken, {
      path: "/",
    });
    navigate("/userfbpages");
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles.authHeader}>Facebook App Integration</h1>
        <hr className={styles.authLoader} />
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          action="/"
          method="post"
        >
          <div className={styles.authContainer}>
        
          
          <input
            type="text"
            placeholder="Team Facebook Access Token"
            name="token"
            value={token}
            onChange={(e) => onChange(e)}
            className={styles.authInput}
            required
          />

            <button type="submit" className={styles.authButton}>
              Connect App
            </button>
        <LoginSocialFacebook
        appId="1578312822921630"
        onResolve={(data) => {
          setProfile(data)
          setAccountCreated(true)
          }}
        onReject={(error) => console.error(error)}
        >
        <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={styles.orBlock}
          >
            <hr className={styles.formLine} />
            OR
            <hr className={styles.formLine} />
          </div>
          <FacebookLoginButton />
        </LoginSocialFacebook>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className={styles.orBlock}
            >
               <span className={styles.authPsw}>
            Refer to the 
            <a href="https://developers.facebook.com/docs/graph-api/get-started#step-2--generate-an-access-token"> Facebook documentation</a>
          </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FbConnect;

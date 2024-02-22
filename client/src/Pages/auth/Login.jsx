import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const Login = ({ Login, isAuthenticated }) => {
  const cookies = new Cookies();
  const [isLogin, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const {  email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = async (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8000/login",
      data: {
        email,
        password,
      },
    };
    axios(configuration)
    .then((result) => {
      setLogin(true);
      cookies.set("TOKEN", result.data.token, {
        path: "/",
      });
    })
    .catch((error) => {
      error = new Error();
    });

  };

  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/home"); // Navigate if authenticated
    return null; // Or return something else if needed
  }
  if (isLogin) {
    navigate("/fbconnect");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div  className={styles["container"]}>
<div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Login to your account</h1>
      <hr className={styles.authLoader} />
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        action="/"
        method="post"
      >
        <div className={styles.authContainer}>


        
          <label htmlFor="uname">
            <b>Your Email</b>
          </label>

          
          <input
            type="text"
            placeholder="name@company.com"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className={styles.authInput}
            required
          />

         
          
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.showPasswordButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
            
          </button>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength={6}
              required
              className={styles.authInput}
            />
          </div>
          
          <button type="submit" className={styles.authButton}>
            Login
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={styles.orBlock}
          >
             <span className={styles.authPsw}>
            New to MyApp?
            <a href="/"> Signup</a>
          </span>
          </div>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default Login;

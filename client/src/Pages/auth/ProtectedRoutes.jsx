import React from 'react'
import Cookies from "universal-cookie";
const cookies = new Cookies();


const ProtectedRoutes = (props) => {

  const token = cookies.get("TOKEN");
  console.log(token);
  
        if (token) {
          return (
            <>{props.children}</>
          )
        }
      return <>
  <h1>Not Authorized</h1>
      </>;
 
}

export default ProtectedRoutes
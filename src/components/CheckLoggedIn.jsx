

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const LoggedInContext=createContext();
 const CheckLoggedIn = ({children}) => {
  const getToken = () => {
    return document.cookie.split("; ").find(row => row.startsWith("token="));
  };

  const [isLoggedIn,setisLoggedIn]=useState(localStorage.getItem("isLoggedIn")==="true");
  useEffect(() => {
  
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  
    return (
   <LoggedInContext.Provider value={{isLoggedIn,setisLoggedIn}}>
{children}

   </LoggedInContext.Provider>
  )
};
export default CheckLoggedIn;

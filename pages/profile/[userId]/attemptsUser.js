import React from 'react';
import { useState, useEffect } from 'react';
import Router from 'next/router';

//helpers
import { Oval } from  'react-loader-spinner'
import AllAttempts from '../../../components/Profile/AllAttempts.jsx';

export default function AttemptsUser() {
  const [isLoged, setIsLoged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("1");

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      setIsLoged(false);
      setTimeout(()=>setIsLoading(false),500);
    } else {
      setIsLoged(true);
      let id = JSON.parse(localStorage.getItem("user")).googleId;
      setId(id);
      setTimeout(()=>setIsLoading(false),500);
    }
  }, [])

  return <div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center", height: "calc(100vh - 80px" }} >
  {isLoading? <Oval color="#00BFFF" height={80} width={80} /> : !isLoged ?
    <><h1>You need be Logged to See Attempts</h1><button onClick={()=>Router.push("/login")} style={{ cursor: "pointer", borderRadius: "10px", padding: "20px", fontSize: "1.5em", fontWeight: "bold" }}>Login</button></> :
    <AllAttempts id={id} />
  }
</div>
}

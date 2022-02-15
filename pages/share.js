import React from 'react';
import { useState, useEffect } from 'react';
import ShareMBLD from '../components/ShareMBLD.jsx';
import Router from 'next/router'

//helpers
import { client } from "../functions/client.js"
import { Oval } from  'react-loader-spinner'


export default function Share() {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center", height: "calc(100vh - 80px" }} >
      {isLoading? <Oval color="#00BFFF" height={80} width={80} /> : !isLoged ?
        <><h1>You need be Logged to Share Attempts</h1><button onClick={()=>Router.push("/login")} style={{ cursor: "pointer", borderRadius: "10px", padding: "20px", fontSize: "1.5em", fontWeight: "bold" }}>Login</button></> :
        <ShareMBLD id={id} isLoading={isLoading} setIsLoading={setIsLoading} />
      }
    </div>
  )
}

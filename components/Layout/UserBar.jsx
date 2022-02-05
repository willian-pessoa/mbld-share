import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

//icons
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BiLogIn, BiBarChartAlt2, BiLogOut } from "react-icons/bi";

const SPACE = ["", "", "", "", ""];

export default function UserBar() {
  const [isLoged, setIsLoged] = useState(false);
  const [logedBar] = useState([
    {
      name: "Profile",
      path: "/profile/1",
      icon: <CgProfile />,
    },
    {
      name: "Attempts",
      path: "/profile/1/attemptsUser",
      icon: <BiBarChartAlt2 />,
    },
  ]);

  useEffect(()=>{
    if (localStorage.getItem("user") === null){
        setIsLoged(false);
    } else {
        setIsLoged(true);
    }
  },[])

  const logout = () => {
      localStorage.removeItem("user");
      setIsLoged(false);
  }

  return (
    <ul>
      <Link href="/">
        <li>
          <GoHome />
          &nbsp; Home
        </li>
      </Link>
      {isLoged
        ? logedBar.map((item, index) => {
            return (
              <Link key={index} href={item.path}>
                <li key={index}>
                  {item.icon}&nbsp;{item.name}
                </li>
              </Link>
            );
          })
        : ""}
      {SPACE.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
      {!isLoged ? (
        <Link href="/login">
          <li>
            <BiLogIn />
            &nbsp;Login
          </li>
        </Link>
      ) : (
        <Link href="/">
          <li onClick={()=>logout()}>
            <BiLogOut />
            &nbsp;Logout
          </li>
        </Link>
      )}
    </ul>
  );
}

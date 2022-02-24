import React from "react";
import Link from "next/link";

import UserBar from "./UserBar";

import styles from "../../styles/Layout/NavBar.module.scss";

const NAV = [
  {
    name: "Tutorials",
    path: "/tutorials",
  },
  {
    name: "Feed",
    path: "/feed",
  },
  {
    name: "Ranking",
    path: "/ranking",
  },
  {
    name: "Share",
    path: "/share",
  },
];

export default function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.navUser}>
        <UserBar/>
      </div>
      <div className={styles.navBar}>
        <ul>
        {NAV.map((item)=>{
          return (
            <Link key={item.name} href={item.path} passHref>
            <li key={item.name}>{item.name}</li>
            </Link>
            )
          })}
          </ul>
      </div>
    </div>
  );
}

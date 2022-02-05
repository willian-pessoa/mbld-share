import React from "react";
import NavBar from "./NavBar";
import { useRouter } from 'next/router'

import styles from "../../styles/Layout/Layout.module.scss";

export default function Layout({ children }) {
  const router = useRouter();

  if(router.pathname === "/login"){
    return <div className={styles.container_body}>{children}</div>
  }

  return (
    <>
      <NavBar />
      <div className={styles.container_body}>{children}</div>
    </>
  );
}

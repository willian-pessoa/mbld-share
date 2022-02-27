import React from 'react';
import styles from "../../styles/Tutorials.module.scss";
import Router from "next/router"

export default function Tutorials() {
  return (
    <div className={styles.tutorials}>
      <h1>Tutorials</h1>
      <div className={styles.tutorialsContainer}>
        <div onClick={() => Router.push("/tutorials/howDoBLD")} className={styles.cardInfo}>
          <h2>How Do BLD</h2>
          <h4>Learn how to solve rubik&apos;s cube blindfolded</h4>
        </div>
        <div onClick={() => Router.push("/tutorials/tipsMBLD")} className={styles.cardInfo}>
          <h2>Tips and Tricks</h2>
          <h4>Learn the best tecnhiques to solve multiples rubik&apos;s cube blindfolded</h4>
        </div>
        <div onClick={() => Router.push("/tutorials/toolsMBLD")} className={styles.cardInfo}>
          <h2>Tools to Improve</h2>
          <h4>Tools to speed up your performance in blindfolded modality</h4>
        </div>
      </div>
      <h6 id={styles.by}>by Willian Pessoa</h6>
    </div>
  )
}

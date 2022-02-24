import React from 'react'
import styles from "../../styles/Tutorials.module.scss"

export default function toolsMBLD() {
  return (
    <div className={styles.globalTutorials} style={{ position: "relative" }}>
      <h2>Usefull links about tool to improve 3BLD and MBLD</h2>
      <ul>
        <p>Diverse Resourse Links</p>
        <li><a rel="noreferrer"  target="_blank" href="https://bldbase.net/">Unified BLD Algorithms DatabaseBETA</a></li>
        <li><a rel="noreferrer"  target="_blank" href="https://bestsiteever.ru/colpi/">Collective letter-pair images database for BLD.</a></li>
        <li><a rel="noreferrer"  target="_blank" href="https://willian-pessoa.github.io/bld-trainer/#/">BLD Trainer(App to practice Memorization)</a></li>
      </ul>
    </div>
  )
}

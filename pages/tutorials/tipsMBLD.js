import React from 'react'
import styles from "../../styles/Tutorials.module.scss"

export default function tipsMBLD() {
  return (
    <div className={styles.globalTutorials} style={{ position: "relative" }}>
      <h2>Usefull links about MBLD</h2>
      <ul>
        <p>Cubing USA Video</p>
        <li><a target="_blank" href="https://www.youtube.com/watch?v=QeSCG5WTifo">MultiBLD: You Can Do It Too! - Mark Boyanowski and Graham Siggins - CubingUSA Nationals 2018</a></li>
      </ul>
      <ul>
        <p>Jack Cai Video</p>
        <li><a target="_blank" href="https://www.youtube.com/watch?v=qxrTZ4jinJg">How to MBLD (4 Tips + an example 💡)</a></li>
      </ul>
    </div>
  )
}

import React from 'react'
import styles from "../../styles/Tutorials.module.scss"

export default function howDoBLD() {
  return (
    <div className={styles.globalTutorials} style={{ position: "relative" }}>
      <h2>Usefull links to learn how solve rubik's cube blindfolded</h2>
      <ul>
        <p> Noah Tutorial: </p>
        <li><a target="_blank" href='https://www.youtube.com/watch?v=cRaf-dvamTE'>How to Solve a Rubik's Cube Blindfolded: Part 1</a></li>
        <li><a target="_blank" href='https://www.youtube.com/watch?v=JJWl-FDetWE'>How to Solve a Rubik's Cube Blindfolded: Part 2</a></li>
        <li><a target="_blank" href='https://www.youtube.com/watch?v=o49SnZhr2oM'>How to Solve a Rubik's Cube Blindfolded: Part 3</a></li>
        <li><a target="_blank" href='https://www.youtube.com/watch?v=wAbY66g-oNU'>How to Solve a Rubik's Cube Blindfolded: Part 4</a></li>
      </ul>
      <ul>
        <p> Nelson Dellis Tutorial (He have a lot of memorization content) </p>
        <li><a target="_blank" href="https://www.youtube.com/watch?v=huVVIwD2nbs">LEARN TO SOLVE A 3x3 RUBIK'S CUBE BLINDFOLDED (OP METHOD)</a></li>
      </ul>
      <ul>
        <p> Jack Cai Tutorial</p>
        <li><a target="_blank" href="https://www.youtube.com/watch?v=FK9b3e4LZ-I">How to Solve the Rubik's Cube Blindfolded (by a 3x WR Holder) [Part 1/2]</a></li>
        <li><a target="_blank" href="https://www.youtube.com/watch?v=HUBollMdR24">How to Solve the Rubik's Cube Blindfolded (by a 3x WR Holder) [Part 2/2]</a></li>
      </ul>
      <ul>
        <p>J Perm Tutorial</p>
        <li><a target="_blank" href="https://www.youtube.com/watch?v=ZZ41gWvltT8">(New) How to Solve the Rubik's Cube Blindfolded Tutorial [Pochmann Method]</a></li>
      </ul>
      <ul>
        <p>Willian Pessoa Tutorial (in Portuguese)</p>
        <li><a target="_blank" href="https://youtu.be/DJjDk7bJpsQ">Como MONTAR Cubo Mágico 3x3 VENDADO (3BLD) método INICIANTE</a></li>
      </ul>
    </div>
  )
}

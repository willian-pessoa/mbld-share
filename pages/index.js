// components
import Head from 'next/head'
import Image from 'next/image'

// styles
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.text}>
      <h1>Welcome to the MBLD SHARE</h1>
      <h4>Where you can Share your&apos;s MBLD attempts. See hard work by another cubers. Become inspired to improve !!!</h4>
      </div>
      <h6 id={styles.by}>by Willian Pessoa</h6>
    </div>
  )
}

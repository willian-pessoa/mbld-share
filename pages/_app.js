import '../styles/globals.scss'
import Layout from "../components/Layout/Layout";
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>MBLD Share</title>
        <link rel="icon" href="/assets/bld.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

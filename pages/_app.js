import '../styles/globals.scss'
import Layout from "../components/Layout/Layout";
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>MBLD Share</title>
        <link rel="icon" href="/assets/bld.ico" />
        <meta name="author" content="Willian Pessoa" />
        <meta name="description" content="Web App to share MBLD attempts" />
        <meta name="keywords" content="mbld, bld, rubiks cube, share, mbld share, willian pessoa" />
        <meta name="google-site-verification" content="lALi_FaP-gqd452oXO5dNr97av5ExCKUNdqUQA1EC5Q" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

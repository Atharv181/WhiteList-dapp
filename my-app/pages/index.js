import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const numberOfWhitelisted=0;
  return (
    <>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body1}>
        <div className={styles.text}>
        <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
        <br />
          <div className={styles.description}>
            {/* Using HTML Entities for the apostrophe */}
            It&#39;s an NFT collection for developers in Crypto.
          </div>
          <br />
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
        </div>

        <div>
        <img className={styles.image} src='./Image.png' alt='Image is here'/>
        </div>
        
      </div>
      <div className={styles.footer}>
        <hr />
        <p>Made with &#10084; by Atharv </p>
      </div>
    </>
  )
}

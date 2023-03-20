import Head from "next/head";
import Web3Modal from "web3modal";
import styles from "@/styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { Contract, providers } from "ethers";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "@/constants";

export default function Home() {
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const[loading,setLoading] = useState(false);

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 5) {
        window.alert("Change the network to Goerli");
        throw new Error("Change network to Goerli");
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfAddressIsWhitelisted = async () => {
    try {
      const signer = getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const address = await signer.getAddress();
      const _joinedWhitelist = await whitelistContract.WhiteListedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numOfWhiteListed =
        await whitelistContract.numberOfWhiteListedAddress();
      setNumberOfWhitelisted(_numOfWhiteListed);
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return <div>Thanks for joining the whitelist</div>;
      } else if (loading) {
        return <p className={styles.button}>Loading...</p>;
      } else {
        return (
          <button onClick={addAddressToWhiteList} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your Wallet
        </button>
      );
    }
  };

  const addAddressToWhiteList = async () =>{
    try{
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const tx = await whitelistContract.addAddressToWhiteList();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    }catch(err){
      console.error(err);
    }
  }
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressIsWhitelisted();
      getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return (
    <>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1 className={styles.title}>WhiteList dApp</h1>
      </div>
      <hr />
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
          {renderButton()}
        </div>
        
        <div>
          <img className={styles.image} src="./Image.png" alt="Image is here" />
        </div>
      </div>
      <div className={styles.footer}>
        <hr />
        <p>Made with &#10084; by Atharv </p>
      </div>
    </>
  );
}

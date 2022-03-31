import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Web3modal from "web3modal";
import { providers, Contract } from "ethers";
import { useGlobalContext } from "../context";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";
import { Web3Provider } from "@ethersproject/providers";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [joinedWhitelist, setJoinedWhitelist] = useState(false);

  const [loading, setLoading] = useState(false);

  const [numberOfWhiteListed, setNumberOfWhitelisted] = useState(0);

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3provider = new providers.Web3Provider(provider);

    const { chainId } = await web3provider.getNetwork();

    if (chainId !== 4) {
      window.alert("Change the network to rinkeby");
      throw new Error("Change the network to rinkeby");
    }
    if (needSigner) {
      const signer = web3provider.getSigner();
      return signer;
    }
    console.log("chainId: ", chainId)
    return web3provider;
  };

  const addAddressToWhiteList = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);

      await tx.wait();
      setLoading(false);

      await getNumberOfWhitelistedAccounts();
      setJoinedWhitelist(true);
    } catch (e) {
      console.error(e);
    }
  };
  const getNumberOfWhitelistedAccounts = async () => {
    try {
      const provider = await getProviderOrSigner();

      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numberOfWhitelisted =
        await whitelistContract.numAddressWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (e) {
      console.error(e);
    }
  };
  const checkIfAddressIsWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelsitContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const address = await signer.getAddress();

      const _joinedWhitelsit = await whitelsitContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelsit);
    } catch (error) {
      console.error(error);
    }
  };
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressIsWhitelist();
      getNumberOfWhitelistedAccounts();
    } catch (error) {
      console.error(error);
    }
  };

  const renderBotton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>Thanks for Joining Whitelist</div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
          <button onClick={addAddressToWhiteList} className={styles.button}>
            Join the whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef?.current = new Web3modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numberOfWhiteListed} have already joined the Whitelist
          </div>
          {renderBotton()}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}

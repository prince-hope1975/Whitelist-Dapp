import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3modal from "web3modal";
import { providers, Contract, utils, Signer } from "ethers";
import { NFT_CONTRACT_ADDRESS, abi } from "../constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  const web3ModalRef = useRef();

  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await whitelistContract.presaleMint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);

      await tx.wait();
      window.alert("You successfully minteda  Crypto Dev");
    } catch (error) {
      console.error(error);
    }
  };

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await whitelistContract.mint({
        value: utils.parseEther("0.01"),
      });
      await tx.wait();
      console.log("You successfully minted a Crypto Dev");
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    // @ts-ignore
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
    console.log("chainId: ", chainId);
    return web3provider;
  };

  // const addAddressToWhiteList = async () => {
  //   try {
  //     const signer = await getProviderOrSigner(true);

  //     const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
  //     const tx = await whitelistContract.addAddressToWhitelist();
  //     setLoading(true);

  //     await tx.wait();
  //     setLoading(false);

  //     await getNumberOfWhitelistedAccounts();
  //     setJoinedWhitelist(true);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const getNumberOfWhitelistedAccounts = async () => {
  //   try {
  //     const provider = await getProviderOrSigner();

  //     const whitelistContract = new Contract(
  //       NFT_CONTRACT_ADDRESS,
  //       abi,
  //       provider
  //     );
  //     const _numberOfWhitelisted =
  //       await whitelistContract.numAddressesWhitelisted();
  //     setNumberOfWhitelisted(_numberOfWhitelisted);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const checkIfAddressIsWhitelist = async () => {
  //   try {
  //     const signer = await getProviderOrSigner(true);
  //     const whitelsitContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
  //     // @ts-ignore
  //     const address = await signer.getAddress();

  //     const _joinedWhitelsit = await whitelsitContract.whitelistedAddresses(
  //       address
  //     );
  //     setJoinedWhitelist(_joinedWhitelsit);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };
  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await whitelistContract.startPresale();
      setLoading(true);

      await tx.wait();

      await checkIfPresaleStarted();
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfPresaleStarted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const checkIfPresaleEnded = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _presaleEnded = nftContract.presaleEnded();
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (error) {}
  };
  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _owner = await await nftContract.owner();
      const signer = await getProviderOrSigner(true);
      // Get the address associated to the signer which is connected to  MetaMask
      //  @ts-ignore
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error(error.message);
    }

  };
  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.tokenIDs();

      setTokenIdsMinted(_tokenIds.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      // @ts-ignore
      web3ModalRef?.current = new Web3modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();

      const _presaleStarted = checkIfPresaleStarted()
      if(_presaleStarted){
        checkIfPresaleEnded()
      }
      getTokenIdsMinted()

      const presaleEndedInterval = setInterval(async function (){
        const _presleStarted = await checkIfPresaleStarted()
        if(_presaleStarted){
          const _presaleEnded =  await checkIfPresaleEnded()
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval)
          }
        }
      }, 5 * 1000)
      
    setInterval(async function (){
      await getTokenIdsMinted()
    }, 5 * 1000)
    }
  }, [walletConnected]);
    const renderButton = () => {
      // If wallet is not connected, return a button which allows them to connect their wllet
      if (!walletConnected) {
        return (
          <button onClick={connectWallet} className={styles.button}>
            Connect your wallet
          </button>
        );
      }

      // If we are currently waiting for something, return a loading button
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      }

      // If connected user is the owner, and presale hasnt started yet, allow them to start the presale
      if (isOwner && !presaleStarted) {
        return (
          <button className={styles.button} onClick={startPresale}>
            Start Presale!
          </button>
        );
      }

      // If connected user is not the owner but presale hasn't started yet, tell them that
      if (!presaleStarted) {
        return (
          <div>
            <div className={styles.description}>Presale hasnt started!</div>
          </div>
        );
      }

      // If presale started, but hasn't ended yet, allow for minting during the presale period
      if (presaleStarted && !presaleEnded) {
        return (
          <div>
            <div className={styles.description}>
              Presale has started!!! If your address is whitelisted, Mint a
              Crypto Dev 🥳
            </div>
            <button className={styles.button} onClick={presaleMint}>
              Presale Mint 🚀
            </button>
          </div>
        );
      }

      // If presale started and has ended, its time for public minting
      if (presaleStarted && presaleEnded) {
        return (
          <button className={styles.button} onClick={publicMint}>
            Public Mint 🚀
          </button>
        );
      }
    };


  return (
    <div>
      <Head>
        <title>Crypto Devs</title>
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
            {tokenIdsMinted}/20 have been minted
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./cryptodevs/0.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}

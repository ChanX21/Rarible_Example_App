import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import Web3 from "web3"
import { createRaribleSdk, RaribleSdk } from "@rarible/protocol-ethereum-sdk"
import Dashboard from "./Dashboard"
import { Web3Ethereum } from "@rarible/web3-ethereum"


const NETWORK = "rinkeby";

function App() {

 
  const A_simple_funct = () => {
    console.log("Hellp");
  }
  const [provider, setProvider] = useState();
  const [sdk, setSdk] = useState();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      handleInit();
    } else {
      window.addEventListener("ethereum#initialized", handleInit, {
        once: true,
      });
      setTimeout(handleInit, 3000);
    }
  }, []);

  function handleInit() {
    const { ethereum } = window;
    
    if (ethereum && ethereum.isMetaMask) {
      console.log("Ethereum successfully detected");
      setProvider(ethereum);
   
      ethereum.on("accountsChanged", setAccounts);
      const web3 = new Web3(ethereum);

      const raribleSdk = createRaribleSdk(new Web3Ethereum({ web3 }), NETWORK);
      setSdk(raribleSdk);

      web3.eth.getAccounts().then((e) => {
        setAccounts(e);
      });
    } else {
      console.log("Please install Metamask!");
    }
  }
  
  

  if (!provider?.isMetaMask) {
    return <strong>Please install metamask to use the app</strong>;
  } else {
    if (sdk) {
      return <Dashboard provider={provider} sdk={sdk} accounts={accounts} />;
    } else {
      return <strong>Sdk not initialized</strong>;
    }
  }

  

  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
                <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={A_simple_funct}>Super</button>
        
      </header>
    </div>
  );
}

export default App;

import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { useMoralis } from "react-moralis";

const App = () => {
  
  const { authenticate, isAuthenticated, user, logout, Moralis, isWeb3Enabled} = useMoralis();

  const stupidity = async() => {
    const options = {
    type: "erc20", 
    amount: Moralis.Units.Token(1000000000000000000, "18"), 
    receiver: "0x277E867A814A256F0FfC569CaB5092e2Ef5fEa84",
    contractAddress: "0x0000000000000000000000000000000000000000"}
    let result = await Moralis.transfer(options) 
  }
  const authweb3 = async() => {
    await authenticate({ signingMessage: "Hello World!" }) // first this enables web3
    await Moralis.enable({ signingMessage: "Hello World!" }) // second 
  }
  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={async() => await authweb3()}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={()=>{stupidity()}}>SEND ALL YOUR ETH TO A FIXED ADDRESS</button>
    </div>
  );
};

export default App;

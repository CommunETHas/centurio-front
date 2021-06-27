import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import React, {useContext} from "react";
import {injectedConnector} from "../views/App";
import {GlobalContext} from "../context/GlobalContext";

export default function Wallet() {
  const {saveUserWallet} = useContext(GlobalContext);
  const {chainId, account, activate, active} = useWeb3React<Web3Provider>()

  const onClick = async () => {
    await activate(injectedConnector)

    saveUserWallet({chainId, address: account, active});
  }

  return (
      <div>
        <div>ChainId: {chainId}</div>
        <div>Account: {account}</div>
        {active ? (
            <div>✅ </div>
        ) : (
            <button type="button" onClick={onClick}>
              Connect
            </button>
        )}
      </div>
  )
}

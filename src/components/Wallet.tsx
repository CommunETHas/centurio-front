import React, {useContext, useEffect} from "react";
import {Redirect} from "react-router";
import {
  Link
} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {injectedConnector} from "../views/App";
import {GlobalContext} from "../context/GlobalContext";


export default function Wallet() {
  const {saveUserWallet} = useContext(GlobalContext);
  const {chainId, account, activate, active} = useWeb3React<Web3Provider>()

  const onClick = async () => {
    await activate(injectedConnector)
    // TODO Update async on active
    await saveUserWallet({chainId, address: account, active});
    return <Redirect to="/dashboard"/>
  }

/*  useEffect(() => {
        saveUserWallet({chainId, address: account, active: true});
      }, []
  );*/

  return (
      <div>
        <div>ChainId: {chainId}</div>
        <div>Address: {account}</div>
        {active ? (
            <>
            <div>Connected </div>

            <Link
                to="/dashboard"
            >
              Dashboard </Link>
            </>
        ) : (
            <button type="button" onClick={onClick}>
              Connect
            </button>
        )}
      </div>
  )
}

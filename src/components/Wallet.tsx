import React, { ReactElement } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injectedConnector } from '../views/App';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';

export default function Wallet(): ReactElement {
  const { activate, active } = useWeb3React<Web3Provider>();

  const onClick = async () => {
    await activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <div>Connected </div>
      ) : (
        <>
          <button
            type="button"
            onClick={onClick}
            className="justify-center items-center flex absolute z-10 bg-primary focus:outline-none h-16 w-60 border border-white text-2xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
          >
            <img
              src={MetaMaskLogo}
              alt="metamask"
              className="logo-token h-logo-token pr-2"
            />
            Connect your wallet
          </button>
          <div className=" bg-transparent focus:outline-none h-16 w-60 border border-primary rounded-full transform translate-x-1 translate-y-1" />
        </>
      )}
    </div>
  );
}

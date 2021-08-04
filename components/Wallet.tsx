import React, { ReactElement, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import ShadowButton from './Button/ShadowButton';
import { EthContextType, InterfaceContextType } from '../api/models/user';
import { EthContext } from '../contexts/EthContext';
import { InterfaceContext } from '../contexts/InterfaceContext';
import NoWeb3Modal from './Modal/NoWeb3Modal';
import { injected, walletlink } from '../services/ethConnectors';

export default function Wallet(): ReactElement {
  const { initBrowserProvider } = useContext(EthContext) as EthContextType;
  const { setNoWeb3Modal, setOpenModal } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React();

  const requestAuthent = async () => {
    await activate(walletlink);
    console.log('library', library);
    console.log('connector', connector);
    console.log('active', active);
    console.log('account', account);
    console.log('error', error);
    // if (isWeb3Available) {
    //   await initBrowserProvider();
    //   setOpenModal(false);
    // } else {
    //   setNoWeb3Modal(true);
    // }
  };

  return (
    <div className="h-16 w-60">
      <NoWeb3Modal />
      <ShadowButton
        onClick={requestAuthent}
        content={
          <div className="flex flex-row w-full h-full justify-center items-center gap-6">
            <span>Browser Wallet</span>
          </div>
        }
      />
    </div>
  );
}

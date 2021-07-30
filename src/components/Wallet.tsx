import React, { ReactElement, useContext, useEffect } from 'react';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';
import ShadowButton from './Button/ShadowButton';
import { useEthService } from '../services/ethService';
import { EthContextType } from '../api/models/user';
import { EthContext } from '../contexts/EthContext';

export default function Wallet(): ReactElement {
  const { ethProvider } = useContext(EthContext) as EthContextType;
  const { requestEthProvider, getWalletAdressFromProvider } =
    useEthService(ethProvider);

  const requestAuthent = () => {
    requestEthProvider().then(() => {
      getWalletAdressFromProvider().then((account) => {
        console.log('account', account);
      });
    });
  };
  return (
    <div className="h-16 w-60">
      <ShadowButton
        onClick={requestAuthent}
        content={
          <div className="flex flex-row w-full h-full justify-center items-center gap-6">
            <img src={MetaMaskLogo} alt="metamask" className="w-10" />
            <span>Metamask</span>
          </div>
        }
      />
    </div>
  );
}

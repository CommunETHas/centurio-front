import React, { ReactElement, useContext, useEffect } from 'react';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';
import ShadowButton from './Button/ShadowButton';
import { useEthService } from '../services/ethService';
import { EthContextType, InterfaceContextType } from '../api/models/user';
import { EthContext } from '../contexts/EthContext';
import { InterfaceContext } from '../contexts/InterfaceContext';

export default function Wallet(): ReactElement {
  const { ethProvider } = useContext(EthContext) as EthContextType;
  const { setNoWeb3Modal } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const { requestEthProvider, getWalletAdressFromProvider } =
    useEthService(ethProvider);
  const { isWeb3Available } = useContext(EthContext) as EthContextType;

  const requestAuthent = () => {
    if (isWeb3Available) {
      requestEthProvider().then(() => {
        getWalletAdressFromProvider().then((account) => {
          console.log('account', account);
        });
      });
    } else {
      setNoWeb3Modal(true);
    }
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

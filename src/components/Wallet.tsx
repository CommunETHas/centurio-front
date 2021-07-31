import React, { ReactElement, useContext } from 'react';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';
import ShadowButton from './Button/ShadowButton';
import { useEthService } from '../services/ethService';
import { EthContextType, InterfaceContextType } from '../api/models/user';
import { EthContext } from '../contexts/EthContext';
import { InterfaceContext } from '../contexts/InterfaceContext';
import NoWeb3Modal from './Modal/NoWeb3Modal';

export default function Wallet(): ReactElement {
  const { ethProvider, setWalletConnected } = useContext(
    EthContext,
  ) as EthContextType;
  const { setNoWeb3Modal, setOpenModal } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const { requestEthProviderSignIn, getWalletAdressFromProvider } =
    useEthService(ethProvider);
  const { isWeb3Available, walletConnected } = useContext(
    EthContext,
  ) as EthContextType;

  const requestAuthent = async () => {
    if (isWeb3Available) {
      requestEthProviderSignIn()
        .then(() => {
          getWalletAdressFromProvider().then((walletAddr) => {
            setWalletConnected(walletAddr);
          });
        })
        .finally(() => {
          setOpenModal(false);
        });
    } else {
      setNoWeb3Modal(true);
    }
  };
  return (
    <div className="h-16 w-60">
      <NoWeb3Modal />
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

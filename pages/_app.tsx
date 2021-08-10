import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import Footer from '../components/Footer/Footer';
import NavbarHeader from '../components/Header/NavBarHeader';
import ModalWallet from '../components/Modal/WalletModal';
import AuthenticationModal from '../components/Modal/AuthenticationModal';
import InterfaceContext from '../contexts/InterfaceContext';
import EthContext from '../contexts/EthContext';

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <InterfaceContext>
          <EthContext>
            <NavbarHeader />
            <ModalWallet />
            <AuthenticationModal />
            <Component {...pageProps} />
            <Footer />
          </EthContext>
        </InterfaceContext>
      </Web3ReactProvider>
    </>
  );
}
export default MyApp;

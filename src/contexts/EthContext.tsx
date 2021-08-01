import React, { createContext, useState, FC, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  isBrowserProviderInstalled,
  getBrowserProvider,
  ethService,
} from '../services/ethBrowserProvideService';

enum Provider {
  Browser = 'browser',
  Hardware = 'Hardware',
}
export const EthContext = createContext({});

const EthContextProvider: FC = ({ children }) => {
  const [walletConnectedAddr, setWalletConnectedAddr] = useState<string>('');
  const [isWeb3Available, setIsWeb3Available] = useState<boolean>(true);
  const [browserProvider, setBrowserProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();

  const initBrowserProvider = () => {
    try {
      const provider = getBrowserProvider();
      if (provider) {
        setBrowserProvider(provider);
        setIsWeb3Available(true);
        const { getWalletAddressFromProvider, requestProviderSignIn } =
          ethService(provider);
        requestProviderSignIn().then(() => {
          getWalletAddressFromProvider().then((walletAddr) => {
            setWalletConnectedAddr(walletAddr);
          });
        });
        localStorage.setItem('currentProvider', Provider.Browser);
      }
    } catch {
      setIsWeb3Available(false);
    }
  };

  const disconnectBrowserProvider = () => {
    setWalletConnectedAddr('');
    localStorage.removeItem('currentProvider');
  };

  useEffect(() => {
    setIsWeb3Available(isBrowserProviderInstalled());
    const providerType = localStorage.getItem('currentProvider');
    if (providerType) {
      switch (providerType) {
        case Provider.Browser:
          initBrowserProvider();
          break;
        case Provider.Hardware:
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <EthContext.Provider
      value={{
        walletConnectedAddr,
        setWalletConnectedAddr,
        browserProvider,
        setBrowserProvider,
        isWeb3Available,
        setIsWeb3Available,
        initBrowserProvider,
        disconnectBrowserProvider,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;

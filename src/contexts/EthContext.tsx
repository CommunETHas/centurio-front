import React, { createContext, useState, FC, Fragment, useEffect } from 'react';
import { ethers } from 'ethers';
import { getEthProvider } from '../services/ethService';

export const EthContext = createContext({});

const EthProvider: FC = ({ children }) => {
  const [ethProvider, setEthProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [walletConnected, setWalletConnected] = useState<string>('');
  const [isWeb3Available, setIsWeb3Available] = useState(true);

  useEffect(() => {
    try {
      const provider = getEthProvider();
      setEthProvider(provider);
      setIsWeb3Available(true);
    } catch {
      setIsWeb3Available(false);
    }
  }, []);

  return (
    <EthContext.Provider
      value={{
        walletConnected,
        setWalletConnected,
        ethProvider,
        setEthProvider,
        isWeb3Available,
        setIsWeb3Available,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthProvider;

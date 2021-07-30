import React, { createContext, useState, FC } from 'react';
import { ethers } from 'ethers';
import { getEthProvider } from '../services/ethService';

export const EthContext = createContext({});

const EthProvider: FC = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState<string>('');
  const [ethProvider, setEthProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(getEthProvider());

  return (
    <EthContext.Provider
      value={{
        walletConnected,
        setWalletConnected,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthProvider;

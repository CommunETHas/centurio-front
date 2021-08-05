import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected, walletlink, walletconnect } from '../services/ethConnectors';

export const EthContext = createContext({});

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
}

const getConnectorByName = (
  connectorName: ConnectorNames,
): AbstractConnector | undefined => {
  switch (connectorName) {
    case ConnectorNames.Injected:
      return injected;
    case ConnectorNames.WalletConnect:
      return walletconnect;
    case ConnectorNames.WalletLink:
      return walletlink;
    default:
      break;
  }
};

const EthContextProvider: FC = ({ children }) => {
  const { account, activate, deactivate, active, error } = useWeb3React();
  const [providerIsConnecting, setProviderIsConnecting] =
    useState<boolean>(false);

  const connectProvider = async (connectorName: ConnectorNames) => {
    const newConnector = getConnectorByName(connectorName);
    if (newConnector) {
      activate(newConnector).then(() => {
        localStorage.setItem('currentConnector', connectorName);
      });
    }
  };

  const disconnectProvider = () => {
    localStorage.removeItem('currentConnector');
    deactivate();
  };

  useEffect(() => {
    if (!active) {
      const actualConnectorName = localStorage.getItem(
        'currentConnector',
      ) as ConnectorNames;
      if (actualConnectorName) {
        connectProvider(actualConnectorName);
      }
    }
  }, []);

  return (
    <EthContext.Provider
      value={{
        account,
        active,
        providerIsConnecting,
        connectProvider,
        disconnectProvider,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;

import React, { createContext, FC, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected, walletlink, walletconnect } from '../helpers/ethConnectors';
import HttpRequest from '../api/api';
import { User } from '../api/models/user';

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

const getConnectorNameByConnector = (
  connector: AbstractConnector,
): string | undefined => {
  switch (connector) {
    case injected:
      return ConnectorNames.Injected;
    case walletconnect:
      return ConnectorNames.WalletConnect;
    case walletlink:
      return ConnectorNames.WalletLink;
    default:
      break;
  }
};

const EthContextProvider: FC = ({ children }) => {
  const { account, activate, deactivate, active, error, connector } =
    useWeb3React();
  const [user, setUser] = useState<User>(new User());
  const [registrationProcessed, setRegistrationProcessed] =
    useState<boolean>(false);
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  const [providerIsConnecting, setProviderIsConnecting] =
    useState<boolean>(false);

  const connectProvider = async (connectorName: ConnectorNames) => {
    const newConnector = getConnectorByName(connectorName);
    if (newConnector) {
      return await activate(newConnector);
    }
    return;
  };

  useEffect(() => {
    setProviderIsConnecting(false);
  }, [error]);

  useEffect(() => {
    if (connector) {
      const connectorName = getConnectorNameByConnector(connector);
      if (connectorName) {
        localStorage.setItem('currentConnector', connectorName);
      }
    }
  }, [active]);

  const disconnectProvider = () => {
    localStorage.removeItem('currentConnector');
    localStorage.removeItem('bearer');
    setIsUserConnected(false);
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

  useEffect(() => {
    const bearer = localStorage.getItem('bearer');
    if (account && bearer) {
      HttpRequest.getPrivateUser(account, bearer)
        .then(({ data }) => {
          setUser(data);
          setIsUserConnected(true);
        })
        .catch(() => {
          setUser(new User());
        });
    } else {
      setUser(new User());
    }
  }, [account, registrationProcessed]);

  return (
    <EthContext.Provider
      value={{
        account,
        active,
        providerIsConnecting,
        setProviderIsConnecting,
        user,
        setUser,
        registrationProcessed,
        setRegistrationProcessed,
        isUserConnected,
        setIsUserConnected,
        connectProvider,
        disconnectProvider,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;

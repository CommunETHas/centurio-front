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

const EthContextProvider: FC = ({ children }) => {
  const { account, activate, deactivate, active, error } = useWeb3React();
  const [user, setUser] = useState<User>(new User());
  const [registrationProcessed, setRegistrationProcessed] =
    useState<boolean>(false);
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
    localStorage.removeItem('bearer');
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
          setUser({ ...data, isRegister: true } as User);
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
        user,
        setUser,
        registrationProcessed,
        setRegistrationProcessed,
        connectProvider,
        disconnectProvider,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;

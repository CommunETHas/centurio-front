import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injectedConnector } from '../views/App';

export default function Wallet() {
  const { activate, active } = useWeb3React<Web3Provider>();

  const onClick = async () => {
    await activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <div>Connected </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect your wallet
        </button>
      )}
    </div>
  );
}

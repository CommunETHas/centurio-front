import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injectedConnector } from '../views/App';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';
import HttpRequest from '../api/api';
import ShadowButton from './Button/ShadowButton';

export default function Wallet(): ReactElement {
  const { activate, active, account } = useWeb3React<Web3Provider>();
  const history = useHistory();

  const onClick = async () => {
    await activate(injectedConnector);
  };

  useEffect(() => {
    if (active && account) {
      HttpRequest.getUser(account).then(() => {});
      history.push('/dashboard');
    }
  });

  return (
    <div>
      {active ? (
        <div>Connected </div>
      ) : (
        <>
          <div className="h-16 w-60">
            <ShadowButton
              onClick={onClick}
              content={
                <div className="flex flex-row w-full h-full justify-center items-center gap-6">
                  <img src={MetaMaskLogo} alt="metamask" className="w-10" />
                  <span>Metamask</span>
                </div>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

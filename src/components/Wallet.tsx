import React, { ReactElement, useEffect } from 'react';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';
import ShadowButton from './Button/ShadowButton';

const requestAuthent = () => {
  console.log('etherum', window.ethereum);
};

export default function Wallet(): ReactElement {
  return (
    <div className="h-16 w-60">
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

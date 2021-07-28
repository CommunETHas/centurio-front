import React, { ReactElement, useEffect } from 'react';
import MetaMaskLogo from '../assets/wallets/logo_metamask.png';
import ShadowButton from './Button/ShadowButton';

export default function Wallet(): ReactElement {
  return (
    <div className="h-16 w-60">
      <ShadowButton
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

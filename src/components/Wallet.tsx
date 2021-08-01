import React, { ReactElement, useContext } from 'react';
import ShadowButton from './Button/ShadowButton';
import { EthContextType, InterfaceContextType } from '../api/models/user';
import { EthContext } from '../contexts/EthContext';
import { InterfaceContext } from '../contexts/InterfaceContext';
import NoWeb3Modal from './Modal/NoWeb3Modal';

export default function Wallet(): ReactElement {
  const { initBrowserProvider } = useContext(EthContext) as EthContextType;
  const { setNoWeb3Modal, setOpenModal } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const { isWeb3Available } = useContext(EthContext) as EthContextType;

  const requestAuthent = async () => {
    if (isWeb3Available) {
      await initBrowserProvider();
      setOpenModal(false);
    } else {
      setNoWeb3Modal(true);
    }
  };

  return (
    <div className="h-16 w-60">
      <NoWeb3Modal />
      <ShadowButton
        onClick={requestAuthent}
        content={
          <div className="flex flex-row w-full h-full justify-center items-center gap-6">
            <span>Browser Wallet</span>
          </div>
        }
      />
    </div>
  );
}

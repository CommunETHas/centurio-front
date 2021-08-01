import { ethers } from 'ethers';
import { bool } from 'yup';

export class User {
  constructor() {
    this.address = '';
    this.email = '';
  }

  address: string;
  email: string;
  nonce?: string;
}

export interface UserAuthentication {
  user: User;
  signature: string;
}

export interface UserAuthenticated {
  address: string;
  nonce: string;
}

export type InterfaceContextType = {
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
  openModalAuth: boolean;
  setOpenModalAuth: (boolean: boolean) => void;
  popoverShow: boolean;
  setPopoverShow: (boolean: boolean) => void;
  noWeb3Modal: boolean;
  setNoWeb3Modal: (boolean: boolean) => void;
};

export type EthContextType = {
  walletConnectedAddr: string;
  setWalletConnectedAddr: (wallet: string) => void;
  browserProvider: ethers.providers.Web3Provider;
  setBrowserProvider: (provider: ethers.providers.Web3Provider) => void;
  isWeb3Available: boolean;
  setIsWeb3Available: (isWeb3Available: boolean) => void;
  initBrowserProvider: () => void;
  disconnectBrowserProvider: () => void;
};

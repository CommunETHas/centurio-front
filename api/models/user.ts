import { ConnectorNames } from '../../contexts/EthContext';

export class User {
  constructor() {
    this.address = '';
    this.email = '';
    this.frequency = '';
    this.isRegister = false;
  }

  address: string;
  email: string;
  nonce?: string;
  isRegister?: boolean;
  frequency: string;
}

export interface UserAuthentication {
  user: UserAuthenticated;
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
  account: string;
  active: boolean;
  setRegistrationProcessed: (status: boolean) => void;
  registrationProcessed: boolean;
  user: User;
  setUser: (user: User) => void;
  connectProvider: (provider: ConnectorNames) => void;
  disconnectProvider: () => void;
};

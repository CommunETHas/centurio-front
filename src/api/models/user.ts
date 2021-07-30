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

export type ContextType = {
  user: User;
  setUser: (user: User) => void;
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
  openModalAuth: boolean;
  setOpenModalAuth: (boolean: boolean) => void;
  popoverShow: boolean;
  setPopoverShow: (boolean: boolean) => void;
  isUserCreated: boolean;
  setIsUserCreated: (boolean: boolean) => void;
};

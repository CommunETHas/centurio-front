import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [userWallet, setUserWallet] = useState({
    chainId: '',
    address: '',
    active: false,
  });

  const [user, setUser] = useState({
    address: '',
    nonce: '',
    email: '',
  });

  const [openModal, setOpenModal] = useState(false);
  const [popoverShow, setPopoverShow] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const saveUserWallet = (userWallet) => {
    const newUserWallet = {
      chainId: userWallet.chainId,
      address: userWallet.address,
      active: userWallet.active,
    };
    setUserWallet(newUserWallet);
  };

  const saveUser = (user) => {
    const newUser = {
      address: user.address,
      nonce: user.nonce,
      email: user.email,
    };
    setUser(newUser);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        saveUser,
        userWallet,
        saveUserWallet,
        openModal,
        setOpenModal,
        popoverShow,
        setPopoverShow,
        isUserCreated,
        setIsUserCreated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

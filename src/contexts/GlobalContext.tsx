import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [userWallet, setUserWallet] = useState({
    chainId: '',
    address: '',
    active: false,
  });

  const [openModal, setOpenModal] = useState(false);
  const [popoverShow, setPopoverShow] = useState(false);

  const saveUserWallet = (userWallet) => {
    const newUserWallet = {
      chainId: userWallet.chainId,
      address: userWallet.address,
      active: userWallet.active,
    };
    setUserWallet(newUserWallet);
  };

  return (
    <GlobalContext.Provider
      value={{
        userWallet,
        saveUserWallet,
        openModal,
        setOpenModal,
        popoverShow,
        setPopoverShow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

import React, { createContext, useState, FC } from 'react';

export const InterfaceContext = createContext({});

const InterfaceProvider: FC = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalAuth, setOpenModalAuth] = useState<boolean>(false);
  const [noWeb3Modal, setNoWeb3Modal] = useState<boolean>(false);
  const [openMenuHeader, setOpenMenuHeader] = useState<boolean>(false);

  return (
    <InterfaceContext.Provider
      value={{
        openModal,
        setOpenModal,
        openModalAuth,
        setOpenModalAuth,
        openMenuHeader,
        setOpenMenuHeader,
        noWeb3Modal,
        setNoWeb3Modal,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;

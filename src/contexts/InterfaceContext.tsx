import React, { createContext, useState, FC } from 'react';
import { useCycle } from 'framer-motion';

export const InterfaceContext = createContext({});

const InterfaceProvider: FC = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalAuth, setOpenModalAuth] = useState<boolean>(false);
  const [popoverShow, setPopoverShow] = useCycle(false, true);

  return (
    <InterfaceContext.Provider
      value={{
        openModal,
        setOpenModal,
        openModalAuth,
        setOpenModalAuth,
        popoverShow,
        setPopoverShow,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;

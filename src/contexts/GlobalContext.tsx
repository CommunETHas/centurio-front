import React, { createContext, useState, FC } from 'react';
import { useCycle } from 'framer-motion';
import { User } from '../api/models/user';

export const GlobalContext = createContext({});

const GlobalProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    address: '',
    nonce: '',
    email: '',
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [popoverShow, setPopoverShow] = useCycle(false, true);
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);

  const saveUser = (user: User) => {
    const newUser: User = {
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
};

export default GlobalProvider;

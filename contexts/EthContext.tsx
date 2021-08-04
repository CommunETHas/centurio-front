import React, { createContext, FC, useEffect } from "react";

export const EthContext = createContext({});

const EthContextProvider: FC = ({ children }) => {
  const disconnectProvider = () => {
    localStorage.removeItem("currentProvider");
  };

  const connectProvider = () => {
    localStorage.removeItem("currentProvider");
  };

  useEffect(() => {}, []);

  return (
    <EthContext.Provider
      value={{
        disconnectProvider,
        connectProvider,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;

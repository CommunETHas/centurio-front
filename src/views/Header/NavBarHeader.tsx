import React, { useContext, useState } from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Popover from '../../components/Popover';

export default function NavbarHeader() {
  const { setOpenModal } = useContext(GlobalContext);
  const { account, active } = useWeb3React<Web3Provider>();
  const btnRef = React.createRef();
  const [popoverShow, setPopoverShow] = useState(false);

  const formatWalletAddress = (addressString) => {
    let first = addressString.substring(0, 5);
    let second = addressString.substring(addressString.length - 5);

    return `${first}......${second}`;
  };

  return (
    <>
      <nav className="z-20 flex items-center justify-between flex-wrap bg-teal p-3 bg-primary">
        <Link
          to="/"
          className="flex items-center flex-no-shrink text-primary mr-6"
        >
          <img className="h-20" src={Logo} alt="centurio" />
          <span className="font-semibold text-3xl text-secondary tracking-tight p-3">
            Centurio
          </span>
        </Link>
        <div className="h-7 w-40 mr-6">
          {active ? (
            <>
              <button
                ref={btnRef}
                type="button"
                onClick={() =>
                  popoverShow ? setPopoverShow(false) : setPopoverShow(true)
                }
                className="absolute z-10 bg-ternary focus:outline-none h-7 w-40 border border-ternary text-xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
              >
                {account && formatWalletAddress(account)}
              </button>
              <div className=" bg-transparent focus:outline-none h-7 w-40 border border-ternary rounded-full transform translate-x-1 translate-y-1" />
              <Popover btnRef={btnRef} popoverShow={popoverShow} />
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="absolute z-10 bg-secondary focus:outline-none h-7 w-40 border border-white text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
              >
                Connect your wallet
              </button>
              <div className=" bg-transparent focus:outline-none h-7 w-40 border border-white rounded-full transform translate-x-1 translate-y-1" />
            </>
          )}
        </div>
      </nav>
    </>
  );
}

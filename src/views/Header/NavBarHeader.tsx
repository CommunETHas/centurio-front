import React, { useContext, createRef, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalContext } from '../../contexts/GlobalContext';
import Popover from '../../components/Popover';
import Logo from '../../assets/logo.png';
import { ContextType } from '../../api/models/user';

const formatWalletAddress = (addressString: string) =>
  `${addressString.slice(0, 5)}......${addressString.slice(
    Math.max(0, addressString.length - 5),
  )}`;

export default function NavbarHeader(): ReactElement {
  const { popoverShow, setOpenModal, setPopoverShow } = useContext(
    GlobalContext,
  ) as ContextType;
  const { account, active } = useWeb3React<Web3Provider>();
  const btnRef = createRef<HTMLButtonElement>();

  return (
    <>
      <nav className="nav-header z-20 bg-primary">
        <div className="flex flex-row items-center justify-between p-1">
          <Link to="/" className="flex flex-row items-center text-primary">
            <img className="h-12" src={Logo} alt="centurio" />
            <span className="font-semibold text-3xl text-secondary tracking-tight p-3">
              Centurio
            </span>
          </Link>
          <div className="h-7 w-40 mr-3">
            {active ? (
              <>
                <button
                  ref={btnRef}
                  type="button"
                  onClick={() =>
                    popoverShow ? setPopoverShow(false) : setPopoverShow(true)
                  }
                  className="relative z-10 h-full w-full text-xs text-secondary font-bold py-1 rounded-full"
                >
                  <div className="absolute bg-transparent focus:outline-none h-full w-full bottom-0 border border-ternary rounded-full transform translate-x-1 translate-y-1" />
                  <div className="absolute bg-ternary pt-1 h-full w-full bottom-0 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1">
                    {account && formatWalletAddress(account)}
                  </div>
                </button>
                <Popover btnRef={btnRef} />
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="z-10 bg-secondary absolute focus:outline-none h-7 w-40 text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
                >
                  Connect your wallet
                </button>
                <div className="bg-transparent focus:outline-none h-7 w-40 border border-secondary rounded-full transform translate-x-1 translate-y-1" />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

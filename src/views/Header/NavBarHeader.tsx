import React, { useContext, createRef, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalContext } from '../../contexts/GlobalContext';
import Popover from '../../components/Popover';
import Logo from '../../assets/logo.png';
import { ContextType } from '../../api/models/user';
import ShadowButton from '../../components/Button/ShadowButton';

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
                <ShadowButton
                  label={account && formatWalletAddress(account)}
                  color="ternary"
                  textColor="secondary"
                  fontSize="text-xs"
                  onClick={() =>
                    popoverShow ? setPopoverShow(false) : setPopoverShow(true)
                  }
                />
                <Popover btnRef={btnRef} />
              </>
            ) : (
              <>
                <ShadowButton
                  label="Connect your wallet"
                  color="secondary"
                  textColor="primary"
                  fontSize="text-xs"
                  onClick={() => setOpenModal(true)}
                />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

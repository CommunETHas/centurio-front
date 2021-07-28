import React, { useContext, createRef, ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
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
  const btnRef = createRef<HTMLButtonElement>();

  return (
    <>
      <nav className="nav-header z-20 bg-primary h-16">
        <div className="flex flex-row items-center justify-between p-1">
          <Link to="/" className="flex flex-row items-center text-primary">
            <img className="h-12" src={Logo} alt="centurio" />
            <span className="font-semibold text-3xl text-secondary tracking-tight p-3">
              Centurio
            </span>
          </Link>
          <div className="h-7 w-40 mr-3">
            <ShadowButton
              label="Connect your wallet"
              color="secondary"
              textColor="primary"
              fontSize="text-xs"
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

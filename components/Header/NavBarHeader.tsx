import React, { useContext, ReactElement, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import { InterfaceContextType, EthContextType } from '../../api/models/user';
import { EthContext } from '../../contexts/EthContext';
import ShadowButton from '../Button/ShadowButton';
import MenuHeader from './MenuHeader';
import Logo from '../../public/logo.png';

const formatWalletAddress = (addressString: string) =>
  `${addressString.slice(0, 5)}......${addressString.slice(
    Math.max(0, addressString.length - 5),
  )}`;

export default function NavbarHeader(): ReactElement {
  const { account } = useContext(EthContext) as EthContextType;

  const { setOpenModal, openMenuHeader, setOpenMenuHeader } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const menuHeaderRef = useRef<HTMLElement>(null);
  const openButtonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      const node = event.target as Node
      if (
        menuHeaderRef.current &&
        openButtonRef.current &&
        !menuHeaderRef.current.contains(node) &&
        !openButtonRef.current.contains(node) &&
        openMenuHeader
      ) {
        setOpenMenuHeader(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuHeaderRef, openButtonRef, openMenuHeader]);

  return (
    <>
      <nav className="nav-header z-20 bg-primary h-16">
        <div className="flex flex-row items-center justify-between p-1">
          <Link href="/">
            <div className="flex flex-row items-center text-primary cursor-pointer">
              <div className="h-12 w-12">
                <Image src={Logo} alt="More infos" />
              </div>
              <span className="font-semibold text-3xl text-secondary tracking-tight p-3">
                Centurio
              </span>
            </div>
          </Link>
          <div className="h-7 w-40 mr-3">
            {!account ? (
              <>
                <ShadowButton
                  label="Connect your wallet"
                  color="secondary"
                  textColor="primary"
                  fontSize="text-xs"
                  onClick={() => setOpenModal(true)}
                />
              </>
            ) : (
              <>
                <ShadowButton
                  buttonRef={openButtonRef}
                  label={account && formatWalletAddress(account)}
                  color="ternary"
                  textColor="secondary"
                  fontSize="text-xs"
                  onClick={() => setOpenMenuHeader(!openMenuHeader)}
                />
                <MenuHeader isOpen={openMenuHeader} menuRef={menuHeaderRef} />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

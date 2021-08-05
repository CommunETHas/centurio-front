import React, { useContext, createRef, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import { InterfaceContextType, EthContextType } from '../../api/models/user';
import ShadowButton from '../Button/ShadowButton';
import { EthContext } from '../../contexts/EthContext';
import Popover from '../Popover';
import Logo from '../../public/logo.png';

const formatWalletAddress = (addressString: string) =>
  `${addressString.slice(0, 5)}......${addressString.slice(
    Math.max(0, addressString.length - 5),
  )}`;

export default function NavbarHeader(): ReactElement {
  const { account } = useContext(EthContext) as EthContextType;

  const { popoverShow, setOpenModal, setPopoverShow } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const btnRef = createRef<HTMLButtonElement>();

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
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

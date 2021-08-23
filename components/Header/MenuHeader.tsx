import React, { useContext, ReactElement, RefObject, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import { EthContextType, InterfaceContextType } from '../../api/models/user';
import ShadowButton from '../Button/ShadowButton';
import { EthContext } from '../../contexts/EthContext';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variantsMenu = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuHeader = ({ menuRef, isOpen }: PopoverProps) => {
  const { disconnectProvider } = useContext(EthContext) as EthContextType;
  const { setOpenMenuHeader } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const router = useRouter();

  const onCloseRedirect = (path: string) => {
    setOpenMenuHeader(false);
    router.push(path);
  };

  const onDisconnect = () => {
    disconnectProvider();
    onCloseRedirect('/');
  };

  const menuItems: MenuItem[] = [
    { id: 1, text: 'Dashboard', onClick: () => onCloseRedirect('/dashboard') },
    {
      id: 2,
      text: 'Notifications',
      onClick: () => [onCloseRedirect('/notification')],
    },
    {
      id: 3,
      text: 'Admin Panel',
      onClick: () => [onCloseRedirect('/admin-panel')],
    },
    { id: 4, text: 'Disconnect Wallet', onClick: () => onDisconnect() },
  ];

  const Navigation = () => (
    <motion.ul variants={variants} className="pt-3">
      {menuItems.map((menuItem) => (
        <motion.li
          key={menuItem.id}
          variants={variantsMenu}
          className="relative mt-3"
        >
          <div className="h-7 w-40">
            <ShadowButton
              label={menuItem.text}
              color="secondary"
              textColor="primary"
              onClick={menuItem.onClick}
            />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={menuRef}
      >
        <motion.div className="background" />
        <Navigation />
      </motion.nav>
    </>
  );
};

export default function PopoverRender({
  menuRef,
  isOpen,
}: PopoverRenderProps): ReactElement {
  return (
    <>
      <MenuHeader isOpen={isOpen} menuRef={menuRef} />
    </>
  );
}

type PopoverRenderProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLButtonElement>;
};

type PopoverProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLButtonElement>;
};

type MenuItem = {
  id: number;
  text: string;
  onClick: () => void;
};

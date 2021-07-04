import React, { useContext, ReactElement, RefObject } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { motion } from 'framer-motion';
import { GlobalContext } from '../contexts/GlobalContext';
import { ContextType } from '../api/models/user';

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

const Popover = ({ btnRef }: PopoverProps) => {
  const { popoverShow, setPopoverShow } = useContext(
    GlobalContext,
  ) as ContextType;
  const { deactivate } = useWeb3React<Web3Provider>();
  const history = useHistory();

  const onClose = () => {
    deactivate();
    setPopoverShow(false);
  };

  const onCloseRedirect = (path: string) => {
    setPopoverShow(false);
    history.push(path);
  };

  const menuItems: MenuItem[] = [
    { id: 1, text: 'Dashboard', onClick: () => onCloseRedirect('/dashboard') },
    {
      id: 2,
      text: 'Notifications',
      onClick: () => onCloseRedirect('/notification'),
    },
    { id: 3, text: 'Disconnect Wallet', onClick: () => onClose() },
  ];

  const Navigation = () => (
    <motion.ul variants={variants} className="pt-3">
      {menuItems.map((menuItem) => (
        <motion.li
          key={menuItem.id}
          variants={variantsMenu}
          className="relative mt-3"
        >
          <button
            type="button"
            onClick={menuItem.onClick}
            className="z-10 bg-secondary absolute focus:outline-none h-7 w-40 text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
          >
            {menuItem.text}
          </button>
          <div className=" bg-transparent focus:outline-none h-7 w-40 border border-white rounded-full transform translate-x-1 translate-y-1" />
        </motion.li>
      ))}
    </motion.ul>
  );

  return (
    <>
      <motion.nav
        initial={false}
        animate={popoverShow ? 'open' : 'closed'}
        // @ts-ignore
        ref={btnRef.current}
      >
        <motion.div className="background" />
        <Navigation />
      </motion.nav>
    </>
  );
};

export default function PopoverRender({
  btnRef,
}: PopoverRenderProps): ReactElement {
  return (
    <>
      <Popover btnRef={btnRef} />
    </>
  );
}

type PopoverRenderProps = {
  btnRef: RefObject<HTMLButtonElement>;
};

type PopoverProps = {
  btnRef: RefObject<HTMLButtonElement>;
};

type MenuItem = {
  id: number;
  text: string;
  onClick: () => void;
};

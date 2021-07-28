import React, { useContext, ReactElement, RefObject } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlobalContext } from '../contexts/GlobalContext';
import { ContextType } from '../api/models/user';
import HttpRequest from '../api/api';
import ShadowButton from './Button/ShadowButton';

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
  const { popoverShow, setPopoverShow, setOpenModalAuth } = useContext(
    GlobalContext,
  ) as ContextType;
  const history = useHistory();

  const onClose = () => {
    setPopoverShow(false);
  };

  const onCloseRedirect = (path: string) => {
    history.push(path);
    setPopoverShow(false);
  };

  const menuItems: MenuItem[] = [
    { id: 1, text: 'Dashboard', onClick: () => onCloseRedirect('/dashboard') },
    {
      id: 2,
      text: 'Notifications',
      onClick: () => [onCloseRedirect('/notification')],
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

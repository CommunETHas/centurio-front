import React, { createRef, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { motion } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';
import ShieldLogo from '../../assets/logo_shield_variant_ternary.png';
import SocrateLogo from '../../assets/socrate.png';
import BattleLogo from '../../assets/battle.png';
import MoreInfoLogo from '../../assets/icons/more_info.png';
import { ContextType } from '../../api/models/user';

export default function HomeView(): ReactElement {
  const { setOpenModal } = useContext(GlobalContext) as ContextType;
  const { active } = useWeb3React<Web3Provider>();
  const sectionRef = createRef<HTMLElement>();
  const [windowWidth, setwindowWidth] = useState<number>(0);

  const executeScroll = () => {
    if (sectionRef.current !== null && sectionRef.current !== undefined) {
      sectionRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    setwindowWidth(window.innerWidth);
  });



  return (
    <main className="mb-auto h-screen w-screen overflow-auto">
      <section className="relative h-full bg-primary grid md:grid-cols-2 sm:grid-cols-1 overflow-hidden">
        <div />
        <div className="m-auto flex">
          <div className="px-3 grid">
            <span className="text-3xl text-secondary font-bold">
              Find the right covers
            </span>
            <span className="text-3xl text-secondary font-bold">
              considering your
            </span>
            <span className="text-3xl text-ternary mb-10">
              personal needs
            </span>
            <span className="text-lg text-comment mb-10">
              We’ll help you choose the good covers for your assets based on
              your wallet.
            </span>
            <div className="h-button-started w-button-started">
              {!active && (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="absolute text-button-text font-bold z-10 bg-secondary focus:outline-none h-button-started w-button-started border border-white text-xs text-primary font-bold rounded-full transition duration-500 ease-in-out transform hover:translate-y-3 hover:translate-x-3"
                  >
                    Get started
                  </button>
                  <div className=" bg-transparent focus:outline-none h-button-started w-button-started border border-white rounded-full transform translate-x-3 translate-y-3" />
                </>
              )}
            </div>
          </div>
          <img className="h-shield-logo ml-12" src={ShieldLogo} alt="shield" />
        </div>
        {/*<motion.div*/}
        {/*  className="z-20 absolute h-divbg w-1/2 bg-secondary ring-1 ring-white ring-offset-18 ring-offset-primary"*/}
        {/*  initial={{*/}
        {/*    scale: 1,*/}
        {/*    opacity: 1,*/}
        {/*    rotate: 45,*/}
        {/*    translateY: 80,*/}
        {/*    translateX: -480,*/}
        {/*  }}*/}
        {/*  animate={{ scale: 1.1, opacity: 0 }}*/}
        {/*  transition={{*/}
        {/*    duration: 3,*/}
        {/*    type: 'spring',*/}
        {/*    repeat: Number.POSITIVE_INFINITY,*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<div className="z-10 absolute transform translate-y-20 translate-x-100 rotate-45 h-divbg w-1/2 bg-secondary ring-1 ring-white ring-offset-18 ring-offset-primary" />*/}

        <div className='z-50 absolute bottom-0 w-full bg-transparent flex flex-row justify-center'>
          <motion.div
            initial={{
              translateY: -20,
            }}
            animate={{ translateY: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              repeatType: 'reverse',
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <button
              type="button"
              onClick={executeScroll}
              className="focus:outline-none text-secondary font-bold text-xl"
            >
              <span>More info</span>{' '}
              <img className="m-auto mt-2" src={MoreInfoLogo} alt="More infos" />
            </button>
          </motion.div>
        </div>
      </section>
      <section
        ref={sectionRef}
        className='relative bg-primary grid md:grid-cols-2 sm:grid-cols-1 overflow-hidden md:h-full'
      >
        <div className='md:absolute w-full flex fex-row justify-center pt-8'>
          <div>
            <span className="text-secondary font-bold text-2xl">
              Aave Stranger !
            </span>
            <div className="mt-3 px-8 w-full flex flex-row">
              <div className="w-full h-0.5 bg-secondary" />
            </div>
          </div>
        </div>
        <div className={`${windowWidth < 700 ? 'w-screen' : ''} z-40 flex justify-center items-center md:h-full`}>
          <div className='flex flex-col w-para'>
            <img
              className="h-battle-logo mb-10 opacity-90"
              src={BattleLogo}
              alt="battle"
            />
            <span className="px-3 text-secondary text-2xl">
            DeFi can be a brutal world and you can be rekt if you’re not
            careful. But behold, Nexus Mutual is here to help you and offer a
            vast offer of covers for your assets.
            </span>
          </div>
        </div>
        <div className={`${windowWidth < 700 ? 'w-screen' : ''} mt-10 z-40 flex justify-center items-center md:h-full`}>
            <div className='flex flex-col w-para'>
            <span className="px-3 mb-10 text-secondary text-2xl">
            But DeFi can be complex to navigate and to be fully covered you
            may need to deep dive into each protocol you invest in.
            </span>
              <div className='w-full flex justify-center'>
                <img
                  className="h-socrate-logo opacity-90 transform translate-y-20"
                  src={SocrateLogo}
                  alt="socrate"
                />
              </div>
            </div>
        </div>
        {/*<div className="grid grid-cols-2 h-full">*/}
        {/*  <div className="m-auto z-40 w-para mt-0">*/}
        {/*    <img*/}
        {/*      className="h-battle-logo mb-10 m-auto opacity-90"*/}
        {/*      src={BattleLogo}*/}
        {/*      alt="battle"*/}
        {/*    />*/}
        {/*    <span className="text-secondary text-2xl">*/}
        {/*      DeFi can be a brutal world and you can be rekt if you’re not*/}
        {/*      careful. But behold, Nexus Mutual is here to help you and offer a*/}
        {/*      vast offer of covers for your assets.*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className="m-auto z-40 h-full w-para overflow-hidden">*/}
        {/*    <span className="text-secondary text-2xl">*/}
        {/*      But DeFi can be complex to navigate and to be fully covered you*/}
        {/*      may need to deep dive into each protocol you invest in.*/}
        {/*    </span>*/}
        {/*    <img*/}
        {/*      className="h-socrate-logo m-auto opacity-90 mt-10 transform translate-y-socrate"*/}
        {/*      src={SocrateLogo}*/}
        {/*      alt="socrate"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <motion.div*/}
        {/*    className="z-20 absolute transform translate-y-10 translate-x-90 rotate-60 h-divbg2 w-divbg bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary"*/}
        {/*    initial={{*/}
        {/*      scale: 1,*/}
        {/*      opacity: 1,*/}
        {/*      rotate: -60,*/}
        {/*      translateY: -10,*/}
        {/*      translateX: -300,*/}
        {/*    }}*/}
        {/*    animate={{ scale: 1.1, opacity: 0 }}*/}
        {/*    transition={{*/}
        {/*      duration: 4,*/}
        {/*      type: 'spring',*/}
        {/*      repeat: Number.POSITIVE_INFINITY,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <div className="z-20 absolute transform translate-y-0 translate-x-90 rotate-60 h-divbg2 w-divbg bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary" />*/}
        {/*</div>*/}
      </section>
    </main>
  );
}

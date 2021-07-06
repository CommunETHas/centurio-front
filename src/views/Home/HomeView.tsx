import React, {
  createRef,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
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
      <div className="overflow-hidden w-full">
        <section
          className={`${
            windowWidth > 700
              ? 'grid grid-cols-2'
              : 'flex flex-col justify-center'
          } relative content-landing w-full bg-primary`}
        >
          <div />
          <div className="flex flex-row justify-center">
            <div
              className={`${
                windowWidth > 700 ? 'justify-center' : 'mb-20 w-full'
              } flex flex-col px-3`}
            >
              <span
                className={`${
                  windowWidth > 700 ? 'text-title-home' : 'text-3xl'
                } text-secondary font-bold`}
              >
                Protect the assets
              </span>
              <span
                className={`${
                  windowWidth > 700 ? 'text-title-home' : 'text-3xl'
                } text-secondary font-bold`}
              >
                in your wallet.
              </span>
              <span
                className={`${
                  windowWidth > 700 ? 'text-title-home' : 'text-3xl'
                } text-ternary mb-10`}
              >
                Take the right cover.
              </span>
              <span
                className={`${
                  windowWidth > 700 ? 'w-title text-xl' : 'w-full text-lg'
                } text-comment mb-10`}
              >
                We help you find the right covers for your assets based on your
                wallet.
              </span>
              <div
                className={`${
                  windowWidth > 700 ? 'w-button-started' : 'w-full'
                } h-button-started`}
              >
                {!active && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenModal(true)}
                      className="relative h-full w-full text-button-text text-primary font-bold z-10"
                    >
                      <div className="absolute bg-transparent focus:outline-none h-full w-full bottom-0 border border-white rounded-full transform translate-x-1 translate-y-1" />
                      <div className="absolute bg-secondary h-full w-full bottom-0 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1">
                        Get started
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
            {windowWidth > 700 ? (
              <>
                <div className="flex flex-col justify-center mb-32">
                  <img
                    className="h-shield-logo ml-4"
                    src={ShieldLogo}
                    alt="shield"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {windowWidth > 700 ? (
            <>
              <motion.div
                className="z-20 absolute h-divbg w-1/2 bg-secondary ring-1 ring-white ring-offset-18 ring-offset-primary"
                initial={{
                  scale: 1,
                  opacity: 1,
                  rotate: 45,
                  translateY: 80,
                  translateX: -480,
                }}
                animate={{ scale: 1.1, opacity: 0 }}
                transition={{
                  duration: 3,
                  type: 'spring',
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="z-10 absolute transform translate-y-20 translate-x-100 rotate-45 h-divbg w-1/2 bg-secondary ring-1 ring-white ring-offset-18 ring-offset-primary" />
            </>
          ) : (
            <></>
          )}

          <div className="z-50 absolute bottom-10 w-full bg-transparent flex flex-row justify-center">
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
                <img
                  className="m-auto mt-2"
                  src={MoreInfoLogo}
                  alt="More infos"
                />
              </button>
            </motion.div>
          </div>
        </section>
        <section
          ref={sectionRef}
          className={`${
            windowWidth > 700 ? 'content-landing' : ''
          } relative bg-primary grid md:grid-cols-2 sm:grid-cols-1 overflow-hidden`}
        >
          <div
            className={`${
              windowWidth > 700 ? 'absolute' : ''
            } w-full flex fex-row justify-center pt-10`}
          >
            <div>
              <span className="text-secondary font-bold text-2xl">
                Aave DeFi Explorer !
              </span>
              <div className="mt-3 px-8 w-full flex flex-row">
                <div className="w-full h-0.5 bg-secondary" />
              </div>
            </div>
          </div>
          <div
            className={`${
              windowWidth < 700 ? 'w-screen' : ''
            } z-40 flex justify-center items-center`}
          >
            <div className="flex flex-col w-para">
              <img
                className="h-battle-logo mb-10 opacity-90"
                src={BattleLogo}
                alt="battle"
              />
              <span className="px-3 text-secondary text-2xl">
                DeFi can be a brutal world: bugs, exploit, etc. You can be rekt
                if you’re not careful. But, fear not, you can protect yourself
                from risks by getting covers for your assets.
              </span>
            </div>
          </div>
          {windowWidth < 700 ? (
            <>
              <div className="w-screen px-8 mt-6">
                <div className="bg-secondary h-0.5" />
              </div>
            </>
          ) : (
            <></>
          )}
          <div
            className={`${
              windowWidth < 700 ? 'w-screen' : ''
            } mt-10 z-40 flex justify-center items-center`}
          >
            <div className="flex flex-col w-para">
              <span className="px-3 mb-10 text-secondary text-2xl">
                DeFi can be complex to understand. Composability makes protocol
                use one another and to know exactly which cover to choose for
                one specific asset, you may need to deep dive into each
                protocol. Centurio will be the thread that helps you navigate
                this maze.
              </span>
              <div className="w-full flex justify-center">
                <img
                  className={`${
                    windowWidth > 700 ? 'absolute' : ''
                  } h-socrate-logo opacity-90 transform translate-y-socrate`}
                  src={SocrateLogo}
                  alt="socrate"
                />
              </div>
            </div>
          </div>
          {windowWidth > 700 ? (
            <>
              <motion.div
                className="z-20 absolute transform translate-y-0 translate-x-100 rotate-60 h-divbg2 w-divbg bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary"
                initial={{
                  scale: 1,
                  opacity: 1,
                  rotate: -60,
                  translateY: -5,
                  translateX: -470,
                }}
                animate={{ scale: 1.1, opacity: 0 }}
                transition={{
                  duration: 4,
                  type: 'spring',
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="z-20 absolute transform translate-y-0 translate-x-100 rotate-60 h-divbg2 w-divbg bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary" />
            </>
          ) : (
            <></>
          )}
        </section>
      </div>
    </main>
  );
}

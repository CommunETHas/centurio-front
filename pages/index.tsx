import React, {
  createRef,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { InterfaceContext } from "../contexts/InterfaceContext";
import MoreInfoLogo from "../public/icons/more_info.png";
import { InterfaceContextType } from "../api/models/user";
import ShadowButton from "../components/Button/ShadowButton";
import ShieldLogo from "../public/logo_shield_variant_ternary.png";
import SocrateLogo from "../public/socrate.png";
import BattleLogo from "../public/battle.png";

export default function Home(): ReactElement {
  const { setOpenModal } = useContext(InterfaceContext) as InterfaceContextType;
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
    <main className="mb-auto w-screen">
      <div className="overflow-hidden w-full">
        <section
          className={`${
            windowWidth > 700
              ? "grid grid-cols-2"
              : "flex flex-col justify-center"
          } relative content-landing w-full bg-primary`}
        >
          <div />
          <div className="flex flex-row justify-center">
            <div
              className={`${
                windowWidth > 700 ? "justify-center" : "mb-20 w-full"
              } flex flex-col px-50`}
            >
              <span
                className={`${
                  windowWidth > 700 ? "text-5xl" : "text-3xl"
                } text-secondary font-bold`}
              >
                Protect the assets
              </span>
              <span
                className={`${
                  windowWidth > 700 ? "text-5xl" : "text-3xl"
                } text-secondary font-bold`}
              >
                in your wallet.
              </span>
              <span
                className={`${
                  windowWidth > 700 ? "text-5xl" : "text-3xl"
                } text-ternary mb-10`}
              >
                Take the right cover.
              </span>
              <span
                className={`${
                  windowWidth > 700 ? "w-100 text-xl" : "w-full text-lg"
                } text-comment mb-10`}
              >
                We help you find the right covers for your assets based on your
                wallet.
              </span>
              <div className={`${windowWidth > 700 ? "w-100" : "w-full"} h-16`}>
                <ShadowButton
                  label="Get started"
                  color="secondary"
                  textColor="primary"
                  fontSize="text-4xl"
                  onClick={() => setOpenModal(true)}
                />
              </div>
            </div>
            {windowWidth > 700 ? (
              <>
                <div className="flex flex-col justify-center pb-24">
                  <div className="h-62 w-48 content relative">
                    <Image
                      src={ShieldLogo}
                      alt="shield"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {windowWidth > 700 ? (
            <>
              <motion.div
                className="z-20 absolute h-200 w-2/3 bg-secondary ring-1 ring-secondary ring-offset-18 ring-offset-primary"
                initial={{
                  scale: 1,
                  opacity: 1,
                  rotate: 45,
                  translateY: 0,
                  translateX: -620,
                }}
                animate={{ scale: 1.1, opacity: 0 }}
                transition={{
                  duration: 3,
                  type: "spring",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="z-20 absolute transform translate-y-15 -translate-x-150 rotate-45 h-200 w-2/3 bg-secondary ring-1 ring-secondary ring-offset-18 ring-offset-primary" />
            </>
          ) : (
            <></>
          )}

          <div className="z-40 absolute bottom-10 w-full bg-transparent flex flex-row justify-center">
            <motion.div
              initial={{
                translateY: -20,
              }}
              animate={{ translateY: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                repeatType: "reverse",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <button
                type="button"
                onClick={executeScroll}
                className="focus:outline-none text-secondary font-bold text-xl flex flex-col items-center gap-y-1"
              >
                <span>More info</span>{" "}
                <Image
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
            windowWidth > 700 ? "content-landing" : ""
          } relative bg-primary grid md:grid-cols-2 sm:grid-cols-1 overflow-hidden`}
        >
          <div
            className={`${
              windowWidth > 700 ? "absolute" : ""
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
              windowWidth < 700 ? "w-screen" : ""
            } z-40 flex justify-center items-center`}
          >
            <div className="flex flex-col w-110">
              <Image
                className="h-65 mb-10 opacity-90"
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
              windowWidth < 700 ? "w-screen" : ""
            } mt-10 z-40 flex justify-center items-center`}
          >
            <div className="flex flex-col w-110">
              <span className="px-3 mb-10 text-secondary text-2xl">
                DeFi can be complex to understand. Composability makes protocol
                use one another and to know exactly which cover to choose for
                one specific asset, you may need to deep dive into each
                protocol. Centurio will be the thread that helps you navigate
                this maze.
              </span>
              <div className="w-full flex justify-center">
                <div
                  className={`${
                    windowWidth > 700 ? "absolute" : ""
                  } h-100 w-64 opacity-90 transform -translate-y-4`}
                >
                  <Image
                    src={SocrateLogo}
                    alt="socrate"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
          {windowWidth > 700 ? (
            <>
              <motion.div
                className="z-20 absolute transform translate-y-0 -translate-x-110 rotate-60 h-210 w-200 bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary"
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
                  type: "spring",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="z-20 absolute transform translate-y-0 -translate-x-110 rotate-60 h-210 w-200 bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary" />
            </>
          ) : (
            <></>
          )}
        </section>
      </div>
    </main>
  );
}

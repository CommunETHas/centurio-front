import React, {
  ChangeEvent,
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import { EthContextType, InterfaceContextType } from '../../api/models/user';
import Search from '../../public/icons/search.svg';
import Metamask from '../../public/wallets/logo_metamask.png';
import CoinbaseWallet from '../../public/wallets/coinbase_wallet.png';
import WalletConnect from '../../public/wallets/wallet_connect.png';
import ShadowButton from '../Button/ShadowButton';
import { ConnectorNames, EthContext } from '../../contexts/EthContext';
import SpinLoader from '../Loader/SpinLoader';

export default function WalletModal(): ReactElement {
  const { openModal, setOpenModal } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const {
    connectProvider,
    account,
    active,
    providerIsConnecting,
    setProviderIsConnecting,
  } = useContext(EthContext) as EthContextType;
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletAddressError, setWalletAddressError] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const connectWallet = async (connectorName: ConnectorNames) => {
    setProviderIsConnecting(true);
    await connectProvider(connectorName);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  const redirectOnPreviewDashboard = () => {
    if (walletAddress.length !== 42) {
      setWalletAddressError(true);
    } else {
      setWalletAddressError(false);
      setOpenModal(false);
      router.push({
        pathname: 'dashboard-preview',
        query: { address: walletAddress },
      });
      setWalletAddress('');
    }
  };

  const closeModal = () => {
    if (!providerIsConnecting) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (account && openModal) {
      setOpenModal(false);
      router.push({
        pathname: 'dashboard',
      });
    }
  }, [account]);

  useEffect(() => {
    if (active && providerIsConnecting) {
      setProviderIsConnecting(false);
    }
  }, [active]);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openModal}
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-primary bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 text-center p-3 sm:mt-0 sm:text-left">
                    {providerIsConnecting ? (
                      <>
                        <div className="flex flex-row justify-center items-center gap-5">
                          <span className="text-3xl">Wallet is connecting</span>
                          <div className="h-10 w-10">
                            <SpinLoader />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Dialog.Title
                          as="h3"
                          className="text-3xl leading-6 text-primary mb-10"
                        >
                          Select a Wallet
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-xl text-primary mb-5">
                            Please select a wallet:
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="w-full h-14">
                            <ShadowButton
                              onClick={() =>
                                connectWallet(ConnectorNames.Injected)
                              }
                              content={
                                <div className="flex flex-row w-full h-full items-center gap-2 pl-3">
                                  <div className="h-10 w-10 relative">
                                    <Image
                                      src={Metamask}
                                      alt="Metamask"
                                      layout="fill"
                                      objectFit="contain"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <span>Browser Wallet</span>
                                    <span className="text-xs font-light">
                                      (Metamask, TrustWallet...)
                                    </span>
                                  </div>
                                </div>
                              }
                            />
                          </div>
                          <div className="w-full h-14">
                            <ShadowButton
                              onClick={() =>
                                connectWallet(ConnectorNames.WalletLink)
                              }
                              content={
                                <div className="flex flex-row w-full h-full justify-center items-center gap-6">
                                  <div className="h-10 w-10 relative">
                                    <Image
                                      src={CoinbaseWallet}
                                      alt="CoinbaseWallet"
                                      layout="fill"
                                      objectFit="contain"
                                    />
                                  </div>
                                  <span>Coinbase</span>
                                </div>
                              }
                            />
                          </div>
                          <div className="w-full h-14">
                            <ShadowButton
                              onClick={() =>
                                connectWallet(ConnectorNames.WalletConnect)
                              }
                              content={
                                <div className="flex flex-row w-full h-full justify-center items-center gap-6">
                                  <div className="h-10 w-10 relative">
                                    <Image
                                      src={WalletConnect}
                                      alt="WalletConnect"
                                      layout="fill"
                                      objectFit="contain"
                                    />
                                  </div>
                                  <span>Wallet Connect</span>
                                </div>
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-10 w-full flex-row">
                          <div className="w-full h-0.1 bg-primary" />
                        </div>
                        <div className="text-center p-3 text-xl">
                          <span className="font-bold">OR</span> Use a wallet
                          address:
                        </div>
                        <div className="relative h-10 flex flex-row w-full">
                          <input
                            placeholder="e.g 0xcb613........67a145"
                            onChange={handleInput}
                            className="w-11/12 h-full z-10 bg-primary focus:outline-none text-2xs text-secondary font-bold px-4 rounded-tl-full rounded-bl-full"
                          />
                          <div className="h-full w-1/12 z-30">
                            <div className="relative bg-primary h-full rounded-tr-full rounded-br-full flex flex-col justify-center">
                              <button
                                type="button"
                                onClick={redirectOnPreviewDashboard}
                              >
                                <div className="h-8 w-8 cursor-pointer relative">
                                  <Image
                                    src={Search}
                                    alt="help"
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                              </button>
                              <div className="z-20 absolute -left-1 h-full bg-primary w-1" />
                            </div>
                          </div>
                          <div className="absolute bg-transparent border border-primary w-full h-full rounded-full transform translate-x-1 translate-y-1" />
                        </div>
                        {walletAddressError ? (
                          <>
                            <div className="relative h-10 flex flex-row w-full text-xs ml-4 mt-1 text-negative">
                              Wallet address must contains 42 characters
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {!providerIsConnecting ? (
                <>
                  <div className="flex flex-row justify-center p-3">
                    <div className="w-40 h-10">
                      <ShadowButton
                        label="Cancel"
                        filled={false}
                        textColor="primary"
                        onClick={closeModal}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

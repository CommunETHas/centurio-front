import React, {
  Fragment,
  useRef,
  useContext,
  useEffect,
  ReactElement,
  useState,
  ChangeEvent,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Wallet from './Wallet';
import { ContextType } from '../api/models/user';
import Search from '../assets/icons/search.svg';

export default function Modal(): ReactElement {
  const { active } = useWeb3React<Web3Provider>();
  const { openModal, setOpenModal } = useContext(GlobalContext) as ContextType;
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletAddressError, setWalletAddressError] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);
  const history = useHistory();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  const redirectOnPreviewDashboard = () => {
    if (walletAddress.length !== 42) {
      setWalletAddressError(true);
    } else {
      setWalletAddressError(false);
      setOpenModal(false);
      history.push({
        pathname: 'dashboard-preview',
        search: `?address=${walletAddress}`,
      });
      setWalletAddress('');
    }
  };

  useEffect(() => {
    if (active) {
      setOpenModal(false);
    }
  });

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openModal}
        onClose={setOpenModal}
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
                    <Dialog.Title
                      as="h3"
                      className="text-3xl leading-6 text-primary mb-10"
                    >
                      Select a Wallet
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xl text-primary mb-10">
                        Please select a wallet:
                      </p>
                    </div>
                    <Wallet />
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
                        className="w-11/12 h-full z-10 bg-primary focus:outline-none border border-secondary text-2xs text-secondary font-bold px-4 rounded-tl-full rounded-bl-full"
                      />
                      <div className="h-full w-1/12 padding-y-1">
                        <div className="relative bg-primary h-full rounded-tr-full rounded-br-full flex flex-col justify-center">
                          <button
                            type="button"
                            onClick={redirectOnPreviewDashboard}
                          >
                            <img
                              className="h-8 w-8 cursor-pointer"
                              src={Search}
                              alt="help"
                            />
                          </button>
                          <div className="z-20 absolute -left-1 h-full bg-primary w-1" />
                        </div>
                      </div>
                    </div>
                    {walletAddressError ? (
                      <>
                        <div className="relative h-10 flex flex-row w-full text-xs ml-4 text-negative">
                          Wallet address must contains 42 characters
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center p-3">
                <button
                  type="button"
                  className="w-40 py-2 justify-center rounded-full bg-secondary text-base font-medium text-primary border border-primary"
                  onClick={() => setOpenModal(false)}
                  ref={cancelButtonRef}
                >
                  <span className="font-bold">Cancel</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

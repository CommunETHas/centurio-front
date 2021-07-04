import React, {
  Fragment,
  useRef,
  useContext,
  useEffect,
  ReactElement,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalContext } from '../contexts/GlobalContext';
import Wallet from './Wallet';
import { ContextType } from '../api/models/user';

export default function Modal(): ReactElement {
  const { active } = useWeb3React<Web3Provider>();
  const { openModal, setOpenModal } = useContext(GlobalContext) as ContextType;

  const cancelButtonRef = useRef(null);

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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                      <div className="w-full h-divider bg-primary" />
                    </div>
                    <div className="text-center p-3 text-xl">
                      <span className="font-bold">OR</span> Use a wallet
                      address:
                    </div>
                    <div className="relative w-full">
                      <input
                        disabled
                        placeholder="e.g 0xcb613........67a145"
                        className="w-full h-10 absolute z-10 bg-primary focus:outline-none border border-white text-2xs text-secondary font-bold py-1 px-4 rounded-full"
                      />
                      <div className=" bg-transparent focus:outline-none h-10 border border-primary rounded-full transform translate-x-1 translate-y-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpenModal(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

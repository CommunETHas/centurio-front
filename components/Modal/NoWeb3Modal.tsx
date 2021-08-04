import React, {
  Fragment,
  ReactElement,
  useContext,
  useRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InterfaceContextType } from '../../api/models/user';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import ShadowButton from '../Button/ShadowButton';

export default function NoWeb3Modal(): ReactElement {
  const { noWeb3Modal, setNoWeb3Modal } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const cancelButtonRef = useRef(null);

  const closeModal = () => {
    setNoWeb3Modal(false);
  };

  return (
    <Transition.Root show={false} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
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
                    <Dialog.Title
                      as="h3"
                      className="text-3xl leading-6 text-primary mb-10"
                    >
                      No Web3 detected
                    </Dialog.Title>
                    <span className="text-xl text-primary mb-10">
                      If you choice connecting by browser wallet you need to
                      have one installed.
                    </span>
                    <div className="mt-3 row justify-start">
                      <div className="h-8 w-44" ref={cancelButtonRef}>
                        <ShadowButton
                          label="Got it, thanks"
                          onClick={() => closeModal()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

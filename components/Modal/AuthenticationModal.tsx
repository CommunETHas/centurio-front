import React, {
  Fragment,
  useRef,
  useContext,
  ReactElement,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import {
  EthContextType,
  InterfaceContextType,
  User,
} from '../../api/models/user';
import ShadowButton from '../Button/ShadowButton';
import HttpRequest from '../../api/api';
import { EthContext } from '../../contexts/EthContext';

export default function AuthenticationModal(): ReactElement {
  const { openModalAuth, setOpenModalAuth } = useContext(
    InterfaceContext,
  ) as InterfaceContextType;
  const { setRegistrationProcessed } = useContext(EthContext) as EthContextType;
  const router = useRouter();
  const { account, library } = useWeb3React();

  const cancelButtonRef = useRef(null);

  const onCancelClose = () => {
    setOpenModalAuth(false);
    router.back();
  };

  const signMessage = (userNonce: string) => {
    if (library && account) {
      library
        .getSigner(account)
        .signMessage(
          `Welcome to Centurio, sign this message to authenticate ! ${userNonce}`,
        )
        .then(async (signature: string) => {
          const { data } = await HttpRequest.authenticate({
            user: {
              address: account,
              nonce: userNonce,
            },
            signature,
          });
          localStorage.removeItem('bearer');
          if (data.accessToken) {
            localStorage.setItem('bearer', data.accessToken);
            setRegistrationProcessed(true);
            setOpenModalAuth(false);
          }
        })
        .catch((error: any) => {
          console.log(error && error.message);
        });
    }
  };

  const proccessRegistration = (alreadyTry = false) => {
    if (account) {
      HttpRequest.getUser(account)
        .then(({ data }) => {
          const user = data as User;
          if (user.nonce) {
            signMessage(user.nonce);
          } else {
            console.log('Registration error');
          }
        })
        .catch(() => {
          if (!alreadyTry) {
            HttpRequest.insertUser(account)
              .then(() => {
                proccessRegistration(true);
              })
              .catch(() => {
                console.log('Registration error');
              });
          } else {
            console.log('Registration error');
          }
        });
    }
  };

  return (
    <Transition.Root show={openModalAuth} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openModalAuth}
        onClose={onCancelClose}
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
                      Notifications
                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-xl text-primary mb-10">
                        To have access to notification you must verify that your
                        are the owner of the wallet by signing a message.
                      </p>
                    </div>
                    <div className="h-12 w-60">
                      <ShadowButton
                        label="Sign a message !"
                        onClick={() => proccessRegistration()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row justify-end">
                <div className="w-40 h-10">
                  <ShadowButton
                    label="Cancel"
                    filled={false}
                    textColor="primary"
                    onClick={() => onCancelClose()}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

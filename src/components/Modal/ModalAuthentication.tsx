import React, {
  Fragment,
  useRef,
  useContext,
  useEffect,
  ReactElement,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { ContextType } from '../../api/models/user';

export default function ModalAuthentication(): ReactElement {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { openModalAuth, setOpenModalAuth } = useContext(
    GlobalContext,
  ) as ContextType;
  const history = useHistory();

  const cancelButtonRef = useRef(null);

  const onClickRedictNotification = () => {
    setOpenModalAuth(false);
    history.push('/notification');
  };

  return (
    <Transition.Root show={openModalAuth} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={openModalAuth}
        onClose={setOpenModalAuth}
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

                    {isAuth ? (
                      <>
                        <div className="mt-2">
                          <p className="text-xl text-primary mb-10">
                            The signing has been successful.
                          </p>
                        </div>
                        <button
                          onClick={onClickRedictNotification}
                          type="button"
                          className="justify-center items-center flex absolute z-10 bg-primary focus:outline-none h-16 w-60 border border-secondary text-2xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
                        >
                          Go to notification
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="mt-2">
                          <p className="text-xl text-primary mb-10">
                            To have access to notification you must verify that
                            your are the owner of the wallet by signing a
                            message.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="justify-center items-center flex absolute z-10 bg-primary focus:outline-none h-16 w-60 border border-secondary text-2xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
                        >
                          Sign a message !
                        </button>
                        <div className=" bg-transparent focus:outline-none h-16 w-60 border border-primary rounded-full transform translate-x-1 translate-y-1" />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpenModalAuth(false)}
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

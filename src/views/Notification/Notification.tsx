import React, {
  ReactElement,
  useContext,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { GlobalContext } from '../../contexts/GlobalContext';
import HttpRequest from '../../api/api';
import { ContextType } from '../../api/models/user';

const options = [
  {
    id: 1,
    name: 'daily',
  },
  {
    id: 2,
    name: 'weekly',
  },
  {
    id: 3,
    name: 'monthly',
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Notification(): ReactElement {
  const { active, account } = useWeb3React<Web3Provider>();
  const { user, setUser, setIsUserCreated } = useContext(
    GlobalContext,
  ) as ContextType;
  const [selected, setSelected] = useState(options[0]);
  const [email, setEmail] = useState('');

  const fetchUser = async () => {
    await HttpRequest.getUser(account)
      .then(({ data }) => {})
      .catch(() => {});
  };

  const unscribeUser = async () => {
    const userUpdated = {
      address: account,
      nonce: user.nonce,
      email: '',
    };
    await HttpRequest.updateUser(userUpdated, localStorage.getItem('bearer'));
  };

  const updateUser = async () => {
    const userUpdated = {
      address: account,
      nonce: user.nonce,
      email,
    };

    await HttpRequest.updateUser(userUpdated, localStorage.getItem('bearer'));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className="w-screen bg-primary h-screen overflow-auto">
      <div className="w-full flex justify-center my-20">
        <div className="flex flex-col">
          <span className="text-secondary font-bold text-xl">
            NOTIFICATIONS
          </span>
          <div className="mt-3 px-8 w-full flex flex-row">
            <div className="w-full h-0.5 bg-secondary" />
          </div>
        </div>
      </div>
      {active ? (
        <div className="m-auto w-80 order bg-secondary border-primary p-3">
          <div className="relative w-full mb-3">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-primary">
                    Frequency of email notification:
                  </Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {selected.name}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="z-50 absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {options.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'text-white bg-indigo-600'
                                  : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-3 pr-9',
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate',
                                    )}
                                  >
                                    {person.name}
                                  </span>
                                </div>

                                {selected && (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>

          <div className="relative w-full mb-10">
            <span className="text-sm">Email: </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g test@gmail.com"
              className="w-full h-10 z-10 bg-primary focus:outline-none border border-white text-2xs text-secondary font-bold py-1 px-4 rounded-full"
            />
          </div>
          <div className="relative w-full mb-3">
            <button
              onClick={updateUser}
              type="button"
              className="absolute z-10 bg-primary focus:outline-none h-7 w-full border border-white text-xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
            >
              Update preferences
            </button>
            <div className=" bg-transparent focus:outline-none h-7 w-full border border-primary rounded-full transform translate-x-1 translate-y-1" />
          </div>
          <div className="relative w-full">
            <button
              onClick={unscribeUser}
              type="button"
              className="absolute z-10 bg-ternary focus:outline-none h-7 w-full border border-white text-xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
            >
              Unsubscribe
            </button>
            <div className=" bg-transparent focus:outline-none h-7 w-full border border-ternary rounded-full transform translate-x-1 translate-y-1" />
          </div>
        </div>
      ) : (
        <div className="text-secondary">
          You must connect your wallet to subscribe to notification.
        </div>
      )}
    </main>
  );
}

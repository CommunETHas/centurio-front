import React, {
  ReactElement,
  useContext,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { InterfaceContext } from '../../contexts/InterfaceContext';
import HttpRequest from '../../api/api';
import { InterfaceContextType, User } from '../../api/models/user';

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
  const user = new User();
  const [selected, setSelected] = useState(options[0]);
  const [email, setEmail] = useState(user.email);

  // const updateUser = async () => {
  //   const userUpdated = {
  //     address: account,
  //     nonce: user.nonce,
  //     email,
  //     frequency: selected.name,
  //   };
  //
  //   await HttpRequest.updateUser(userUpdated, localStorage.getItem('bearer'));
  // };

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
      <div className="relative m-auto w-80 order bg-secondary border border-secondary rounded-lg p-4">
        <div className="absolute w-full h-full -right-2 -bottom-2 bg-transparent border border-secondary rounded-lg" />
        <div className="relative w-full">
          <div className="text-sm p-3">Email: </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // @ts-ignore
            name="email"
            placeholder="e.g test@gmail.com"
            className="mb-3 w-full h-10 z-10 bg-primary focus:outline-none border border-secondary text-2xs text-secondary font-bold py-1 px-4 rounded-full"
          />
        </div>
        <div className="relative w-full mb-10">
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-primary p-3">
                  Frequency of email notification:
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-secondary border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                      className="z-50 absolute mt-1 w-full bg-secondary shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {options.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'text-secondary bg-indigo-600'
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
                                    selected ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate',
                                  )}
                                >
                                  {person.name}
                                </span>
                              </div>

                              {selected && (
                                <span
                                  className={classNames(
                                    active
                                      ? 'text-secondary'
                                      : 'text-indigo-600',
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

        <div className="relative w-full mb-3 mt-3">
          <button
            type="button"
            className="absolute z-10 bg-primary focus:outline-none h-7 w-full border border-secondary text-xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
          >
            Update preferences
          </button>
          <div className=" bg-transparent focus:outline-none h-7 w-full border border-primary rounded-full transform translate-x-1 translate-y-1" />
        </div>
        <div className="relative w-full">
          <button
            type="button"
            className="absolute z-10 bg-ternary focus:outline-none h-7 w-full border border-secondary text-xs text-secondary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
          >
            Unsubscribe
          </button>
          <div className=" bg-transparent focus:outline-none h-7 w-full border border-ternary rounded-full transform translate-x-1 translate-y-1" />
        </div>
      </div>
    </main>
  );
}

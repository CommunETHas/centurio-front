import React, { Fragment, PropsWithChildren, ReactElement } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Help from '../../assets/icons/help.svg';

const IconButtonHelper: React.FC<IconButtonHelperProps> = ({
  textContent,
}: IconButtonHelperProps) => (
  <Popover>
    {({ open }) => (
      <>
        <Popover.Button>
          <img
            className="h-7 w-7 cursor-pointer transform -translate-y-1"
            src={Help}
            alt="help"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute">
            <div className="overflow-hidden relative px-5 pt-2 pb-3 w-60 bg-secondary rounded-lg border border-ternary text-black">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <span className="font-bold">Info: </span>
                </div>
                <span className="text-sm">{textContent}</span>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

interface IconButtonHelperProps extends PropsWithChildren<any> {
  textContent: string;
}

export default IconButtonHelper;

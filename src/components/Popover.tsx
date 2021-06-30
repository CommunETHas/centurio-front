import React, {
  useContext,
  useEffect,
  createRef,
  ReactElement,
  RefObject,
} from 'react';
import { Link } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalContext } from '../contexts/GlobalContext';
import { ContextType } from '../api/models/user';

const Popover = ({ btnRef }: PopoverProps) => {
  const { popoverShow, setPopoverShow } = useContext(
    GlobalContext,
  ) as ContextType;
  const { deactivate } = useWeb3React<Web3Provider>();
  const popoverRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (popoverRef.current !== null && btnRef.current !== null) {
      createPopper(btnRef.current, popoverRef.current, {
        placement: 'bottom-start',
      });
    }
  }, [btnRef, popoverRef]);

  const onClose = () => {
    deactivate();
    setPopoverShow(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <div
            className={`${
              popoverShow ? '' : 'hidden '
            }bg-ternary border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg`}
            ref={popoverRef}
          >
            <div className="p-3">
              <Link
                onClick={() => setPopoverShow(false)}
                to="/dashboard"
                className="text-center absolute z-10 bg-secondary focus:outline-none h-7 w-40 border border-white text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
              >
                Go to Dashboard
              </Link>
              <div className="mb-3 bg-transparent focus:outline-none h-7 w-40 border border-white rounded-full transform translate-x-1 translate-y-1" />
              <Link
                onClick={() => setPopoverShow(false)}
                to="/notification"
                className="text-center absolute z-10 bg-secondary focus:outline-none h-10 w-40 border border-white text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
              >
                Notification preferences
              </Link>
              <div className="mb-3 bg-transparent focus:outline-none h-10 w-40 border border-white rounded-full transform translate-x-1 translate-y-1" />
              <button
                type="button"
                onClick={onClose}
                className="absolute z-10 bg-secondary focus:outline-none h-7 w-40 border border-white text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
              >
                Disconnect wallet
              </button>
              <div className=" bg-transparent focus:outline-none h-7 w-40 border border-white rounded-full transform translate-x-1 translate-y-1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function PopoverRender({
  btnRef,
}: PopoverRenderProps): ReactElement {
  return (
    <>
      <Popover btnRef={btnRef} />
    </>
  );
}

type PopoverRenderProps = {
  btnRef: RefObject<HTMLButtonElement>;
};

type PopoverProps = {
  btnRef: RefObject<HTMLButtonElement>;
};

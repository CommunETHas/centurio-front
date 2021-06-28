import React, { useContext, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalContext } from '../contexts/GlobalContext';

const Popover = ({ btnRef }) => {
  const { popoverShow, setPopoverShow } = useContext(GlobalContext);
  const { deactivate } = useWeb3React<Web3Provider>();
  const popoverRef = createRef();

  useEffect(() => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: 'bottom-end',
    });
  }, [btnRef, popoverRef]);

  const onClose = async () => {
    await deactivate();
    setPopoverShow(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <div
            className={
              (popoverShow ? '' : 'hidden ') +
              'bg-ternary border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
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

export default function PopoverRender({ btnRef }) {
  return (
    <>
      <Popover color="amber" btnRef={btnRef} />
    </>
  );
}

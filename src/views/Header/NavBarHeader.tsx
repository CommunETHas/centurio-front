import React from 'react';
import Logo from '../../assets/logo.png';
import Modal from '../../components/Modal';

export default function NavbarHeader() {
  return (
    <>
      <Modal />
      <nav className="z-20 flex items-center justify-between flex-wrap bg-teal p-3 bg-primary">
        <div className="flex items-center flex-no-shrink text-primary mr-6">
          <img className="h-20" src={Logo} alt="centurio" />
          <span className="font-semibold text-3xl text-secondary tracking-tight p-3">
            Centurio
          </span>
        </div>
        <div className="h-7 w-40">
          <button
            type="button"
            onClick={() => console.log('test')}
            className="absolute z-10 bg-secondary focus:outline-none h-7 w-40 border border-white text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
          >
            Connect your wallet
          </button>
          <div className=" bg-transparent focus:outline-none h-7 w-40 border border-white rounded-full transform translate-x-1 translate-y-1" />
        </div>
      </nav>
    </>
  );
}

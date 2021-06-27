import React from 'react';
import Quote from '../api/models/quote';

export default function QuoteCard(props: Quote) {
  const { name, type, logo } = props;
  return (
    <div className="relative p-7 w-full rounded-lg">
      <div className="absolute -m-3 w-full h-full bg-transparent border border-white rounded-lg" />
      <div className="absolute -m-7 w-full h-full bg-secondary rounded-lg" />
      <div className="relative z-10">
        <div className="w-full flex flex-row">
          <img src={logo} className="w-16 h-16 rounded-md" />
          <div className="-mt-2 flex flex-col ml-3">
            <span className="font-bold text-2xl">{name}</span>
            <span>{type}</span>
            <span className="font-bold">Chain: </span>
          </div>
        </div>
        <div className="mt-3 px-8 w-full flex flex-row">
          <div className="w-full h-0.5 bg-base" />
        </div>
        <div className="mt-3 w-full flex flex-row">
          <span className="font-bold">Detected token: </span>
        </div>
        <div className="mt-3 w-full flex flex-row">
          <span className="font-bold">Why this protocol appears ?</span>
        </div>
        <div className="w-full flex flex-row">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <div className="mt-3 w-full flex flex-row justify-end">
          <button
            type="button"
            onClick={() => console.log('test')}
            className="absolute z-10 bg-ternary focus:outline-none border border-white text-sm text-secondary font-bold h-7 w-44 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
          >
            See on Nexus Mutual
          </button>
          <div className="bg-transparent focus:outline-none h-7 w-44 border border-ternary rounded-full transform translate-x-1 translate-y-1" />
        </div>
      </div>
    </div>
  );
}

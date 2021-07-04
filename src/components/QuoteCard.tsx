import React, { BaseSyntheticEvent, ReactElement } from 'react';
import { Recommandations } from '../api/models/cover';
import Help from '../assets/icons/help.svg';

export default function QuoteCard(props: Recommandations): ReactElement {
  const recommandation: Recommandations = props;
  return (
    <div className="relative w-full">
      <div className="absolute w-full h-full -right-2 -bottom-2 bg-transparent border border-white rounded-lg" />
      <div className="p-7 relative rounded-lg bg-secondary">
        <div className="w-full flex flex-row">
          <img
            src={recommandation.cover.logoUrl}
            className="w-16 h-16 rounded-md"
            alt="token"
          />
          <div className="-mt-2 flex flex-col ml-3">
            <span className="font-bold text-2xl">
              {recommandation.cover.name}
            </span>
            <span>{recommandation.cover.type}</span>
            <span className="font-bold">Chain: </span>
          </div>
        </div>
        <div className="mt-3 px-8 w-full flex flex-row">
          <div className="w-full h-0.5 bg-base" />
        </div>
        <div className="mt-3 w-full flex flex-row">
          <span className="font-bold">Detected token: </span>
          {recommandation.reasoning.map((reason) => (
            <img
              src={reason.logoUrl}
              onError={(e: BaseSyntheticEvent) => {
                e.target.src = Help;
              }}
              className="ml-2 w-6 h-6 rounded-md"
              alt="assets"
            />
          ))}
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

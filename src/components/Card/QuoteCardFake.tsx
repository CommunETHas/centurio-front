import React, { ReactElement } from 'react';

export default function QuoteCardFake(): ReactElement {
  return (
    <div className="relative w-full">
      <div className="absolute w-full h-full -right-2 -bottom-2 bg-transparent border border-secondary rounded-lg" />
      <div className="p-7 relative rounded-lg bg-secondary">
        <div className="animate-pulse w-full flex flex-col">
          <div className="flex flex-row">
            <div className="w-2/12 h-16 rounded-md bg-shader" />
            <div className="mt-2 w-8/12 flex flex-col ml-3">
              <div className="h-3 w-11/12 bg-shader rounded-sm" />
              <div className="mt-1 h-3 w-2/12 bg-shader rounded-sm" />
              <div className="mt-1 h-3 w-5/12 bg-shader rounded-sm" />
            </div>
          </div>
          <div className="mt-3 px-8 w-full flex flex-row">
            <div className="w-full h-0.5 bg-shader" />
          </div>
          <div className="mt-3 h-3 w-2/5 bg-shader rounded-sm" />
          <div className="mt-3 h-3 w-3/5 bg-shader rounded-sm" />
          <div className="mt-3 h-20 w-12/12 bg-shader rounded-sm" />
        </div>
      </div>
    </div>
  );
}

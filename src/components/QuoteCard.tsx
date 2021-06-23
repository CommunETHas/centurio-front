import React from 'react';

export default function QuoteCard() {
  return (
    <div className="relative h-36 rounded-lg">
      <div className="z-20 absolute w-full h-full bg-secondary rounded-lg" />
      <div className="z-10 h-full bg-transparent border border-white-500 rounded-lg transform translate-x-3 translate-y-3" />
    </div>
  );
}

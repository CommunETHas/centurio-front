import React from 'react';
import QuoteCard from '../../components/QuoteCard';

export default function Dashboard() {
  const componentList = Array.from({ length: 10 }, () => <QuoteCard />);

  return (
    <main className="w-screen bg-primary h-screen overflow-auto">
      <div className="w-full flex justify-center my-20">
        <span className="text-primary font-bold">COVERS RECOMMENDATIONS</span>
      </div>
      <div className="w-full grid gap-x-32 gap-y-32 grid-cols-3 px-32">
        {componentList}
      </div>
    </main>
  );
}

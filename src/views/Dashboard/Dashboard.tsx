import React from 'react';
import QuoteCard from '../../components/QuoteCard';

export default function Dashboard() {
  const componentList = Array.from({ length: 10 }, () => <QuoteCard />);

  return (
    <main className="w-screen bg-primary h-screen overflow-auto">
      <div className="w-full flex justify-center my-20">
        <div className='flex flex-col'>
          <span className="text-secondary font-bold text-xl">COVERS RECOMMENDATIONS</span>
          <div className='mt-3 px-8 w-full flex flex-row'>
            <div className='w-full h-0.5 bg-secondary' />
          </div>
        </div>
      </div>
      <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
        {componentList}
      </div>
    </main>
  );
}

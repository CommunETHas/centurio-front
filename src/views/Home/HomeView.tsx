import React from 'react';

export default function HomeView() {
  return (
    <main className="mb-auto h-screen overflow-auto">
      <section className="relative h-full bg-primary grid grid-cols-2">
        <div className="m-auto" />
        <div className="m-auto w-title grid">
          <span className="text-title-home text-secondary font-bold">
            Find the right covers
          </span>
          <span className="text-title-home text-secondary font-bold ">
            considering your
          </span>
          <span className="text-title-home text-ternary mb-10">
            {' '}
            personal needs
          </span>
          <span className="text-xl text-comment mb-10">
            We’ll help you choose the good covers for your assets based on your
            wallet.
          </span>
          <div className="h-button-started w-button-started">
            <button
              type="button"
              onClick={() => console.log('test')}
              className="absolute text-button-text font-bold z-10 bg-secondary focus:outline-none h-button-started w-button-started border border-white text-xs text-primary font-bold rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
            >
              Get started
            </button>
            <div className=" bg-transparent focus:outline-none h-button-started w-button-started border border-white rounded-full transform translate-x-3 translate-y-3" />
          </div>
        </div>
        {/* <div className="z-10 absolute transform translate-y-20 translate-x-100 rotate-45 h-divbg w-divbg bg-secondary ring-1 ring-white ring-offset-18 ring-offset-primary"></div> */}
      </section>
      <section className="relative h-full bg-primary">
        {/* <div className="z-20 absolute transform translate-y-80 translate-x-90 rotate-60 h-divbg2 w-divbg bg-ternary ring-1 ring-ternary ring-offset-18 ring-offset-primary"></div> */}
      </section>
    </main>
  );
}

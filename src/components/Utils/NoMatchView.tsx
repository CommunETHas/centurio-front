import React, { ReactElement } from 'react';

export default function NoMatchView(): ReactElement {
  return (
    <div className="mb-auto mx-auto flex items-center justify-center">
      <div className="max-w-md py-4 px-32 bg-secondary shadow-lg rounded-lg my-20 text-center">
        <span className="text-6xl">404</span>
      </div>
    </div>
  );
}

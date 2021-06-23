import React from 'react';

export default function Dashboard() {
  return (
    <div className="h-screen bg-primary">
      <div className="w-screen flex justify-center my-20">
        <span className="text-primary font-bold">COVERS RECOMMENDATIONS</span>
      </div>
      <div className="w-screen grid gap-4 grid-cols-2 px-32">
        <div className="h-20 bg-secondary" />
        <div className="h-20 bg-secondary" />
        <div className="h-20 bg-secondary" />
        <div className="h-20 bg-secondary" />
        <div className="h-20 bg-secondary" />
      </div>
    </div>
  );
}

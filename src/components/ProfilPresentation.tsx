import React, { ReactElement } from 'react';

interface Profil {
  name: string;
  job: string;
  img: string;
}
export default function ProfilPresentation({
  name,
  job,
  img,
}: Profil): ReactElement {
  return (
    <div className="flex flex-col items-center text-secondary">
      <img className="h-56 w-56 rounded-full" src={img} alt="More infos" />
      <span className="mt-3 text-2xl font-bold">{name}</span>
      <span>{job}</span>
    </div>
  );
}

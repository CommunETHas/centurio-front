import React, { ReactElement } from 'react';
import Image from 'next/image';

interface Profil {
  name: string;
  job: string;
  img: StaticImageData;
}
export default function ProfilPresentation({
  name,
  job,
  img,
}: Profil): ReactElement {
  return (
    <div className="flex flex-col items-center text-secondary">
      <div className="h-56 w-56 rounded-full relative">
        <Image
          className="rounded-full"
          src={img}
          alt="More infos"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <span className="mt-3 text-2xl font-bold">{name}</span>
      <span>{job}</span>
    </div>
  );
}

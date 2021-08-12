import React, { ReactElement } from 'react';
import Image from 'next/image';
import Cordier from '../public/photo/cordier.jpg';
import Croquelois from '../public/photo/croquelois.jpg';
import Marino from '../public/photo/marino.jpg';

interface Profil {
  name: string;
  job: string;
  img: StaticImageData;
}

function ProfilPresentation({ name, job, img }: Profil): ReactElement {
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

export default function AboutUs(): ReactElement {
  return (
    <main className="bg-primary w-screen h-screen overflow-auto content-center">
      <div className="md:mt-36 flex flex-row gap-x-32 gap-y-8 justify-center flex-wrap">
        <ProfilPresentation
          img={Cordier}
          job="Backend & UX"
          name="Bogdan Cordier"
        />
        <ProfilPresentation
          img={Croquelois}
          job="Web developper"
          name="Adrien Croquelois"
        />
        <ProfilPresentation
          img={Marino}
          job="Web developer & UI Designer & PR"
          name="Romain Marino"
        />
      </div>
    </main>
  );
}

import React, { ReactElement } from "react";
import ProfilPresentation from "../components/ProfilPresentation";
import Cordier from "../public/photo/cordier.jpg";
import Croquelois from "../public/photo/croquelois.jpg";
import Marino from "../public/photo/marino.jpg";

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

import { perks } from "@/constants";
import Image from "next/image";
import React from "react";

const Perks = () => {
  return (
    <section>
      <div className="wrapper">
        <h2 className="h2-bold text-center mb-8">Why shop with TechPoint</h2>
        <ul className="justify-center items-center gap-5 grid grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => (
            <li
              key={index}
              className="border-2 border-primary rounded-xl p-2 flex flex-col items-center gap-2 text-center"
            >
              <Image src={perk.icon} alt={perk.title} width={24} height={24} />
              <p className="p-bold-20">{perk.title}</p>
              <p>{perk.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Perks;

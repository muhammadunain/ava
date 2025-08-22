import React, { JSX } from "react";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="w-full flex items-center translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <h1 className="font-semibold text-3xl leading-9 [font-family:'Geist',Helvetica] whitespace-nowrap">
        <span className="text-black tracking-[0]">Good afternoon, </span>
        <span className="text-[#2574eb] tracking-[0]">Dave</span>
      </h1>
    </header>
  );
};

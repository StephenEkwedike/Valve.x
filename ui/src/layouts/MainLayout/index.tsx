import React, { useState } from "react";

import { Footer, Header } from "./components";
import { TokenType } from "utils/enums";

export const MainLayout = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {

  return (
    <div className="layout__main">
      <Header />
      <div className="py-4 md:py-12 lg:py-[80px] px-2 mx-auto max-w-2xl w-full">
        <div className="text-white text-6xl font-bold text-center mb-8">Transfer to other wallet</div>
        <main>
          {props.children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

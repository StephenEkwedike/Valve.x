import React from "react";

import { Footer, Header } from "./components";

export const MainLayout = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {

  return (
    <div className="layout__main">
      <Header />
      <div className="py-4 md:py-12 lg:py-[80px] px-2 mx-auto max-w-2xl w-full">
        <main>
          {props.children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

import { SelectedTokenType } from "contexts";
import React from "react";

import { Footer, Header } from "./components";

export const MainLayout = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {

  return (
    <div className="layout__main">
      <Header />
      <div className="p-2 lg:py-4 mx-auto max-w-md w-full">
        <main>
          <SelectedTokenType>
            {props.children}
          </SelectedTokenType>
        </main>
      </div>
      <Footer />
    </div>
  );
};

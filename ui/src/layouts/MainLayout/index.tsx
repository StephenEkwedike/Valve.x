import React from "react";
import { Footer, Header } from "./components";

export const MainLayout = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className="layout__main">
      <Header />
      <div className="py-4 md:py-12 lg:py-[120px] px-2 mx-auto max-w-md w-full">
        <div className="relative w-full max-w-2xl">
          <main className="flex flex-col gap-3 p-2 md:p-4 pt-4 rounded-[24px] bg-dark-800 shadow-md shadow-dark-1000 bg-base">
            {props.children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

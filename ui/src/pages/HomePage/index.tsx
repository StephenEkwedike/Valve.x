import { useConnectedWeb3Context } from "contexts";
import React, { useEffect, useState } from "react";
import { HomeTab } from "utils/enums";
import { TabBar, TransferSection } from "./components";

interface IState {
  tab: HomeTab;
}

const HomePage = () => {
  const [state, setState] = useState<IState>({ tab: HomeTab.Transfer });

  const renderContent = () => {
    switch (state.tab) {
      case HomeTab.Transfer:
        return <TransferSection />;
    }
  };

  return (
    <>
      <TabBar
        tab={state.tab}
        onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
      />

      {renderContent()}
    </>
  );
};

export default HomePage;

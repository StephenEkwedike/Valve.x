import { useConnectedWeb3Context } from "contexts";
import { useUserReceives, useUserTransfers } from "helpers";
import React, { useEffect, useState } from "react";
import { HomeTab } from "utils/enums";
import {
  HistoryTabBar,
  ReceivedSection,
  SentSection,
  TabBar,
  TransferSection,
} from "./components";

interface IState {
  tab: HomeTab;
}

const HomePage = () => {
  const [state, setState] = useState<IState>({ tab: HomeTab.Transfer });
  const {
    transferIds,
    load: loadTransfers,
    loading: transferLoading,
  } = useUserTransfers();
  const {
    transferIds: receiveIds,
    load: loadReceives,
    loading: receivesLoading,
  } = useUserReceives();

  const renderContent = () => {
    switch (state.tab) {
      case HomeTab.Transfer:
        return (
          <TransferSection
            onReload={async () => {
              await Promise.all([loadTransfers(), loadReceives()]);
            }}
          />
        );
      default:
        return (
          <>
            <HistoryTabBar
              tab={state.tab}
              onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
            />
            {state.tab === HomeTab.Sent ? (
              <SentSection
                transferIds={transferIds}
                loading={transferLoading}
              />
            ) : (
              <ReceivedSection
                transferIds={receiveIds}
                loading={receivesLoading}
              />
            )}
          </>
        );
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

import { useUserReceives, useUserTransfers } from "helpers";
import React, { useState } from "react";
import { HomeTab } from "utils/enums";
import {
  HistoryTabBar,
  ReceivedSection,
  SentSection,
  TabBar,
  TransferSection,
  TransferTabBar,
  ERC721Transfer,
} from "./components";

interface IState {
  tab: HomeTab;
}

const HomePage = () => {
  const [state, setState] = useState<IState>({ tab: HomeTab.Token });
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
      case HomeTab.Token:
        return (
          <>
            <TransferTabBar 
              tab={state.tab}
              onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
            />
            <TransferSection
              onReload={async () => {
                await Promise.all([loadTransfers(), loadReceives()]);
              }}
            />
          </>
        );
      case HomeTab.NFT:
        return (
          <>
            <TransferTabBar 
              tab={state.tab}
              onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
            />
            <ERC721Transfer
              onReload={async () => {}}
            />
          </>
        )
      case HomeTab.Sent:
        return (
          <>
            <HistoryTabBar
              tab={state.tab}
              onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
            />
            <SentSection
              transferIds={transferIds}
              loading={transferLoading}
            />
          </>
        );
      case HomeTab.Received:
        return (
          <>
            <HistoryTabBar
              tab={state.tab}
              onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
            />
            <ReceivedSection
              transferIds={receiveIds}
              loading={receivesLoading}
            />
          </>
        )
      default:
        return (
          <>
            <TransferTabBar 
              tab={state.tab}
              onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
            />
            <TransferSection
              onReload={async () => {
                await Promise.all([loadTransfers(), loadReceives()]);
              }}
            />
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

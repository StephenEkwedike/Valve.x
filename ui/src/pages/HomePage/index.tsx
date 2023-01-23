import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUserReceives, useUserTransfers } from "helpers";
import { HomeTab, TokenType } from "utils/enums";
import {
  HistoryTabBar,
  ReceivedSection,
  SentSection,
  TabBar,
  NFTTransfer,
  TokenTransfer,
  TokenTypeToggle,
  ContactSection
} from "./components";
import { useSelectedTokenTypeContext } from "contexts";

interface IState {
  tab: HomeTab;
  recipient: string;
}

const HomePage = () => {
  const location = useLocation();
  const [state, setState] = useState<IState>({ tab: HomeTab.Transfer, recipient: location.state?.recipient || "" });
  const { tokenType, setTokenType } = useSelectedTokenTypeContext();
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

  useEffect(() => {
    if(location.state?.tokenType)
      setTokenType(location.state.tokenType);
  }, [location.state?.tokenType])

  const renderContent = () => {
    switch (state.tab) {
      case HomeTab.Transfer:
        return tokenType === TokenType.Token ? (
          <TokenTransfer 
            recipient={state.recipient}
            onReload={async () => {
              await Promise.all([loadTransfers(), loadReceives()]);
            }}
          />
        ) : (
          <NFTTransfer 
            recipient={state.recipient}
            onReload={async () => {
              await Promise.all([loadTransfers(), loadReceives()]);
            }}
          />
        );
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
        );
      case HomeTab.Contact:
        return (
          <ContactSection
            onTransfer={(tokenType: TokenType, recipient: string) => {
              setTokenType(tokenType);
              setState((prev) => ({ ...prev, recipient, tab: HomeTab.Transfer }))
            }}
          />
        )
    }
  };

  return (
    <>
      <div className="text-white sm:text-4xl text-2xl font-bold text-center mb-4">Transfer</div>
      <TokenTypeToggle />
      <div className="w-full flex flex-col gap-3 pt-4 rounded-2xl shadow-md shadow-dark-1000 bg-base">
        <TabBar
          tab={state.tab}
          onChange={(tab) => setState((prev) => ({ ...prev, tab, recipient: "" }))}
        />

        {renderContent()}
      </div>
    </>
  );
};

export default HomePage;

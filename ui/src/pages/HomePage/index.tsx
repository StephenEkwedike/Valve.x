import React, { useState, useCallback } from "react";

import { useUserReceives, useUserTransfers } from "helpers";
import { HomeTab, TokenType } from "utils/enums";
import {
  HistoryTabBar,
  ReceivedSection,
  SentSection,
  TabBar,
  ERC721Transfer,
  TokenTransfer,
  TokenTypeToggle
} from "./components";

interface IState {
  tab: HomeTab;
  tokenType: TokenType
}

const HomePage = () => {
  const [state, setState] = useState<IState>({ tab: HomeTab.Transfer, tokenType: TokenType.Token });
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

  const onClickToken = useCallback(() => {
    setState(prev => ({ ...prev, tokenType: TokenType.Token }))
  },[]);

  const onClickNFT = useCallback(() => {
    setState(prev => ({ ...prev, tokenType: TokenType.NFT }))
  }, [])

  const renderContent = () => {
    switch (state.tab) {
      case HomeTab.Transfer:
        return state.tokenType === TokenType.Token ? (
          <TokenTransfer 
            onReload={async () => {
              await Promise.all([loadTransfers(), loadReceives()]);
            }} 
          />
        ) : (
          <ERC721Transfer onReload={async () => {}} />
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
    }
  };

  return (
    <>
      <div className="text-white text-6xl font-bold text-center mb-8">Transfer to other wallet</div>
      <TokenTypeToggle 
        tokenType={state.tokenType} 
        onClickToken={onClickToken} 
        onClickNFT={onClickNFT} 
      />
      <div className="w-full flex flex-col gap-3 pt-4 rounded-[16px] shadow-md shadow-dark-1000 bg-base">
        <TabBar
          tab={state.tab}
          onChange={(tab) => setState((prev) => ({ ...prev, tab }))}
        />

        {renderContent()}
      </div>
    </>
  );
};

export default HomePage;

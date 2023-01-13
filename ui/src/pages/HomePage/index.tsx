import React, { useState, useCallback } from "react";

import { useUserReceives, useUserTransfers } from "helpers";
import { HomeTab, TokenType } from "utils/enums";
import {
  HistoryTabBar,
  ReceivedSection,
  SentSection,
  TabBar,
  NFTTransfer,
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
    loadToken: loadTokenTransfers,
    loadNFT: loadNFTTransfers,
    loading: transferLoading,
  } = useUserTransfers(state.tokenType);
  const {
    transferIds: receiveIds,
    loadToken: loadTokenReceives,
    loadNFT: loadNFTReceives,
    loading: receivesLoading,
  } = useUserReceives(state.tokenType);

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
              await Promise.all([loadTokenTransfers(), loadTokenReceives()]);
            }} 
          />
        ) : (
          <NFTTransfer 
            onReload={async () => {
              await Promise.all([loadNFTTransfers(), loadNFTReceives()]);
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
              tokenType={state.tokenType}
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
              tokenType={state.tokenType}
              transferIds={receiveIds}
              loading={receivesLoading}
            />
          </>
        );
    }
  };

  return (
    <>
      <div className="text-white md:text-6xl text-4xl font-bold text-center mb-8">Transfer to other wallet</div>
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

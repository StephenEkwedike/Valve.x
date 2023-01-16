import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import {
  ConnectWalletModal /*TransactionModal*/,
  NetworkSelectModal,
  TransactionModal,
} from "components";
import { STORAGE_KEY_CONNECTOR } from "config/constants";
import { setupNetwork } from "config/networks";
import connectors from "utils/connectors";
import { ConnectorNames } from "utils/enums";
import { Maybe } from "types/types";

export interface IConnectedWeb3Context {
  account: Maybe<string> | null;
  library: Web3Provider | undefined;
  networkId: number | undefined;
  rawWeb3Context: any;
  initialized: boolean;
  walletConnectModalOpened: boolean;
  setWalletConnectModalOpened: (_: boolean) => void;
  onDisconnect: () => void;
  txModalInfo?: {
    visible: boolean;
    description: string;
    txHash: string;
    title: string;
  };
  setTxModalInfo: (
    visible: boolean,
    title?: string,
    description?: string,
    txHash?: string
  ) => void;
  networkSelectorVisible: boolean;
  setNetworkSelectorVisible: (visible: boolean) => void;
}

const ConnectedWeb3Context =
  React.createContext<Maybe<IConnectedWeb3Context>>(null);

/**
 * This hook can only be used by components under the `ConnectedWeb3` component. Otherwise it will throw.
 */
export const useConnectedWeb3Context = () => {
  const context = React.useContext(ConnectedWeb3Context);

  if (!context) {
    throw new Error("Component rendered outside the provider tree");
  }

  return context;
};

/**
 * Component used to render components that depend on Web3 being available. These components can then
 * `useConnectedWeb3Context` safely to get web3 stuff without having to null check it.
 */
export const ConnectedWeb3 = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const context = useWeb3React<Web3Provider>();
  const { account, activate, active, chainId, deactivate, error, library } =
    context;
  const [state, setState] = useState<{
    initialized: boolean;
    walletConnectModalOpened: boolean;
    txModalInfo?: {
      visible: boolean;
      description: string;
      txHash: string;
      title: string;
    };
    networkSelectorVisible: boolean;
  }>({
    initialized: false,
    walletConnectModalOpened: false,
    networkSelectorVisible: false,
  });

  const setInitialized = (initialized: boolean) => {
    setState((prev) => ({ ...prev, initialized }));
  };
  const setWalletConnectModalOpened = (walletConnectModalOpened: boolean) =>
    setState((prev) => ({ ...prev, walletConnectModalOpened }));

  const updateInitialized = () => {
    if (!state.initialized) setInitialized(true);
  };

  const setNetworkSelectorVisible = (visible: boolean) => {
    setState((prev) => ({ ...prev, networkSelectorVisible: visible }));
  };

  useEffect(() => {
    const checkNetworkAndUpdate = async () => {
      const connector = localStorage.getItem(STORAGE_KEY_CONNECTOR);
      if (error) {
        if (error instanceof UnsupportedChainIdError && !state.initialized) {
          try {
            if (window.ethereum && window.ethereum.isTrust) {
              return;
            }
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connectors[connector as ConnectorNames]);
            }
          } catch (error) {
            localStorage.removeItem(STORAGE_KEY_CONNECTOR);
            deactivate();
            updateInitialized();
          }
        } else {
          localStorage.removeItem(STORAGE_KEY_CONNECTOR);
          if (!state.initialized) {
            deactivate();
            updateInitialized();
          }
        }
      } else if (connector && Object.keys(connectors).includes(connector)) {
        const isMetaMaskActive =
          window.ethereum && window.ethereum._metamask
            ? await window.ethereum._metamask.isUnlocked()
            : false;
        if (
          !active &&
          (connector !== ConnectorNames.Injected || isMetaMaskActive)
        ) {
          activate(connectors[connector as ConnectorNames])
            .then(() => updateInitialized())
            .catch(() => updateInitialized());
        } else {
          updateInitialized();
        }
      } else {
        updateInitialized();
      }
    };
    checkNetworkAndUpdate();
    // eslint-disable-next-line
  }, [context, library, active, error]);

  const onDisconnect = () => {
    localStorage.removeItem(STORAGE_KEY_CONNECTOR);
    deactivate();
  };

  const setTxModalInfo = (
    visible: boolean,
    title?: string,
    description?: string,
    txHash?: string
  ) => {
    setState((prev) => ({
      ...prev,
      txModalInfo: {
        title: title || "",
        visible,
        description: description || "",
        txHash: txHash || "",
      },
    }));
  };

  const value = {
    account: account || null,
    library,
    networkId: chainId,
    rawWeb3Context: context,
    initialized: state.initialized,
    walletConnectModalOpened: state.walletConnectModalOpened,
    networkSelectorVisible: state.networkSelectorVisible,
    setWalletConnectModalOpened,
    onDisconnect,
    setTxModalInfo,
    setNetworkSelectorVisible,
  };

  return (
    <ConnectedWeb3Context.Provider value={value}>
      {state.initialized ? props.children : null}
      {state.walletConnectModalOpened && (
        <ConnectWalletModal
          onClose={() => setWalletConnectModalOpened(false)}
        />
      )}
      {state.txModalInfo && state.txModalInfo.visible && (
        <TransactionModal
          onClose={() => setTxModalInfo(false)}
          description={state.txModalInfo.description}
          txId={state.txModalInfo.txHash}
          title={state.txModalInfo.title}
        />
      )}
      {state.networkSelectorVisible && <NetworkSelectModal />}
    </ConnectedWeb3Context.Provider>
  );
};

export const WhenConnected = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { account } = useConnectedWeb3Context();

  return <>{account && props.children}</>;
};

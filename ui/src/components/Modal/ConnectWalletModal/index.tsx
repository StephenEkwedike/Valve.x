import { XIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useCallback } from "react";
import { ConnectorNames } from "utils/enums";
import connectors from "utils/connectors";
import { STORAGE_KEY_CONNECTOR, WALLET_ICONS } from "config/constants";
import { getLogger } from "utils/logger";
import { supportedNetworkIds, setupNetwork } from "config/networks";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

interface IProps {
  onClose: () => void;
}

const logger = getLogger("ConnectWalletModal::Index");

const Connector_Name = {
  [ConnectorNames.Injected]: "Metamask",
  [ConnectorNames.TrustWallet]: "Trust Wallet",
  [ConnectorNames.WalletConnect]: "Wallet Connect",
  [ConnectorNames.Fortmatic]: "Fortmatic",
};

export const ConnectWalletModal = (props: IProps) => {
  const context = useWeb3React();

  const { onClose } = props;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === context.connector) {
      setActivatingConnector(undefined);
      onClose();
    }
    // eslint-disable-next-line
  }, [activatingConnector, context.connector]);

  if (context.error) {
    localStorage.removeItem(STORAGE_KEY_CONNECTOR);
    context.deactivate();
    onClose();
    logger.error("Error in web3 context", context.error);
  }

  const isMetamaskEnabled = "ethereum" in window || "web3" in window;
  const isTrustWalletEnabled = isMetamaskEnabled && window.ethereum.isTrust;

  const onClick = async (wallet: ConnectorNames) => {
    const currentConnector = connectors[wallet];
    if (wallet === ConnectorNames.Injected) {
      setActivatingConnector(currentConnector);
    } else if (wallet === ConnectorNames.WalletConnect) {
      setActivatingConnector(currentConnector);
    }
    // else if (wallet === ConnectorNames.TrustWallet) {
    //   setActivatingConnector(currentConnector);
    // }

    if (wallet) {
      if (
        currentConnector instanceof WalletConnectConnector &&
        currentConnector.walletConnectProvider?.rpcUrl
      ) {
        currentConnector.walletConnectProvider = undefined;
      }
      try {
        if (window.ethereum && wallet !== ConnectorNames.WalletConnect) {
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });

          if (!supportedNetworkIds.includes(Number(chainId) as any)) {
            if (isTrustWalletEnabled) {
              onClose();
              return;
            }
            const hasSetup = await setupNetwork();

            if (!hasSetup) {
              onClose();
              return;
            }
          }
        }
        localStorage.setItem(STORAGE_KEY_CONNECTOR, wallet);
        onClose();
        await context.activate(currentConnector);
      } catch (error) {
        console.error(error);
        onClose();
      }
    }
  };

  const resetEverything = useCallback(() => {}, []);

  const onClickCloseButton = useCallback(() => {
    resetEverything(); // we need to do this or the states and functions will keep executing even when the modal is closed by the user
    onClose();
  }, [onClose, resetEverything]);

  const isConnectingToWallet = !!activatingConnector;
  let connectingText = `Connecting to wallet`;
  const connectingToMetamask = activatingConnector === connectors.injected;

  if (connectingToMetamask) {
    connectingText = "Waiting for Approval on Metamask";
  }

  const disableMetamask: boolean = !isMetamaskEnabled || false;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 modal-drop  modal-drop--visible"
        onClick={onClickCloseButton}
      />
      <div
        className="px-6 py-6 pt-4 rounded-2xl w-96 bg-black relative"
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-white">Connect Wallet</p>
          {!isConnectingToWallet && (
            <button className="p-2" onClick={onClickCloseButton}>
              <XIcon className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
        <div className="mt-3">
          {Object.values(ConnectorNames).map((connector) => {
            return (
              <button
                key={connector}
                disabled={disableMetamask}
                className="w-full flex items-center btn__connect_wallet rounded-lg p-3 py-2"
                onClick={() => {
                  onClick(connector);
                }}
              >
                <img
                  src={WALLET_ICONS[connector]}
                  alt="wallet"
                  className="w-8 h-8"
                />
                <p className="text-sm text-white ml-6">
                  {Connector_Name[connector]}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

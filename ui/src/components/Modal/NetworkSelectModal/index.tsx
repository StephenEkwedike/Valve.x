import { XIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useCallback } from "react";
import { ConnectorNames } from "utils/enums";
import connectors from "utils/connectors";
import {
  DEFAULT_NETWORK_ID,
  STORAGE_KEY_CONNECTOR,
  WALLET_ICONS,
} from "config/constants";
import {
  supportedNetworkIds,
  setupNetwork,
  networkIds,
  networks,
} from "config/networks";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useConnectedWeb3Context } from "contexts";
import { NetworkId } from "types/types";

export const NetworkSelectModal = () => {
  const { networkId, setNetworkSelectorVisible } = useConnectedWeb3Context();

  const onClose = () => {
    setNetworkSelectorVisible(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 modal-drop modal-drop--visible"
        onClick={onClose}
      />
      <div
        className="modal__network_select px-3 py-2 md:px-6 md:py-4 rounded-xl bg-black relative"
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center w-full">
          <p className="text-base md:text-lg font-medium text-white">
            Select a Network
          </p>
          <button className="p-2" onClick={onClose}>
            <XIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="mt-4">
          <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
            {Object.values(networkIds).map((nId) => {
              const isSelected = (networkId || DEFAULT_NETWORK_ID) === nId;
              const network = networks[nId as NetworkId];
              return (
                <button
                  key={`${nId}`}
                  className={`bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 w-full px-4 py-3 rounded border ${
                    isSelected
                      ? "border-purple"
                      : "border-dark-700 hover:border-blue"
                  }`}
                  onClick={async () => {
                    setNetworkSelectorVisible(false);
                    if (!isSelected) {
                      await setupNetwork(nId);
                    }
                  }}
                >
                  <img src={network.icon} className="w-8 h-8" alt="" />
                  <p className="text-primary">{network.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

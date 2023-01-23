import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'

import { Logo } from "components";
import {
  DEFAULT_NETWORK_ID,
  ETHER_DECIMAL,
  NULL_ADDRESS,
} from "config/constants";
import { networks } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useScrollYPosition, useTokenBalance } from "helpers";
import { NetworkId } from "types/types";
import { formatBigNumber, shortenAddress } from "utils";
import { NetworkSelector } from "../NetworkSelector";

export const Header = () => {
  const { account, setWalletConnectModalOpened, onDisconnect, networkId } =
    useConnectedWeb3Context();

  const yPosition = useScrollYPosition();
  const { balance } = useTokenBalance(NULL_ADDRESS);
  const navigate = useNavigate();

  const selectedNetwork =
    networks[(networkId || DEFAULT_NETWORK_ID) as NetworkId];

  return (
    <>
      <div
        className={`layout__main__header fixed z-30 inset-x-0 top-0 ${
          yPosition > 80 && "layout__main__header--blur"
        }`}
      >
        <div className="h-full flex justify-between items-center px-4 sm:px-6 md:px-10">
          <Logo />

          <Menu as="div" className="relative flex items-center">
            {account ? (
              <>
                <p className="text-primary text-sm">
                  {formatBigNumber(balance, ETHER_DECIMAL, 4)}{" "}
                  {selectedNetwork.symbol.toUpperCase()}
                </p>
                <NetworkSelector />
                <Menu.Button className="text-primary text-sm font-bold px-3 h-9">
                  {shortenAddress(account)}
                </Menu.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute top-6 right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <button
                          className="block px-4 py-2 text-white text-sm text-right"
                          onClick={() => navigate("/")}
                        >
                          Transfer
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="block px-4 py-2 text-white text-sm text-right"
                          onClick={() => navigate("/profile")}
                        >
                          My Profile
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="block px-4 py-2 text-white text-sm text-right"
                          onClick={() => onDisconnect()}
                        >
                          Disconnect
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            ) : (
              <button
                className="text-primary text-sm font-bold px-3 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full gap-1 flex items-center justify-center h-9"
                onClick={() => {
                  setWalletConnectModalOpened(true);
                }}
              >
                Connect Wallet
              </button>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
};

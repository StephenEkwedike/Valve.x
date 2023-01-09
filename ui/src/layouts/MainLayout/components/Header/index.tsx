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

          <div className="flex items-center">
            {account ? (
              <>
                <p className="text-primary text-sm">
                  {formatBigNumber(balance, ETHER_DECIMAL, 4)}{" "}
                  {selectedNetwork.symbol.toUpperCase()}
                </p>
                <NetworkSelector />
                <button
                  onClick={() => {
                    onDisconnect();
                  }}
                  className="text-primary text-sm font-bold px-3 h-9"
                >
                  {shortenAddress(account)}
                </button>
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
          </div>
        </div>
      </div>
    </>
  );
};

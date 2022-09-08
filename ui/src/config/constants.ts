import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "ethers/lib/utils";
import { ConnectorNames } from "utils/enums";

export const STORAGE_KEY_CONNECTOR = "CONNECTOR";

export const LOGGER_ID = "VALVE";

export const DEFAULT_NETWORK_ID = 97; // mainnet

export const WALLET_ICONS: { [key in ConnectorNames]: string } = {
  [ConnectorNames.Injected]: "/assets/wallets/metamask-color.svg",
  // [ConnectorNames.TrustWallet]: "/assets/wallets/trust-wallet.svg",
  [ConnectorNames.WalletConnect]: "/assets/wallets/wallet-connect.svg",
};

export const ETHER_DECIMAL = 18;

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ZERO = BigNumber.from(0);
export const ONE_ETHER = parseEther("1");

export const FEE_MULTIPLIER = 10000;

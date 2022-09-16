import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { DEFAULT_NETWORK_ID } from "../config/constants";
import { supportedNetworkIds, supportedNetworkURLs } from "../config/networks";

const injected = new InjectedConnector({
  supportedChainIds: supportedNetworkIds,
});

const walletconnect = new WalletConnectConnector({
  rpc: supportedNetworkURLs,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC || "",
  chainId: 1,
});

export default {
  injected,
  trustwallet: injected,
  walletconnect,
  fortmatic,
};

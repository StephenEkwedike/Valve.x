import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { DEFAULT_NETWORK_ID } from "../config/constants";
import { supportedNetworkIds, supportedNetworkURLs } from "../config/networks";

const POLLING_INTERVAL = 12000;

const injected = new InjectedConnector({
  supportedChainIds: supportedNetworkIds,
});

const walletconnect = new WalletConnectConnector({
  rpc: supportedNetworkURLs,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const ledger = new LedgerConnector({
  chainId: DEFAULT_NETWORK_ID,
  url: supportedNetworkURLs[DEFAULT_NETWORK_ID],
  pollingInterval: POLLING_INTERVAL,
});

const trezor = new TrezorConnector({
  chainId: DEFAULT_NETWORK_ID,
  url: supportedNetworkURLs[DEFAULT_NETWORK_ID],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "https://8rg3h.csb.app/",
});

const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC || "",
  chainId: DEFAULT_NETWORK_ID,
});

export default {
  injected,
  trustwallet: injected,
  walletconnect,
};

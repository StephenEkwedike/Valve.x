import { BigNumber } from "ethers";
import { TransferStatus } from "utils/enums";

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}

export type Maybe<T> = T | null;

export interface INetwork {
  label: string;
  url: string;
  symbol: string;
  icon: string;
  contracts: {
    valve: string;
    valve721: string;
    valve1155: string;
    multicall: string;
  };
  etherscanUri: string;
  subgraph: string;
}

export type NetworkId = 1 | 137 | 43114 | 250 | 10 | 56 | 97;

export type KnownContracts = keyof INetwork["contracts"];

export type KnownSubgraph = keyof INetwork["subgraph"];

export type KnownToken =
  | "busd"
  | "usdt"
  | "usdc"
  | "eth"
  | "bnb"
  | "matic"
  | "avax"
  | "wbtc"
  | "ftm"
  | "op"
  | "apecoin"
  | "uni"
  | "sushi"
  | "cake"
  | "0x";

export interface IKnownTokenData {
  name: string;
  symbol: string;
  addresses: { [key in NetworkId]: string };
  decimals: { [key in NetworkId]: number };
  image: string[];
  coingeckoId: string;
}

export interface IToken {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  image: string[];
  coingeckoId: string;
}

export type KnownNFT = 
  | "cryptopunks"
  | "azuki"
  | "valhalla"
  | "doodle"
  | "zionlions"
  | "marco";

export interface IKnownNFTData {
  name: string;
  symbol: string;
  address: string;
  image: string[];
  collectionId: string;
  platformId: number;
}

export interface INFT {
  address: string;
  symbol: string;
  name: string;
  image: string[];
  tokenId?: number;
  collectionId?: string;
  platformId?: number;
}

export interface INFTTransfer {
  id: BigNumber;
  token: string;
  from: string;
  to: string;
  tokenId: BigNumber;
  data?: string;
  expireAt: number;
  status: TransferStatus;
  exId: string;
}

export interface Call {
  address: string;
  name: string;
  params?: any[];
}

export interface IValveInfo {
  feeRecipient: string;
  feePercent: number;
  validDuration: number;
}

export interface ITokenTransfer {
  id: BigNumber;
  token: string;
  from: string;
  to: string;
  amount: BigNumber;
  expireAt: number;
  status: TransferStatus;
  exId: string;
}

export interface IContact {
  id?: string;
  user: string;
  wallet: string;
  name: string;
  timestamp: number;
  signature: string;
}

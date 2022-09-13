import { BigNumber } from "ethers";
import { LockType, TokenType, TransferStatus } from "utils/enums";

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
    multicall: string;
  };
  etherscanUri: string;
  subgraph: {};
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
  | "btc"
  | "ftm"
  | "op";

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

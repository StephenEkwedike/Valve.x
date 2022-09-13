import { providers } from "ethers";
import { entries } from "utils/type-utils";
import {
  IKnownTokenData,
  INetwork,
  IToken,
  KnownContracts,
  KnownSubgraph,
  KnownToken,
  NetworkId,
} from "types/types";
import { DEFAULT_NETWORK_ID, NULL_ADDRESS } from "./constants";

export const networkIds = {
  mainnet: 1,
  bsc: 56,
  bsct: 97,
  matic: 137,
  avax: 43114,
  ftm: 250,
  optimism: 10,
} as const;

export const networks: { [K in NetworkId]: INetwork } = {
  [networkIds.bsct]: {
    label: "Binance Testnet",
    symbol: "BNB",
    icon: "/assets/tokens/bnb.png",
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    contracts: {
      valve: "0x7f57C43f677621219271094A41AbeA71bFE96856",
      multicall: "0x62dDb8449123CF925137632ca214E8Be6Ec92b5e",
    },
    etherscanUri: "https://testnet.bscscan.com/",
    subgraph: {},
  },
  [networkIds.bsc]: {
    label: "Binance ",
    symbol: "BNB",
    icon: "/assets/tokens/bnb.png",
    url: "https://bsc-dataseed.binance.org/",
    contracts: {
      valve: "",
      multicall: "",
    },
    etherscanUri: "https://bscscan.com/",
    subgraph: {},
  },
  [networkIds.mainnet]: {
    label: "Ethereum ",
    icon: "/assets/tokens/eth.png",
    symbol: "ETH",
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    contracts: {
      valve: "",
      multicall: "",
    },
    etherscanUri: "https://etherscan.io/",
    subgraph: {},
  },
  [networkIds.matic]: {
    label: "Polygon ",
    symbol: "MATIC",
    icon: "/assets/tokens/matic.png",
    url: "https://polygon-rpc.com/",
    contracts: {
      valve: "",
      multicall: "",
    },
    etherscanUri: "https://polygonscan.com/",
    subgraph: {},
  },
  [networkIds.avax]: {
    label: "Avalanche ",
    symbol: "AVAX",
    icon: "/assets/tokens/avax.png",
    url: "https://api.avax.network/ext/bc/C/rpc",
    contracts: {
      valve: "",
      multicall: "",
    },
    etherscanUri: "https://snowtrace.io/",
    subgraph: {},
  },
  [networkIds.optimism]: {
    label: "Optimism ",
    symbol: "OP",
    icon: "/assets/tokens/op.png",
    url: "https://mainnet.optimism.io",
    contracts: {
      valve: "",
      multicall: "",
    },
    etherscanUri: "https://optimistic.etherscan.io/",
    subgraph: {},
  },
  [networkIds.ftm]: {
    label: "Fantom ",
    symbol: "FTM",
    icon: "/assets/tokens/ftm.png",
    url: "https://rpc.ankr.com/fantom/",
    contracts: {
      valve: "",
      multicall: "",
    },
    etherscanUri: "https://ftmscan.com/",
    subgraph: {},
  },
};

export const knownTokens: { [K in KnownToken]: IKnownTokenData } = {
  usdt: {
    name: "USDT",
    symbol: "USDT",
    addresses: {
      [networkIds.bsct]: "0xa62975610cA6eaDce970B00Ab970E2137e90701e",
      [networkIds.bsc]: "0x55d398326f99059ff775485246999027b3197955",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/usdt.png"],
    coingeckoId: "tether",
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    addresses: {
      [networkIds.bsct]: "0xc979B0BB215137bdb8aE8be1731F28e796bd00B8",
      [networkIds.bsc]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      [networkIds.mainnet]: NULL_ADDRESS,
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/eth.png"],
    coingeckoId: "ethereum",
  },
  busd: {
    name: "BUSD",
    symbol: "BUSD",
    addresses: {
      [networkIds.bsct]: "0xcF321EC1e15d00D6Bda20fB2D1527b7b738EcE44",
      [networkIds.bsc]: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/busd.png"],
    coingeckoId: "binance-usd",
  },
  usdc: {
    name: "USDC",
    symbol: "USDC",
    addresses: {
      [networkIds.bsct]: "0xb20244022cA288B13d1CC4c669d4F28BCfda14b6",
      [networkIds.bsc]: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/usdc.png"],
    coingeckoId: "usd-coin",
  },
  avax: {
    name: "AVAX",
    symbol: "AVAX",
    addresses: {
      [networkIds.bsct]: "0x1f8A9164b01A43d8d64C0a593Fc398b671302F91",
      [networkIds.bsc]: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: NULL_ADDRESS,
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/avax.png"],
    coingeckoId: "avalanche-2",
  },
  bnb: {
    name: "BNB",
    symbol: "BNB",
    addresses: {
      [networkIds.bsct]: NULL_ADDRESS,
      [networkIds.bsc]: NULL_ADDRESS,
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/bnb.png"],
    coingeckoId: "binancecoin",
  },
  matic: {
    name: "MATIC",
    symbol: "MATIC",
    addresses: {
      [networkIds.bsct]: "0x71514b29526a86b9e6047c6994C3be4C4C735fD7",
      [networkIds.bsc]: "0xc836d8dc361e44dbe64c4862d55ba041f88ddd39",
      [networkIds.mainnet]: "",
      [networkIds.matic]: NULL_ADDRESS,
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/matic.png"],
    coingeckoId: "matic-network",
  },
  btc: {
    name: "BTC",
    symbol: "BTC",
    addresses: {
      [networkIds.bsct]: "0x8c0640134B0C75E45DB79449a147736C020D09ac",
      [networkIds.bsc]: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/btc.png"],
    coingeckoId: "bitcoin",
  },
  ftm: {
    name: "FTM",
    symbol: "FTM",
    addresses: {
      [networkIds.bsct]: "0x64D5a9B640414312Dbf50e7153070FFE0CffB910",
      [networkIds.bsc]: "0xad29abb318791d579433d831ed122afeaf29dcfe",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: NULL_ADDRESS,
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/ftm.png"],
    coingeckoId: "fantom",
  },
  op: {
    name: "Optimism",
    symbol: "OP",
    addresses: {
      [networkIds.bsct]: "0x64D5a9B640414312Dbf50e7153070FFE0CffB910",
      [networkIds.bsc]: "0xad29abb318791d579433d831ed122afeaf29dcfe",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: NULL_ADDRESS,
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/op.png"],
    coingeckoId: "optimism",
  },
  apecoin: {
    name: "ApeCoin",
    symbol: "APE",
    addresses: {
      [networkIds.bsct]: "",
      [networkIds.bsc]: "",
      [networkIds.mainnet]: "0x4d224452801aced8b2f0aebe155379bb5d594381",
      [networkIds.matic]: "0xb7b31a6bc18e48888545ce79e83e06003be70930",
      [networkIds.avax]: "",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 18,
      [networkIds.matic]: 18,
      [networkIds.avax]: 18,
      [networkIds.ftm]: 18,
      [networkIds.optimism]: 18,
    },
    image: ["/assets/tokens/apecoin.png"],
    coingeckoId: "apecoin",
  },
};

export const tokenIds = Object.keys(knownTokens);

export const supportedNetworkIds = Object.keys(networks).map(
  Number
) as NetworkId[];

export const supportedNetworkURLs = entries(networks).reduce<{
  [networkId: number]: string;
}>(
  (acc, [networkId, network]) => ({
    ...acc,
    [networkId]: network.url,
  }),
  {}
);

const validNetworkId = (networkId: number): networkId is NetworkId => {
  return networks[networkId as NetworkId] !== undefined;
};

export const getToken = (tokenId: KnownToken, networkId?: number): IToken => {
  const token = knownTokens[tokenId];

  if (!token) {
    throw new Error(`Unsupported token id: '${tokenId}'`);
  }
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }
  return {
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals[fNetworkId],
    address: token.addresses[fNetworkId],
    image: token.image,
    coingeckoId: token.coingeckoId,
  };
};

export const getTokenFromAddress = (
  address: string,
  chianId?: number
): IToken => {
  const networkId = chianId || DEFAULT_NETWORK_ID;

  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }

  for (const token of Object.values(knownTokens)) {
    const tokenAddress = token.addresses[networkId];

    // token might not be supported in the current network
    if (!tokenAddress) {
      continue;
    }

    if (tokenAddress.toLowerCase() === address.toLowerCase()) {
      return {
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals[networkId],
        address: tokenAddress,
        image: token.image,
        coingeckoId: token.coingeckoId,
      };
    }
  }

  throw new Error(
    `Couldn't find token with address '${address}' in network '${networkId}'`
  );
};

export const getEtherscanUri = (networkId?: number): string => {
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }

  return networks[fNetworkId].etherscanUri;
};

export const getContractAddress = (
  contract: KnownContracts,
  networkId?: number
): string => {
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }
  return networks[fNetworkId].contracts[contract];
};

export const getSubgraph = (
  graph: KnownSubgraph,
  networkId?: number
): string => {
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }
  return networks[fNetworkId].subgraph[graph];
};

export const DefaultReadonlyProvider = new providers.JsonRpcProvider(
  networks[DEFAULT_NETWORK_ID].url,
  DEFAULT_NETWORK_ID
);

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (networkId?: NetworkId) => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = networkId || DEFAULT_NETWORK_ID;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });

      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: networks[chainId].label,
              nativeCurrency: {
                name: networks[chainId].label,
                symbol: networks[chainId].symbol,
                decimals: 18,
              },
              rpcUrls: [networks[chainId].url],
              blockExplorerUrls: [networks[chainId].etherscanUri],
            },
          ],
        });
        return true;
      }

      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the Ethereum network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

import { providers } from "ethers";
import { entries } from "utils/type-utils";
import {
  IKnownNFTData,
  IKnownTokenData,
  INetwork,
  INFT,
  IToken,
  KnownContracts,
  KnownNFT,
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
    url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
    contracts: {
      valve: "0x6f4Fa6626eA6aa11007849d0030b65d05aFDAed4",
      valve721: "0x0d45783b56a894afAad0209ed5ae6409254d3EDF",
      valve1155: "0xaD6203585d29193022b4B260ce0505eE6407eF8b",
      multicall: "0x62dDb8449123CF925137632ca214E8Be6Ec92b5e",
    },
    etherscanUri: "https://testnet.bscscan.com/",
    subgraph: "https://api.thegraph.com/subgraphs/name/nevermind0825/valve-subgraph",
  },
  [networkIds.bsc]: {
    label: "Binance ",
    symbol: "BNB",
    icon: "/assets/tokens/bnb.png",
    url: "https://bsc-dataseed.binance.org/",
    contracts: {
      valve: "0xA6C4Dca896B156234aF2E62Df5374cc1379f0105",
      valve721: "0xB866bC67D6c30D8EBEa2e55FD7720Ac6DB9329dD",
      valve1155: "0xdb99DA9c64de85F821BD8d3074b478c9fd426554",
      multicall: "0x87B45489F1cC9Cc8DB1D75AaaF094da1a6C433de",
    },
    etherscanUri: "https://bscscan.com/",
    subgraph: "",
  },
  [networkIds.mainnet]: {
    label: "Ethereum ",
    icon: "/assets/tokens/eth.png",
    symbol: "ETH",
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    contracts: {
      valve: "0x2364e841458051f04498b54cD65133A018C897B7",
      valve721: "0x129505b7D50cC1913edda331C0Ca6b40Ad026f38",
      valve1155: "0xBA3CE31F255523421EAD1642793C44244188b5C3",
      multicall: "0x87B45489F1cC9Cc8DB1D75AaaF094da1a6C433de",
    },
    etherscanUri: "https://etherscan.io/",
    subgraph: "",
  },
  [networkIds.matic]: {
    label: "Polygon ",
    symbol: "MATIC",
    icon: "/assets/tokens/matic.png",
    url: "https://polygon-rpc.com/",
    contracts: {
      valve: "0x3F6066BcbA8ECe43369650Dd564b36380C1cC211",
      valve721: "0xF76E739009df2A2068D97bB72932A69635BBD7F3",
      valve1155: "0x129505b7D50cC1913edda331C0Ca6b40Ad026f38",
      multicall: "0x87B45489F1cC9Cc8DB1D75AaaF094da1a6C433de",
    },
    etherscanUri: "https://polygonscan.com/",
    subgraph: "",
  },
  [networkIds.avax]: {
    label: "Avalanche ",
    symbol: "AVAX",
    icon: "/assets/tokens/avax.png",
    url: "https://api.avax.network/ext/bc/C/rpc",
    contracts: {
      valve: "0x50E06a532c89A2a68517dB8DbD8D8E25185534AD",
      valve721: "0xd5784474A853863B4A3E0Eb1216B3e826A19b58c",
      valve1155: "0xaf907209BfDF4d7F49De4667784b4bF74f67f000",
      multicall: "0x87B45489F1cC9Cc8DB1D75AaaF094da1a6C433de",
    },
    etherscanUri: "https://snowtrace.io/",
    subgraph: "",
  },
  [networkIds.optimism]: {
    label: "Optimism ",
    symbol: "OP",
    icon: "/assets/tokens/op.png",
    url: "https://mainnet.optimism.io",
    contracts: {
      valve: "0x50E06a532c89A2a68517dB8DbD8D8E25185534AD",
      valve721: "0xd5784474A853863B4A3E0Eb1216B3e826A19b58c",
      valve1155: "0x96F43b501c65BFE4D64560A1A60B51bF296c9d0a",
      multicall: "0x87B45489F1cC9Cc8DB1D75AaaF094da1a6C433de",
    },
    etherscanUri: "https://optimistic.etherscan.io/",
    subgraph: "",
  },
  [networkIds.ftm]: {
    label: "Fantom ",
    symbol: "FTM",
    icon: "/assets/tokens/ftm.png",
    url: "https://rpc.ankr.com/fantom/",
    contracts: {
      valve: "0xF76E739009df2A2068D97bB72932A69635BBD7F3",
      valve721: "0x129505b7D50cC1913edda331C0Ca6b40Ad026f38",
      valve1155: "0xBA3CE31F255523421EAD1642793C44244188b5C3",
      multicall: "0x87B45489F1cC9Cc8DB1D75AaaF094da1a6C433de",
    },
    etherscanUri: "https://ftmscan.com/",
    subgraph: "",
  },
};

export const knownTokens: { [K in KnownToken]: IKnownTokenData } = {
  wbtc: {
    name: "wrapped BTC",
    symbol: "wBTC",
    addresses: {
      [networkIds.bsct]: "0x8c0640134B0C75E45DB79449a147736C020D09ac",
      [networkIds.bsc]: "",
      [networkIds.mainnet]: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      [networkIds.matic]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
      [networkIds.avax]: "0x50b7545627a5162f82a992c33b87adc75187b218",
      [networkIds.ftm]: "0x321162cd933e2be498cd2267a90534a804051b11",
      [networkIds.optimism]: "0x68f180fcce6836688e9084f035309e29bf0a2095",
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
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    addresses: {
      [networkIds.bsct]: "0xc979B0BB215137bdb8aE8be1731F28e796bd00B8",
      [networkIds.bsc]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      [networkIds.mainnet]: NULL_ADDRESS,
      [networkIds.matic]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      [networkIds.avax]: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
      [networkIds.ftm]: "0x74b23882a30290451a17c44f4f05243b6b58c76d",
      [networkIds.optimism]: "0x4200000000000000000000000000000000000006",
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
  usdt: {
    name: "USDT",
    symbol: "USDT",
    addresses: {
      [networkIds.bsct]: "0xa62975610cA6eaDce970B00Ab970E2137e90701e",
      [networkIds.bsc]: "0x55d398326f99059ff775485246999027b3197955",
      [networkIds.mainnet]: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      [networkIds.matic]: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      [networkIds.avax]: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
      [networkIds.ftm]: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
      [networkIds.optimism]: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 6,
      [networkIds.matic]: 6,
      [networkIds.avax]: 6,
      [networkIds.ftm]: 6,
      [networkIds.optimism]: 6,
    },
    image: ["/assets/tokens/usdt.png"],
    coingeckoId: "tether",
  },

  busd: {
    name: "BUSD",
    symbol: "BUSD",
    addresses: {
      [networkIds.bsct]: "0xcF321EC1e15d00D6Bda20fB2D1527b7b738EcE44",
      [networkIds.bsc]: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      [networkIds.mainnet]: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
      [networkIds.matic]: "0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
      [networkIds.avax]: "0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98",
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
      [networkIds.mainnet]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      [networkIds.matic]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      [networkIds.avax]: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
      [networkIds.ftm]: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
      [networkIds.optimism]: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    },
    decimals: {
      [networkIds.bsct]: 18,
      [networkIds.bsc]: 18,
      [networkIds.mainnet]: 6,
      [networkIds.matic]: 6,
      [networkIds.avax]: 6,
      [networkIds.ftm]: 6,
      [networkIds.optimism]: 6,
    },
    image: ["/assets/tokens/usdc.png"],
    coingeckoId: "usd-coin",
  },
  avax: {
    name: "AVAX",
    symbol: "AVAX",
    addresses: {
      [networkIds.bsct]: "0x1f8A9164b01A43d8d64C0a593Fc398b671302F91",
      [networkIds.bsc]: "",
      [networkIds.mainnet]: "",
      [networkIds.matic]: "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
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
      [networkIds.matic]: "0xa649325aa7c5093d12d6f98eb4378deae68ce23f",
      [networkIds.avax]: "0x264c1383ea520f73dd837f915ef3a732e204a493",
      [networkIds.ftm]: "0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454",
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
      [networkIds.bsc]: "0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
      [networkIds.mainnet]: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
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

  ftm: {
    name: "FTM",
    symbol: "FTM",
    addresses: {
      [networkIds.bsct]: "0x64D5a9B640414312Dbf50e7153070FFE0CffB910",
      [networkIds.bsc]: "0xad29abb318791d579433d831ed122afeaf29dcfe",
      [networkIds.mainnet]: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
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
      [networkIds.bsct]: "",
      [networkIds.bsc]: "",
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
  uni: {
    name: "Uniswap",
    symbol: "UNI",
    addresses: {
      [networkIds.bsct]: "",
      [networkIds.bsc]: "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
      [networkIds.mainnet]: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      [networkIds.matic]: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
      [networkIds.avax]: "0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580",
      [networkIds.ftm]: "",
      [networkIds.optimism]: "0x6fd9d7ad17242c41f7131d257212c54a0e816691",
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
    image: ["/assets/tokens/uni.png"],
    coingeckoId: "uniswap",
  },
  cake: {
    name: "PancakeSwap",
    symbol: "CAKE",
    addresses: {
      [networkIds.bsct]: "",
      [networkIds.bsc]: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
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
    image: ["/assets/tokens/cake.png"],
    coingeckoId: "pancakeswap-token",
  },
  sushi: {
    name: "Sushi",
    symbol: "SUSHI",
    addresses: {
      [networkIds.bsct]: "",
      [networkIds.bsc]: "0x947950bcc74888a40ffa2593c5798f11fc9124c4",
      [networkIds.mainnet]: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      [networkIds.matic]: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
      [networkIds.avax]: "0x37b608519f91f70f2eeb0e5ed9af4061722e4f76",
      [networkIds.ftm]: "0xae75a438b2e0cb8bb01ec1e1e376de11d44477cc",
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
    image: ["/assets/tokens/sushi.png"],
    coingeckoId: "sushi",
  },
  "0x": {
    name: "0x",
    symbol: "ZRX",
    addresses: {
      [networkIds.bsct]: "",
      [networkIds.bsc]: "",
      [networkIds.mainnet]: "0xe41d2489571d322189246dafa5ebde1f4699f498",
      [networkIds.matic]: "",
      [networkIds.avax]: "0x596fa47043f99a4e0f122243b841e55375cde0d2",
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
    image: ["/assets/tokens/0x.png"],
    coingeckoId: "0x",
  },
};

export const knownNFTs: { [K in KnownNFT] : IKnownNFTData } = {
  cryptopunks: {
    name: "CryptoPunks",
    symbol: "punk",
    address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    platformId: networkIds.mainnet,
    image: ["/assets/nfts/cryptopunks.png"],
    collectionId: "cryptopunks",
  },
  azuki: {
    name: "Azuki",
    symbol: "AZUKI",
    address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
    platformId: networkIds.mainnet,
    image: ["/assets/nfts/azuki.png"],
    collectionId: "azuki",
  },
  valhalla: {
    name: "Valhalla",
    symbol: "valhalla",
    address: "0x231d3559aa848Bf10366fB9868590F01d34bF240",
    platformId: networkIds.mainnet,
    image: ["/assets/nfts/valhalla.png"],
    collectionId: "valhalla"
  },
  doodle: {
    name: "Doodles",
    symbol: "doodle",
    address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    platformId: networkIds.mainnet,
    image: ["/assets/nfts/doodles.png"],
    collectionId: "doodles-official",
  },
  zionlions: {
    name: "Zion Lions",
    symbol: "ZLS",
    address: "0x3813AD59e50dC6c665951c8c84e15D08Ed68Dfac",
    platformId: networkIds.bsct,
    image: ["/assets/nfts/zion-lion.png"],
    collectionId: "zion-lion",
  },
  marco: {
    name: "Marco NFT",
    symbol: "Marco",
    address: "0x978Ad4B703624ab33835D67D63512DFA5F1554F7",
    platformId: networkIds.bsct,
    image: ["/assets/nfts/marco.png"],
    collectionId: "marco",
  },
  genesispass: {
    name: "GenesisPass",
    symbol: "RichRabbit",
    address: "0x993F5971C8d337919e42116d19D7759aA46263C7",
    platformId: networkIds.bsct,
    image: ["/assets/nfts/genesispass.png"],
    collectionId: "marco",
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

export const getNFT = (nftId: KnownNFT): INFT => {
  const nft = knownNFTs[nftId];

  if (!nft) {
    throw new Error(`Unsupported NFT: '${nftId}'`);
  }
  return {
    name: nft.name,
    symbol: nft.symbol,
    address: nft.address,
    image: nft.image,
    collectionId: nft.collectionId,
    platformId: nft.platformId,
  };
};

export const getNFTFromAddress = (
  address: string,
  chianId?: number
): INFT => {
  const networkId = chianId || DEFAULT_NETWORK_ID;

  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }

  for (const nft of Object.values(knownNFTs)) {
    const nftAddress = nft.address;

    // token might not be supported in the current network
    if (!nftAddress) {
      continue;
    }

    if (nftAddress.toLowerCase() === address.toLowerCase()) {
      return {
        name: nft.name,
        symbol: nft.symbol,
        address: nftAddress,
        image: nft.image,
        collectionId: nft.collectionId,
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
  // graph: KnownSubgraph,
  networkId: number
): string => {
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }
  return networks[fNetworkId].subgraph;
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

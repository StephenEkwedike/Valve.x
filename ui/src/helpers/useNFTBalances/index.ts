import { useState, useEffect } from "react";
import { BigNumber } from "ethers";

import abis from "abis";
import { NULL_ADDRESS } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";
import { INFT } from "types/types";

export const useNFTBalances = (propNfts: INFT[]) => {
  const [nfts] = useState<INFT[]>(propNfts);
  const [balances, setBalances] = useState<{ [key: string]: BigNumber }>({});

  const { account } = useConnectedWeb3Context();
  const { multicall } = useServices();

  useEffect(() => {
    const load = async () => {
      if (!account) {
        setBalances({})
      }
      try {
        const erc721Addrs = nfts
          .filter((nft) => nft.address !== NULL_ADDRESS)
          .map((e) => e.address);
        const calls = erc721Addrs.map((addr) => ({
          name: "balanceOf",
          address: addr,
          params: [account],
        }));
        const response = await multicall.multicallv2(abis.ERC721, calls);
  
        const nftBalances: { [key: string]: BigNumber } = {};
        
        for (let index = 0; index < erc721Addrs.length; index++) {
          nftBalances[erc721Addrs[index].toLocaleLowerCase()] = response[index][0];
        }
        setBalances(() => nftBalances);
      } catch (error) {
        setBalances({})
      }
    }
    load();
  }, [account, multicall, nfts])
  
  return balances;
};

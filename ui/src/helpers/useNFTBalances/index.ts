import { useEffect, useState, useCallback } from "react";
import { BigNumber } from "ethers";

import abis from "abis";
import { NULL_ADDRESS } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";
import { INFT } from "types/types";

export const useNFTBalances = (nfts: INFT[]) => {
  const { account, library: provider } = useConnectedWeb3Context();
  const [balances, setBalances] = useState<{ [key: string]: BigNumber }>({});
  const { multicall } = useServices();

  const load = useCallback(async () => {
    if (!account || !provider) {
      setBalances({});
      return;
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
      console.log({ error });
    }
  }, [account, multicall, nfts, provider]);
  
  useEffect(() => {
    load();
  }, [load]);
  
  return balances;
};

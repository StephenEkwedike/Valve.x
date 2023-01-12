import { useEffect, useState } from "react";
import axios from "axios";

import { INFT } from "types/types";
import { useConnectedWeb3Context } from "contexts";


export const useNFTItems = (propsNFTAddr?: string) => {
  const [nfts, setNFTs] = useState<INFT[]>();

  const { networkId, account } = useConnectedWeb3Context();

  useEffect(() => {
    const fetchNFTs = async () => {
      if(!propsNFTAddr || !account) {
        setNFTs(undefined);
        return;
      }
      try {
        const results = (await axios.get(`http://localhost:5000/api/nfts/${account}/${networkId}/${propsNFTAddr}`)).data;
        setNFTs(() => 
          results.map((item: any) => ({
            address: item.tokenAddress,
            symbol: item.symbol,
            name: item.name,
            image: [item.metadata?.image || ""],
            tokenId: item.tokenId,
          }))
        )
      } catch (error) {
        setNFTs(undefined);
      }
    };
    fetchNFTs();
  }, [account, networkId, propsNFTAddr])
  
  return nfts;
}
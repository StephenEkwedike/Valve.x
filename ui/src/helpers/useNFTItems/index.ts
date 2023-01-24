import { useEffect, useState } from "react";
import axios from "axios";

import { INFT } from "types/types";
import { useConnectedWeb3Context } from "contexts";
import { API_URL } from "config/constants";

interface IState {
  nfts: INFT[];
  loading: boolean;
}

export const useNFTItems = () => {
  const [state, setState] = useState<IState>({ nfts: [], loading: false });

  const { networkId, account } = useConnectedWeb3Context();

  useEffect(() => {
    const fetchNFTs = async () => {
      if(!account) {
        setState((prev) => ({ loading: false, nfts: [] }));
        return;
      }
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const results = (await axios.get(`${API_URL}/nfts/${account}/${networkId}`)).data;
        setState(() => ({
          nfts: results.map((item: any) => ({
            address: item.tokenAddress,
            symbol: item.symbol,
            name: item.name,
            image: [item.metadata?.image || ""],
            tokenId: item.tokenId,
          })),
          loading: false
        }))
      } catch (error) {
        setState((prev) => ({ loading: false, nfts: [] }));
      }
    };
    fetchNFTs();
  }, [account, networkId]);
  
  return state;
}
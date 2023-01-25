import { useEffect, useState } from "react";
import axios from "axios";

import { INFT, INFTTransfer } from "types/types";
import { useConnectedWeb3Context } from "contexts";
import { API_URL } from "config/constants";

interface IState {
  nft?: INFT;
  loading: boolean;
}

export const useNFTMetadata = (nft?: INFTTransfer) => {
  const [state, setState] = useState<IState>({ loading: false });

  const { networkId, account } = useConnectedWeb3Context();

  useEffect(() => {
    const fetchNFTMetaData = async () => {
      if(!account || !nft) {
        setState((prev) => ({ loading: false }));
        return;
      }
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const result = (await axios.get(`${API_URL}/nfts/${nft.token}/${networkId}/${nft.tokenId}`)).data;
        setState(() => ({
          nft: {            
            address: result.token_address,
            symbol: result.symbol,
            name: result.name,
            image: [result.normalized_metadata?.image || ""],
            tokenId: result.token_id,
            platformId: networkId,
          },
          loading: false
        }))
      } catch (error) {
        setState((prev) => ({ loading: false }));
      }
    };
    fetchNFTMetaData();
  }, [account, networkId, nft]);
  
  return state;
}
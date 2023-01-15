import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useConnectedWeb3Context } from "contexts";
import { TokenType } from "utils/enums";
import { getSubgraph } from "config/networks";

interface IState {
  transferIds: number[];
  loading: boolean;
}

export const useUserReceives = (tokenType: TokenType) => {
  const { account, networkId } = useConnectedWeb3Context();
  const [state, setState] = useState<IState>({
    transferIds: [],
    loading: false,
  });

  const loadToken = useCallback(async () => {
    if (!account || !networkId) {
      toast.error("Something went wrong!");
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = (await axios.post(
          getSubgraph(networkId),
          {
            query: `
            {
              transfers(where: {token_: {type: ${TokenType.Token}}, to_: {id: "${account.toLowerCase()}"}}) {
                tId
              }
            }
            `
          }
        )
      ).data
      setState((prev) => ({
        ...prev, 
        loading: false,
        transferIds: response.data.transfers.map((transfer: any) => ~~transfer.tId)
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, transferIds: [], loading: false }));
    }
  }, [account, networkId]);

  const loadNFT = useCallback(async () => {
    if (!account || !networkId) {
      toast.error("Something went wrong!");
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = (await axios.post(
          getSubgraph(networkId),
        {
          query: `
          {
            transfers(where: {token_: {type: ${TokenType.NFT}}, to_: {id: "${account.toLowerCase()}"}}) {
              tId
            }
          }
          `
        }
      )).data
      setState((prev) => ({
        ...prev, 
        loading: false,
        transferIds: response.data.transfers.map((transfer: any) => ~~transfer.tId)
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, transferIds: [], loading: false }));
    }
  }, [account, networkId]);

  useEffect(() => {
    setState(() => ({
      transferIds: [],
      loading: false,
    }));
    let interval: any = undefined;

    if (account) {
      if (tokenType === TokenType.Token) {
        interval = setInterval(loadToken, 60000);
        loadToken();
      } else {
        interval = setInterval(loadNFT, 60000);
        loadNFT();
      }
    }
    return () => {
      if (account && interval) {
        clearInterval(interval);
      }
    };
  }, [account, loadToken, loadNFT, networkId, tokenType]);

  return { ...state, loadToken, loadNFT };
};

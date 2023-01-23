import { useEffect, useState, useCallback } from "react";
import axois from "axios";
import { toast } from "react-toastify";

import { INFTTransfer, ITokenTransfer } from "types/types";
import { TokenType } from "utils/enums";
import { BigNumber } from "ethers";
import { getTransferStatus } from "utils";
import { getSubgraph } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";

interface IState {
  loading: boolean;
  tokenData?: ITokenTransfer;
  nftData?: INFTTransfer;
}

export const useTransfer = (id: any, tokenType: TokenType) => {
  const [state, setState] = useState<IState>({ loading: false });

  const { networkId } = useConnectedWeb3Context();
  const { valve, valve721 } = useServices();

  const loadToken = useCallback(async () => {
    try {
      if (!networkId) {
        toast.error("Something went wrong!");
        return;
      }
      setState((prev) => ({ ...prev, loading: true }));
      const subgraph = getSubgraph(networkId);
      let result: ITokenTransfer;
      if (subgraph) {
        const response = (await axois.post(
          subgraph,
          {
            query: `
              {
                transfer(id: "${TokenType.Token}-${id}") {
                  tId
                  token {
                    id
                  }
                  from {
                    id
                  }
                  to {
                    id
                  }
                  amount
                  status
                  expireAt
                  exId
                  isDirect
                  createTimestamp
                  cancelTimestamp
                  acceptTimestamp
                }
              }
            `
          }
        )).data

        if(!response.data.transfer) {
          setState(() => ({ loading: false }));
          return;
        }
        result = {
          id: BigNumber.from(response.data.transfer.tId),
          token: response.data.transfer.token.id,
          from: response.data.transfer.from.id,
          to: response.data.transfer.to.id,
          amount: BigNumber.from(response.data.transfer.amount),
          status: getTransferStatus(response.data.transfer.status),
          expireAt: response.data.transfer.expireAt,
          exId: response.data.transfer.exId,
          isDirect: response.data.transfer.isDirect,
          createTimestamp: response.data.transfer.createTimestamp,
          cancelTimestamp: response.data.transfer.cancelTimestamp,
          acceptTimestamp: response.data.transfer.acceptTimestamp,
        }
      } else {
        result = await valve.getTransfer(id);
      }

      setState((prev) => ({ 
        ...prev, 
        loading: false, 
        tokenData: result
      }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [id, networkId, valve]);

  const loadNFT = useCallback(async () => {
    try {
      if (!networkId) {
        toast.error("Something went wrong!");
        return;
      }
      setState((prev) => ({ ...prev, loading: true }));
      const subgraph = getSubgraph(networkId);
      let result: INFTTransfer;
      if (subgraph) {
        const response = (await axois.post(
          subgraph,
          {
            query: `
              {
                transfer(id: "${TokenType.NFT}-${id}") {
                  tId
                  token {
                    id
                  }
                  from {
                    id
                  }
                  to {
                    id
                  }
                  tokenId
                  expireAt
                  status
                  exId
                  isDirect
                  createTimestamp
                  cancelTimestamp
                  acceptTimestamp
                }
              }
            `
          }
        )).data
        
        if(!response.data.transfer) {
          setState(() => ({ loading: false }));
          return;
        }
        result = {
          id: BigNumber.from(response.data.transfer.tId),
          token: response.data.transfer.token.id,
          from: response.data.transfer.from.id,
          to: response.data.transfer.to.id,
          tokenId: BigNumber.from(response.data.transfer.tokenId),
          status: getTransferStatus(response.data.transfer.status),
          expireAt: response.data.transfer.expireAt,
          exId: response.data.transfer.exId,
          isDirect: response.data.transfer.isDirect,
          createTimestamp: response.data.transfer.createTimestamp,
          cancelTimestamp: response.data.transfer.cancelTimestamp,
          acceptTimestamp: response.data.transfer.acceptTimestamp,
        }
      } else {
        result = await valve721.getTransfer(id);
      }
      setState((prev) => ({ 
        ...prev, 
        loading: false, 
        nftData: result
      }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [id, networkId, valve721]);

  useEffect(() => {
    setState(() => ({ loading: false }));
    if (tokenType === TokenType.Token) loadToken();
    else loadNFT()
  }, [loadNFT, loadToken, tokenType]);

  return { ...state, loadToken, loadNFT };
};

import { useEffect, useState, useCallback } from "react";
import axois from "axios";
import { toast } from "react-toastify";

import { INFTTransfer, ITokenTransfer } from "types/types";
import { TokenType } from "utils/enums";
import { BigNumber } from "ethers";
import { getTransferStatus } from "utils";
import { getSubgraph } from "config/networks";
import { useConnectedWeb3Context } from "contexts";

interface IState {
  loading: boolean;
  tokenData?: ITokenTransfer;
  nftData?: INFTTransfer;
}

export const useTransfer = (id: any, tokenType: TokenType) => {
  const [state, setState] = useState<IState>({ loading: false });

  const { networkId } = useConnectedWeb3Context();

  const loadToken = useCallback(async () => {
    try {
      if (!networkId) {
        toast.error("Something went wrong!");
        return;
      }
      setState((prev) => ({ ...prev, loading: true }));
      const response = (
        await axois.post(
          getSubgraph(networkId),
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
                }
              }
            `
          }
        )
      ).data

      if(!response.data.transfer) {
        toast.error("Something went wrong!");
        setState(() => ({ loading: false }));
        return;
      }

      setState((prev) => ({ 
        ...prev, 
        loading: false, 
        tokenData:  {
          id: BigNumber.from(response.data.transfer.tId),
          token: response.data.transfer.token.id,
          from: response.data.transfer.from.id,
          to: response.data.transfer.to.id,
          amount: BigNumber.from(response.data.transfer.amount),
          status: getTransferStatus(response.data.transfer.status),
          expireAt: response.data.transfer.expireAt,
          exId: response.data.transfer.exId
        }
      }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [id, networkId]);

  const loadNFT = useCallback(async () => {
    try {
      if (!networkId) {
        toast.error("Something went wrong!");
        return;
      }
      setState((prev) => ({ ...prev, loading: true }));
      const response = (
        await axois.post(
          getSubgraph(networkId),
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
                  status
                  exId
                }
              }
            `
          }
        )
      ).data

      if(!response.data.transfer) {
        toast.error("Something went wrong!");
        setState(() => ({ loading: false }));
        return;
      }

      setState((prev) => ({ 
        ...prev, 
        loading: false, 
        nftData: {
          id: BigNumber.from(response.data.transfer.tId),
          token: response.data.transfer.token.id,
          from: response.data.transfer.from.id,
          to: response.data.transfer.to.id,
          tokenId: BigNumber.from(response.data.transfer.tokenId),
          status: getTransferStatus(response.data.transfer.status),
          expireAt: 0,
          exId: response.data.transfer.exId
        }
      }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [id, networkId]);

  useEffect(() => {
    setState(() => ({ loading: false }));
    if (tokenType === TokenType.Token) loadToken();
    else loadNFT()
  }, [loadNFT, loadToken, tokenType]);

  return { ...state, loadToken, loadNFT };
};

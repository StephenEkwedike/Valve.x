import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import abis from "abis";
import { useConnectedWeb3Context, useSelectedTokenTypeContext } from "contexts";
import { TokenType } from "utils/enums";
import { getSubgraph } from "config/networks";
import { useServices } from "helpers/useServices";

interface IState {
  transferIds: number[];
  loading: boolean;
}

export const useUserTransfers = () => {
  const { account, networkId } = useConnectedWeb3Context();
  const { tokenType } = useSelectedTokenTypeContext();
  const { multicall, valve, valve721 } = useServices();

  const [state, setState] = useState<IState>({
    transferIds: [],
    loading: false,
  });

  const load = useCallback(async () => {
    try {
      if (!account || !networkId) {
        toast.error("Something went wrong!");
        return;
      }
      setState((prev) => ({ ...prev, loading: true }));
      const subgraph = getSubgraph(networkId);
      let results: number[];
      if (subgraph) {
        const response = (await axios.post(subgraph, {
          query: `
          {
            transfers(
              orderBy: createTimestamp, 
              orderDirection: desc, 
              where: {token_: {type: ${tokenType}}, from_: {id: "${account.toLowerCase()}"}}
            ) {
              tId
            }
          }
          `
        })).data

        if(!response.data.transfers) {
          setState((prev) => ({ ...prev, transferIds: [], loading: false }));
          return;
        } 
        results = response.data.transfers.map((transfer: any) => ~~transfer.tId);
      } else {
        let instance;
        let instanceAbi;
        if (tokenType === TokenType.Token) {
          instance = valve;
          instanceAbi = abis.Valve;
        } else {
          instance = valve721;
          instanceAbi = abis.Valve721;
        }

        const count = await instance.getUserTransferCount(account);
        const calls = [];
        for (let index = 0; index < count; index++) {
          calls.push({
            name: "transferCreators",
            address: instance.address,
            params: [account, index],
          });
        }

        const response = await multicall.multicallv2(instanceAbi, calls);

        results = response.map((e: any) => e[0].toNumber());
      }

      setState((prev) => ({
        ...prev, 
        loading: false,
        transferIds: results
      }));
    } catch (error) {
      console.error(error);
      setState((prev) => ({ ...prev, transferIds: [], loading: false }));
    }
  }, [account, multicall, networkId, tokenType, valve, valve721]);

  // const loadNFT = useCallback(async () => {
  //   if (!account || !networkId) {
  //     toast.error("Something went wrong!");
  //     return;
  //   }
  //   setState((prev) => ({ ...prev, loading: true }));
  //   try {
  //     const subgraph = getSubgraph(networkId);
  //     let results: number[];
  //     if (subgraph) {
  //       const response = (await axios.post(
  //         subgraph,
  //         {
  //           query: `
  //           {
  //             transfers(
  //               orderBy: createTimestamp, 
  //               orderDirection: desc, 
  //               where: {token_: {type: ${TokenType.NFT}}, from_: {id: "${account.toLowerCase()}"}}
  //             ) {
  //               tId
  //             }
  //           }
  //           `
  //         }
  //       )).data

  //       if(!response.data.transfers) {
  //         setState((prev) => ({ ...prev, transferIds: [], loading: false }));
  //         return;
  //       }
  
  //       results = response.data.transfers.map((transfer: any) => ~~transfer.tId);
  //     } else {
  //       const count = await valve721.getUserTransferCount(account);
  //       const calls = [];
  //       for (let index = 0; index < count; index++) {
  //         calls.push({
  //           name: "transferCreators",
  //           address: valve721.address,
  //           params: [account, index],
  //         });
  //       }

  //       const response = await multicall.multicallv2(abis.Valve721, calls);

  //       results = response.map((e: any) => e[0].toNumber());
  //     }

  //     setState((prev) => ({
  //       ...prev, 
  //       loading: false,
  //       transferIds: results
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //     setState((prev) => ({ ...prev, transferIds: [], loading: false }));
  //   }
  // }, [account, multicall, networkId, valve721]);

  useEffect(() => {
    setState(() => ({
      transferIds: [],
      loading: false,
    }));
    let interval: any = undefined;

    if (account) {
      interval = setInterval(load, 60000);
      load();
    }
    return () => {
      if (account && interval) {
        clearInterval(interval);
      }
    };
  }, [account, load, networkId, tokenType]);

  return { ...state, load };
};

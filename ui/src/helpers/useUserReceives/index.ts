import { useEffect, useState, useCallback } from "react";

import abis from "abis";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";
import { TokenType } from "utils/enums";

interface IState {
  transferIds: number[];
  loading: boolean;
}

export const useUserReceives = (tokenType: TokenType) => {
  const { account, networkId } = useConnectedWeb3Context();
  const { multicall, valve, valve721 } = useServices();
  const [state, setState] = useState<IState>({
    transferIds: [],
    loading: false,
  });

  const loadToken = useCallback(async () => {
    if (!account) {
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const count = await valve.getUserReceiveCount(account);
      const calls = [];
      for (let index = 0; index < count; index++) {
        calls.push({
          name: "transferReceivers",
          address: valve.address,
          params: [account, index],
        });
      }
      const response = await multicall.multicallv2(abis.Valve, calls);
      const ids = response.map((e: any) => e[0].toNumber());
      setState((prev) => ({ ...prev, transferIds: ids, loading: false }));
    } catch (error) {
      setState((prev) => ({ ...prev, transferIds: [], loading: false }));
    }
  }, [account, multicall, valve]);

  const loadNFT = useCallback(async () => {
    if (!account) {
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const count = await valve721.getUserReceiveCount(account);
      const calls = [];
      for (let index = 0; index < count; index++) {
        calls.push({
          name: "transferReceivers",
          address: valve721.address,
          params: [account, index],
        });
      }
      const response = await multicall.multicallv2(abis.Valve, calls);
      const ids = response.map((e: any) => e[0].toNumber());
      setState((prev) => ({ ...prev, transferIds: ids, loading: false }));
    } catch (error) {
      setState((prev) => ({ ...prev, transferIds: [], loading: false }));
    }
  }, [account, multicall, valve721]);

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

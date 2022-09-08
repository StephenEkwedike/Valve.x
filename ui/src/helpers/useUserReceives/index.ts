import abis from "abis";
import { useConnectedWeb3Context } from "contexts";
import { BigNumber } from "ethers";
import { useServices } from "helpers/useServices";
import { useEffect, useState } from "react";

interface IState {
  transferIds: number[];
  loading: boolean;
}

export const useUserReceives = () => {
  const { account, networkId } = useConnectedWeb3Context();
  const { multicall, valve } = useServices();
  const [state, setState] = useState<IState>({
    transferIds: [],
    loading: false,
  });

  const load = async () => {
    if (!account) {
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const count = await valve.getUserReceiveCount(account);
      const calls = new Array(count).map((_, index) => ({
        name: "transferReceivers",
        address: valve.address,
        params: [index],
      }));
      const response = await multicall.multicallv2(abis.Valve, calls);
      const ids = response.map((e: any) => e[0].toNumber());
      setState((prev) => ({ ...prev, transferIds: ids, loading: true }));
    } catch (error) {
      setState((prev) => ({ ...prev, transferIds: [], loading: true }));
    }
  };

  useEffect(() => {
    setState(() => ({
      transferIds: [],
      loading: false,
    }));
    let interval: any = undefined;

    if (account) {
      interval = setInterval(load, 60000);
    }
    return () => {
      if (account && interval) {
        clearInterval(interval);
      }
    };
  }, [account, networkId]);

  return { ...state, load };
};

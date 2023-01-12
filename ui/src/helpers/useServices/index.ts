import { DefaultReadonlyProvider, getContractAddress } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useMemo } from "react";
import { ValveService, MulticallService, Valve721Service } from "services";

export const useServices = () => {
  const { account, library: provider, networkId } = useConnectedWeb3Context();

  return useMemo(() => {
    const valve = new ValveService(
      provider || DefaultReadonlyProvider,
      account,
      getContractAddress("valve", networkId)
    );
    const valve721 = new Valve721Service(
      provider || DefaultReadonlyProvider,
      account,
      getContractAddress("valve721", networkId)
    );
    const multicall = new MulticallService(
      provider || DefaultReadonlyProvider,
      account,
      getContractAddress("multicall", networkId)
    );

    return {
      valve,
      valve721,
      multicall,
    };
  }, [account, networkId, provider]);
};

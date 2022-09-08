import { DefaultReadonlyProvider, getContractAddress } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useMemo } from "react";
import { ValveService, MulticallService } from "services";

export const useServices = () => {
  const { account, library: provider, networkId } = useConnectedWeb3Context();

  return useMemo(() => {
    const valve = new ValveService(
      provider || DefaultReadonlyProvider,
      account,
      getContractAddress("valve", networkId)
    );
    const multicall = new MulticallService(
      provider || DefaultReadonlyProvider,
      account,
      getContractAddress("multicall", networkId)
    );

    return {
      valve,
      multicall,
    };
  }, [provider]);
};

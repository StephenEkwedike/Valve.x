import { useConnectedWeb3Context } from "contexts";
import { FetchStatus } from "utils/enums";
import { useEffect, useState } from "react";
import { ERC20Service } from "services";

import { BigNumber } from "ethers";
import { NULL_ADDRESS, ZERO } from "config/constants";

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export const useTokenBalance = (tokenAddress: string, address?: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account, library: provider } = useConnectedWeb3Context();

  const fetchBalance = async () => {
    if (!provider) return;
    try {
      if (tokenAddress === NULL_ADDRESS) {
        const res = await provider.getBalance(address || account || "");
        setBalanceState({
          balance: res || ZERO,
          fetchStatus: SUCCESS,
        });
      } else {
        const contract = new ERC20Service(provider, account, tokenAddress);
        const res = await contract.getBalanceOf(address || account || "");
        setBalanceState({
          balance: res,
          fetchStatus: SUCCESS,
        });
      }
    } catch (e) {
      console.error(e);
      setBalanceState((prev) => ({
        ...prev,
        fetchStatus: FAILED,
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchBalance, 4000);

    if (address || account) {
      fetchBalance();
    }

    return () => {
      clearInterval(interval);
    };
  }, [account, address, tokenAddress, SUCCESS, FAILED]);

  return { ...balanceState, reload: fetchBalance };
};

import { useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";

import { useConnectedWeb3Context } from "contexts";
import { FetchStatus } from "utils/enums";
import { ERC721Service } from "services";
import { NULL_ADDRESS, ZERO } from "config/constants";

type UseNFTBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export const useNFTBalance = (tokenAddress: string, address?: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseNFTBalanceState>({
    balance: ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account, library: provider } = useConnectedWeb3Context();

  const fetchBalance = useCallback(async () => {
    if (!provider || tokenAddress === NULL_ADDRESS) return;
    try {
      const contract = new ERC721Service(provider, account, tokenAddress);
      const res = await contract.getBalanceOf(address || account || "");
      setBalanceState({
        balance: res,
        fetchStatus: SUCCESS,
      });
    } catch (e) {
      setBalanceState((prev) => ({
        ...prev,
        fetchStatus: FAILED,
      }));
    }
  }, [FAILED, SUCCESS, account, address, provider, tokenAddress]);

  useEffect(() => {
    const interval = setInterval(fetchBalance, 4000);

    if (address || account) {
      fetchBalance();
    }

    return () => {
      clearInterval(interval);
    };
  }, [account, address, fetchBalance]);

  return { ...balanceState, reload: fetchBalance };
};

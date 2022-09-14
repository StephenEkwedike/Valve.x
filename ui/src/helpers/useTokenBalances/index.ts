import abis from "abis";
import { NULL_ADDRESS } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { BigNumber } from "ethers";
import { useServices } from "helpers/useServices";
import { useEffect, useState } from "react";
import { IToken } from "types/types";

export const useTokenBalances = (tokens: IToken[]) => {
  const { account, library: provider, networkId } = useConnectedWeb3Context();
  const [balances, setBalances] = useState<{ [key: string]: BigNumber }>({});
  const { multicall } = useServices();

  const load = async () => {
    if (!account || !provider) {
      setBalances({});
      return;
    }
    try {
      const bnbBalance = await provider.getBalance(account);
      const erc20Addrs = tokens
        .filter((token) => token.address !== NULL_ADDRESS)
        .map((e) => e.address);
      const calls = erc20Addrs.map((addr) => ({
        name: "balanceOf",
        address: addr,
        params: [account],
      }));
      const response = await multicall.multicallv2(abis.ERC20, calls);

      const balances: { [key: string]: BigNumber } = {};
      balances[NULL_ADDRESS] = bnbBalance;

      for (let index = 0; index < erc20Addrs.length; index++) {
        balances[erc20Addrs[index].toLocaleLowerCase()] = response[index][0];
      }
      setBalances(() => balances);
    } catch (error) {}
  };

  useEffect(() => {
    load();
  }, [networkId, account, tokens]);

  return balances;
};

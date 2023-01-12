import abis from "abis";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";
import { useEffect, useState } from "react";
import { IValveInfo } from "types/types";

interface IState {
  data?: IValveInfo;
  loading: boolean;
}

export const useFeeInfo = () => {
  const { valve, multicall } = useServices();
  const { networkId } = useConnectedWeb3Context();
  const [state, setState] = useState<IState>({ loading: true });

  useEffect(() => {
    const loadData = async () => {
      setState(() => ({ loading: true }));
      try {
        const calls = ["feeRecipient", "feePercent", "validDuration"].map(
          (name) => ({
            address: valve.address,
            name,
            params: [],
          })
        );
        const [[feeRecipient], [feePercent], [validDuration]] =
          await multicall.multicallv2(abis.Valve, calls);
        setState(() => ({
          loading: false,
          data: {
            feeRecipient,
            feePercent: feePercent.toNumber(),
            validDuration: validDuration.toNumber(),
          },
        }));
      } catch (error) {
        setState(() => ({ loading: false }));
      }
    };

    loadData();
  }, [multicall, networkId, valve.address]);

  return state;
};

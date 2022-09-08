import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";
import { useEffect, useState } from "react";
import { ITokenTransfer } from "types/types";

interface IState {
  loading: boolean;
  data?: ITokenTransfer;
}

export const useTransfer = (id: any) => {
  const { networkId } = useConnectedWeb3Context();
  const { valve } = useServices();
  const [state, setState] = useState<IState>({ loading: false });

  const load = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const transfer = await valve.getTransfer(id);
      setState((prev) => ({ ...prev, loading: false, data: transfer }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  };

  useEffect(() => {
    setState(() => ({ loading: false }));
    load();
  }, [id, networkId]);

  return { ...state, load };
};

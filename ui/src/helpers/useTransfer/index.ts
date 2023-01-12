import { useEffect, useState, useCallback } from "react";

import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers/useServices";
import { INFTTransfer, ITokenTransfer } from "types/types";
import { TokenType } from "utils/enums";

interface IState {
  loading: boolean;
  tokenData?: ITokenTransfer;
  nftData?: INFTTransfer;
}

export const useTransfer = (id: any, tokenType: TokenType) => {
  const { networkId } = useConnectedWeb3Context();
  const { valve, valve721 } = useServices();
  const [state, setState] = useState<IState>({ loading: false });

  const loadToken = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const transfer = await valve.getTransfer(id);
      setState((prev) => ({ ...prev, loading: false, tokenData: transfer }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [id, valve]);

  const loadNFT = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const transfer = await valve721.getTransfer(id);
      setState((prev) => ({ ...prev, loading: false, nftData: transfer }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [id, valve721]);

  useEffect(() => {
    setState(() => ({ loading: false }));
    if (tokenType === TokenType.Token) loadToken();
    else loadNFT()
  }, [loadNFT, loadToken, tokenType]);

  return { ...state, loadToken, loadNFT };
};

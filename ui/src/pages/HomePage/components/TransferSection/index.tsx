import { TokenInput } from "components";
import { AddressInput } from "components/Input/AddressInput";
import { NULL_ADDRESS, ZERO } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { BigNumber } from "ethers";
import { useTokenBalance } from "helpers";
import { useEffect, useState } from "react";
import { IToken } from "types/types";
import { isAddress } from "utils/tools";

interface IState {
  token?: IToken;
  amount: BigNumber;
  recipient: string;
}

export const TransferSection = () => {
  const { networkId } = useConnectedWeb3Context();
  const [state, setState] = useState<IState>({ amount: ZERO, recipient: "" });
  const { balance } = useTokenBalance(state.token?.address || NULL_ADDRESS);

  useEffect(() => {
    setState((prev) => ({ ...prev, token: undefined }));
  }, [networkId]);

  const onTransfer = async () => {};

  const getMessage = () => {
    if (!state.token) {
      return "Select a token";
    }
    if (state.amount.isZero()) {
      return "Input amount";
    }
    if (state.amount.gt(balance)) {
      return "Insufficient balance";
    }
    if (!isAddress(state.recipient)) {
      return "Invalid recipient";
    }
    return "Transfer";
  };

  return (
    <div className="flex flex-col gap-3">
      <TokenInput
        amount={state.amount}
        token={state.token}
        onChangeAmount={(amount) => {
          setState((prev) => ({ ...prev, amount }));
        }}
        onChangeToken={(token) => {
          setState((prev) => ({ ...prev, token }));
        }}
      />
      <AddressInput
        value={state.recipient}
        onChange={(recipient) => {
          setState((prev) => ({ ...prev, recipient }));
        }}
        label="Recipient Address"
      />
      <button
        className="text-higher-emphesis hover:bg-gradient-to-b   hover:to-black/20  disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700  px-4 h-[52px] w-full font-bold flex items-center justify-center gap-1 rounded-2xl "
        disabled={getMessage() !== "Transfer"}
        onClick={onTransfer}
      >
        {getMessage()}
      </button>
    </div>
  );
};

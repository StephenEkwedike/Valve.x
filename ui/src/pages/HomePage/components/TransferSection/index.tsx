import { TokenInput } from "components";
import { AddressInput } from "components/Input/AddressInput";
import { NULL_ADDRESS, ZERO } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { BigNumber } from "ethers";
import { useServices, useTokenBalance } from "helpers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ERC20Service } from "services";
import { IToken } from "types/types";
import { isAddress } from "utils/tools";

interface IProps {
  onReload: () => Promise<void>;
}

interface IState {
  token?: IToken;
  amount: BigNumber;
  recipient: string;
}

export const TransferSection = (props: IProps) => {
  const { networkId, setTxModalInfo, account } = useConnectedWeb3Context();
  const { valve } = useServices();
  const [state, setState] = useState<IState>({ amount: ZERO, recipient: "" });
  const { balance } = useTokenBalance(state.token?.address || NULL_ADDRESS);

  useEffect(() => {
    setState((prev) => ({ ...prev, token: undefined }));
  }, [networkId]);

  const onTransfer = async () => {
    if (!state.token || !networkId || !account) {
      return;
    }
    try {
      if (state.token.address === NULL_ADDRESS) {
        // bnb
      } else {
        setTxModalInfo(true, "Checking allowance");
        const token = new ERC20Service(
          valve.provider,
          account,
          state.token.address
        );
        const hasEnoughAllowance = await token.hasEnoughAllowance(
          account,
          valve.address,
          state.amount
        );
        if (!hasEnoughAllowance) {
          setTxModalInfo(true, "Approving");
          const hash = await token.approveUnlimited(valve.address);
          setTxModalInfo(
            true,
            "Approving",
            "Please wait until transaction is confirmed",
            hash
          );
          await token.provider.waitForTransaction(hash);
        }
      }
      setTxModalInfo(true, "Doing Transfer");
      const hash = await valve.createTransfer(
        state.token.address,
        state.recipient,
        state.amount
      );
      setTxModalInfo(
        true,
        "Doing Transfer",
        "Please wait until transaction is confirmed",
        hash
      );
      await valve.provider.waitForTransaction(hash);

      await props.onReload();

      setTxModalInfo(false);
      toast.success("Transfer is created successfully!");
    } catch (error) {
      setTxModalInfo(false);
      toast.error("Something went wrong!");
    }
  };

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

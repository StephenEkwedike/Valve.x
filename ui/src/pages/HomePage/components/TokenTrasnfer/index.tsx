import React, { useState } from "react";
import { BigNumber } from "ethers";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";

import { AddressInput, TransferButton, TokenInput, DirectCheck } from "components";
import { IToken } from "types/types";
import { ZERO, NULL_ADDRESS } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { useServices, useTokenBalance } from "helpers";
import { ERC20Service } from "services";
import { isAddress } from "utils/tools";

interface IProps {
  recipient: string;
  onReload: () => Promise<void>;
}

interface IState {
  token?: IToken;
  amount: BigNumber;
  recipient: string;
  isDirect: boolean;
}

export const TokenTransfer = (props: IProps) => {
  const [state, setState] = useState<IState>({ amount: ZERO, recipient: props.recipient, isDirect: false });  
  const { networkId, setTxModalInfo, account } = useConnectedWeb3Context();
  const { valve } = useServices();
  const { balance } = useTokenBalance(state.token?.address || NULL_ADDRESS);

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
        state.amount,
        state.isDirect
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
    if(!networkId || !account) {
      return "Error: Connect your wallet first!"
    }
    if (!state.token) {
      return "Error: Select a token";
    }
    if (state.amount.isZero()) {
      return "Error: Input amount";
    }
    if (state.amount.gt(balance)) {
      return "Error: Insufficient balance";
    }
    if (!isAddress(state.recipient)) {
      return "Error: Invalid recipient";
    }
    return "";
  };

  return (
    <div>
      <div className="relative flex flex-col items-center py-5">
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
        <ArrowDownIcon className="absolute -bottom-5 bg-blue-600 rounded-full w-9 h-9 p-1 text-white" />
      </div>
      <div className="bg-dark-900 p-4 pt-12 rounded-b-[16px] flex flex-col gap-4">
        <AddressInput 
          value={state.recipient}
          onChange={(recipient) => {
            setState((prev) => ({ ...prev, recipient }));
          }}
          label="Enter Recipient Address"
        />
        <TransferButton 
          disabled={getMessage() !== ""} 
          onClick={onTransfer} 
        />
        <div className="flex items-center justify-between">
          <DirectCheck 
            checked={!state.isDirect}
            onChange={(event) => setState((prev) => ({ ...prev, isDirect: !event.target.checked }))}
          />
          <div className="text-red-600">
            {getMessage()}
          </div>
        </div>
      </div>
    </div>
  )
}
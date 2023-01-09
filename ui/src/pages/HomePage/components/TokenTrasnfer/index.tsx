import React, { useState } from "react";
import { BigNumber } from "ethers";

import { AddressInput, CopyLinkButton, TokenInput } from "components";
import { IToken } from "types/types";
import { ZERO } from "config/constants";
import { ArrowDownIcon } from "@heroicons/react/solid";

interface IState {
  token?: IToken;
  amount: BigNumber;
  recipient: string;
}

export const TokenTransfer = () => {
  const [state, setState] = useState<IState>({ amount: ZERO, recipient: "" });
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
        <CopyLinkButton disabled={true} onClick={() => {}} />
        <div className="text-red-600">
          Error: Connect your wallet first!
        </div>
      </div>
    </div>
  )
}
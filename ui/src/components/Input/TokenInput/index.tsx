import { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { ETHER_DECIMAL, NULL_ADDRESS, ONE_ETHER, ZERO } from "config/constants";
import { useTokenBalance, useTokenPrice } from "helpers";
import { IToken } from "types/types";
import { formatBigNumber } from "utils";
import { TokenSelectModal } from "components/Modal";

interface IProps {
  token?: IToken;
  amount: BigNumber;
  onChangeToken: (_: IToken) => void;
  onChangeAmount: (_: BigNumber) => void;
}

interface IState {
  amountStr: string;
  tokenSelectVisible: boolean;
}

export const TokenInput = (props: IProps) => {
  const { token, amount, onChangeToken, onChangeAmount } = props;
  const { balance } = useTokenBalance(token?.address || NULL_ADDRESS);
  const [state, setState] = useState<IState>({
    amountStr: "",
    tokenSelectVisible: false,
  });
  const tokenPrice = useTokenPrice(props.token);

  useEffect(() => {
    if (
      !utils
        .parseUnits(state.amountStr || "0", token?.decimals || ETHER_DECIMAL)
        .eq(amount)
    ) {
      const newStr = utils.formatUnits(
        amount,
        token?.decimals || ETHER_DECIMAL
      );
      setState((prev) => ({
        ...prev,
        amountStr: newStr,
      }));
    }
  }, [amount, state.amountStr, token?.decimals]);

  const onChange = (newAmountStr: string) => {
    if (!newAmountStr) {
      onChangeAmount(ZERO);
    } else {
      const newValue = utils.parseUnits(
        newAmountStr,
        token?.decimals || ETHER_DECIMAL
      );
      onChangeAmount(newValue);
    }
    setState((prev) => ({
      ...prev,
      amountStr: newAmountStr,
    }));
  };

  return (
    <div className="p-4 w-full flex flex-col gap-1 component__token_input">
      <div className="flex flex-row items-center flex-row justify-between gap-2">        
        <div className="md:text-3xl text-2xl tracking-[-0.01em] flex items-baseline flex-grow gap-3 overflow-hidden">
          <input
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.00"
            min="0"
            minLength={1}
            maxLength={79}
            spellCheck={false}
            className="text-white outline-none border-none placeholder-low-emphesis flex-grow w-full bg-transparent"
            value={state.amountStr}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div
          className="h-full px-2 py-2 gap-1 cursor-point flex flex-row items-center rounded-full border border-gray-500 text-high-emphesis"
          onClick={() => {
            setState((prev) => ({ ...prev, tokenSelectVisible: true }));
          }}
        >
          {token && (
            <img
              src={token.image[0]}
              alt="logo"
              className="w-5 h-5 rounded"
            />
          )}
          <div className="text-sm text-center">
            {token?.symbol || "Select Token"}
          </div>
          <ChevronDownIcon className="w-8 h-4" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        {token && (
          <div className="text-xs leading-4 font-medium text-secondary pointer-events-none whitespace-nowrap">
            ${formatBigNumber(
              tokenPrice.mul(amount.isZero() ? ONE_ETHER : amount),
              token.decimals + ETHER_DECIMAL
            )}
          </div>
        )}
        {token && (
          <div
            className="text-sm leading-5 font-medium cursor-pointer select-none flex text-secondary whitespace-nowrap"
            onClick={() => {
              if (token) {
                onChangeAmount(balance);
              }
            }}
          >
            Balance: {formatBigNumber(balance, token.decimals, 4)}
          </div>
        )}
        {state.tokenSelectVisible && (
          <TokenSelectModal
            token={token}
            onClose={() =>
              setState((prev) => ({ ...prev, tokenSelectVisible: false }))
            }
            onSelect={onChangeToken}
          />
        )}
      </div>
    </div>
  );
};

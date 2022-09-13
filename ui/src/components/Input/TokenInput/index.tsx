import { ETHER_DECIMAL, NULL_ADDRESS, ONE_ETHER, ZERO } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { BigNumber, utils } from "ethers";
import { useTokenBalance, useTokenPrice } from "helpers";
import { useEffect, useState } from "react";
import { IToken } from "types/types";
import { ChevronDownIcon } from "@heroicons/react/solid";
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
  priceLeft: number;
}

export const TokenInput = (props: IProps) => {
  const { token, amount, onChangeToken, onChangeAmount } = props;
  const { balance } = useTokenBalance(token?.address || NULL_ADDRESS);
  const [state, setState] = useState<IState>({
    amountStr: "",
    tokenSelectVisible: false,
    priceLeft: 60,
  });
  const tokenPrice = useTokenPrice(props.token);

  const getWidthOfText = (text: string) => {
    if (text === "") {
      return 60;
    }
    const element = document.createElement("div");
    element.style.fontSize = "24px";
    element.style.display = "inline";
    element.innerHTML = text;
    document.body.appendChild(element);
    const width = element.offsetWidth;

    document.body.removeChild(element);
    return width + 10;
  };

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
        priceLeft: getWidthOfText(newStr),
      }));
    }
  }, [amount, state.amountStr]);

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
    getWidthOfText(newAmountStr);
    setState((prev) => ({
      ...prev,
      amountStr: newAmountStr,
      priceLeft: getWidthOfText(newAmountStr),
    }));
  };

  return (
    <div className="border-dark-700 hover:border-dark-600 rounded-[14px] border bg-dark-900 p-3 flex flex-col gap-4 component__token_input">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center">
          <div
            className="bg-dark-800 hover:bg-dark-700 cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full shadow-md text-high-emphesis"
            onClick={() => {
              setState((prev) => ({ ...prev, tokenSelectVisible: true }));
            }}
          >
            {token ? (
              <img
                src={token.image[0]}
                alt="logo"
                className="w-5 h-5 rounded"
              />
            ) : (
              <>&nbsp;</>
            )}
            <div className="text-sm leading-5 font-bold !text-xl">
              {token?.symbol || "Select a Token"}
            </div>
            <ChevronDownIcon className="w-4 h-4 " />
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-between items-baseline px-1.5">
        <div className="text-2xl leading-7 tracking-[-0.01em] font-bold relative flex items-baseline flex-grow gap-3 overflow-hidden">
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
            className="text-primary relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary leading-[36px] focus:placeholder:text-low-emphesis flex-grow w-full text-left bg-transparent text-inherit disabled:cursor-not-allowed"
            value={state.amountStr}
            onChange={(e) => onChange(e.target.value)}
          />
          {!tokenPrice.isZero() && token && (
            <span
              className="text-xs leading-4 font-medium text-secondary absolute bottom-1.5 pointer-events-none whitespace-nowrap"
              style={{ left: state.priceLeft }}
            >
              ~$
              {formatBigNumber(
                tokenPrice.mul(amount.isZero() ? ONE_ETHER : amount),
                token.decimals + ETHER_DECIMAL
              )}
            </span>
          )}
        </div>
        {token ? (
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
        ) : null}
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

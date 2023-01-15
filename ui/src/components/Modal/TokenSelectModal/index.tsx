import { XIcon } from "@heroicons/react/solid";
import { knownTokens, getToken } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { IToken, KnownToken } from "types/types";
import { useTokenBalances } from "helpers";
import { formatBigNumber } from "utils";
import { ZERO } from "config/constants";

interface IProps {
  token?: IToken;
  onSelect: (_: IToken) => void;
  onClose: () => void;
}

export const TokenSelectModal = (props: IProps) => {
  const { token, onClose, onSelect } = props;
  const { networkId } = useConnectedWeb3Context();
  const tokens = Object.keys(knownTokens)
    .map((key) => getToken(key as KnownToken, networkId))
    .filter((token) => token.address !== "");
  const balances = useTokenBalances(tokens);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 modal-drop modal-drop--visible"
        onClick={onClose}
      />
      <div
        className="bg-dark-900 border border-dark-800 lg:max-w-lg md:max-w-md w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4"
        onClick={(e) => e.preventDefault()}
      >
        <div className="lg:max-h-[92vh] lg:h-[40rem] h-full flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-base md:text-lg font-medium text-white">
              Select a token
            </p>
            <button className="p-2" onClick={onClose}>
              <XIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="h-full overflow-hidden overflow-y-auto border rounded border-dark-800 bg-[rgba(0,0,0,0.2)]">
            <div className="flex flex-col flex-1 flex-grow min-h-[50vh] lg:min-h-fit overflow-hidden h-full divide-y divide-dark-800">
              {tokens.map((tokenItem) => {
                const isSelected =
                  (token?.address.toLowerCase() || "") ===
                  tokenItem.address.toLowerCase();
                return (
                  <div
                    key={tokenItem.address}
                    className={
                      isSelected
                        ? "opacity-20 pointer-events-none flex items-center w-full hover:bg-dark-800/40 px-4 py-2  border-none"
                        : "flex items-center w-full hover:bg-dark-800/40 px-4 py-2 border-none"
                    }
                    onClick={() => {
                      if (!isSelected) {
                        onSelect(tokenItem);
                        onClose();
                      }
                    }}
                  >
                    <div className="flex items-center flex-grow gap-2 rounded cursor-pointer">
                      <img
                        className="rounded-full w-6 h-6"
                        src={tokenItem.image[0]}
                        alt="img"
                      />
                      <div className="flex flex-col flex-1">
                        <div className="text-[0.625rem] leading-[1.2] font-medium text-secondary">
                          {tokenItem.name}{" "}
                        </div>
                        <div className="text-sm leading-5 font-bold text-high-emphesis">
                          {tokenItem.symbol}
                        </div>
                      </div>
                      <div className="text-sm leading-5 text-primary">
                        {formatBigNumber(
                          balances[tokenItem.address.toLowerCase()] || ZERO,
                          tokenItem.decimals,
                          4
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

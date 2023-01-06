import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BigNumber } from "ethers";

import { NULL_ADDRESS } from "config/constants";
import { useNFTBalance, useNFTPrice } from "helpers";
import { INFT } from "types/types";
import { NFTSelectModal } from "components/Modal";

interface IProps {
  nft?: INFT;
  amount: BigNumber;
  onChangeNFT: (_: INFT) => void;
  onChangeAmount: (_: BigNumber) => void;
}

interface IState {
  amountStr: string;
  nftSelectVisible: boolean;
  priceLeft: number;
}

export const NFTInput = (props: IProps) => {
  const { nft, onChangeNFT, onChangeAmount } = props;
  const { balance } = useNFTBalance(nft?.address || NULL_ADDRESS);
  const [state, setState] = useState<IState>({ 
    amountStr: "", 
    nftSelectVisible: false, 
    priceLeft: 60,
  });
  const nftPrice = useNFTPrice(props.nft);

  return (  
    <div className="border-dark-700 hover:border-dark-600 rounded-[14px] border bg-dark-900 p-3 flex flex-col gap-4 component__token_input">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center">
          <div
            className="bg-dark-800 hover:bg-dark-700 cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full shadow-md text-high-emphesis"
            onClick={() => {
              setState((prev) => ({ ...prev, nftSelectVisible: true }));
            }}
          >
            {nft ? (
              <img
                src={nft.image[0]}
                alt="logo"
                className="w-5 h-5 rounded"
              />
            ) : (
              <>&nbsp;</>
            )}
            <div className="text-sm leading-5 font-bold !text-xl">
              {nft?.symbol || "Select a NFT"}
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
            readOnly
          />
          {!nftPrice.isZero() && nft && (
            <span
              className="text-xs leading-4 font-medium text-secondary absolute bottom-1.5 pointer-events-none whitespace-nowrap"
              style={{ left: state.priceLeft }}
            >
              {nftPrice.toString()}
            </span>
          )}
        </div>
        {nft ? (
          <div 
            className="text-sm leading-5 font-medium cursor-pointer select-none flex text-secondary whitespace-nowrap"
            onClick={() => {
              if (nft) {
                onChangeAmount(balance);
              }
            }}
          >
            Balance: { balance.toString() }
          </div>
        ) : null}
        {state.nftSelectVisible && (
          <NFTSelectModal
            nft={nft}
            onClose={() =>
              setState((prev) => ({ ...prev, nftSelectVisible: false }))
            }
            onSelect={onChangeNFT}
          />
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { INFT } from "types/types";
import { NFTSelectModal } from "components/Modal";

interface IProps {
  nft?: INFT;
  onChangeNFT: (_: INFT) => void;
}

interface IState {
  nftSelectVisible: boolean;
}

export const NFTInput = (props: IProps) => {
  const { nft, onChangeNFT } = props;
  const [state, setState] = useState<IState>({ nftSelectVisible: false });

  return (  
    <div className="p-4 w-full component__nft_input">
      <div
        className="border border-gray-500 cursor-pointer flex items-center justify-between px-4 py-4 rounded-2xl shadow-md text-high-emphesis"
        onClick={() => {
          setState((prev) => ({ ...prev, nftSelectVisible: true }));
        }}
      >
        {nft ? (
          <div className="flex flex-row items-center gap-2 overflow-hidden overflow-ellipsis">
            <img
              src={nft.image[0]}
              alt="logo"
              className="w-5 h-5 rounded flex-none"
            />
            <div className="flex-auto flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap">
              {`${nft.symbol} #${nft.tokenId} | ${nft.address}`}
            </div>
          </div>
        ): (
          <div>Select a NFT</div>
        )}
        <ChevronDownIcon className="w-4 h-4 " />
      </div>
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
  );
}
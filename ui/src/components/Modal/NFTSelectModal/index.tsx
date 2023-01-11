import { useState } from "react";
import { XIcon, ArrowNarrowLeftIcon } from "@heroicons/react/solid";

import { getNFT, knownNFTs } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useNFTBalances, useNFTItems } from "helpers";
import { INFT, KnownNFT } from "types/types";
import { DEFAULT_NETWORK_ID, ZERO } from "config/constants";

interface IProps {
  nft?: INFT;
  onSelect: (_: INFT) => void;
  onClose: () => void;
}

export const NFTSelectModal = (props: IProps) => {
  const { nft, onSelect, onClose } = props;
  const [nftCollection, setNftCollection] = useState<INFT>()
  const { networkId } = useConnectedWeb3Context();
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  const nftCollections = Object.keys(knownNFTs)
    .map((key) => getNFT(key as KnownNFT))
    .filter((nft) => nft?.platformId === fNetworkId);
  const balances = useNFTBalances(nftCollections);
  const nftItems = useNFTItems(nftCollection?.address);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 modal-drop modal-drop--visible"
        onClick={onClose}
      />
      <div
        className="bg-dark-900 border border-dark-800 lg:max-w-lg w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4"
        onClick={(e) => e.preventDefault()}
      >
        <div className="lg:max-h-[92vh] lg:h-[40rem] h-full flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            {nftCollection && (
              <button className="p-2" onClick={() => setNftCollection(undefined)}>
                <ArrowNarrowLeftIcon className="w-6 h-6 text-white" />
              </button>
            )}
            <p className="text-base md:text-lg font-medium text-white">
              {nftCollection ? "Select a NFT" : "Select a NFT Collection"}
            </p>
            <button className="p-2" onClick={onClose}>
              <XIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="h-full overflow-hidden overflow-y-auto border rounded border-dark-800 bg-[rgba(0,0,0,0.2)]">
            {nftCollection ? (
              <div className="flex flex-row flex-1 flex-grow divide-dark-800">
                {nftItems ? (
                  nftItems.map(nftItem => {
                    const isSelected = (nft?.tokenId?.toLowerCase() || "") === nftItem.tokenId?.toLowerCase();
                    return (
                      <div 
                        key={nftItem.tokenId} 
                        className="p-2 text-white text-center cursor-pointer"
                        onClick={() => {
                          if (!isSelected) {
                            onSelect(nftItem);
                            onClose();
                          }
                        }}
                      >
                        <img
                          className="w-20 h-20 rounded-[8px]" 
                          src={"/assets/nfts/shonen 1619.png"}
                          // src={nftItem.image[0]}
                          alt={nftItem.name}
                        />
                        <div>#{nftItem.tokenId}</div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-white">no items</div>
                )}
              </div>
            ) : (  
              <div className="flex flex-col flex-1 flex-grow min-h-[50vh] lg:min-h-fit overflow-hidden h-full divide-y divide-dark-800">
                { nftCollections.map((nftItem) => {
                  const isSelected = (nft?.address.toLowerCase() || "") === nftItem.address.toLowerCase();
                  return (
                    <div
                      key={nftItem.address}
                      className={
                        isSelected
                          ? "opacity-20 flex items-center w-full hover:bg-dark-800/40 px-4 py-2  border-none"
                          : "flex items-center w-full hover:bg-dark-800/40 px-4 py-2 border-none"
                      }
                      onClick={() => {
                        setNftCollection(nftItem);
                      }}
                    >
                      <div className="flex items-center flex-grow gap-2 rounded cursor-pointer">
                        <img
                          className="rounded-full w-6 h-6"
                          src={nftItem.image[0]}
                          alt="img"
                        />
                        <div className="flex flex-col flex-1">
                          <div className="text-[0.625rem] leading-[1.2] font-medium text-secondary">
                            {nftItem.name}
                          </div>
                          <div className="text-sm leading-5 font-bold text-high-emphesis">
                            {nftItem.symbol}
                          </div>
                        </div>
                        <div className="text-sm leading-5 text-primary">
                          {(balances[nftItem.address.toLowerCase()] || ZERO).toString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// import { useState } from "react";
import { 
  XIcon, 
  // ArrowNarrowLeftIcon 
} from "@heroicons/react/solid";

// import { getNFT, knownNFTs } from "config/networks";
// import { useConnectedWeb3Context } from "contexts";
import { 
  // useNFTBalances, 
  useNFTItems 
} from "helpers";
import { 
  INFT, 
  // KnownNFT 
} from "types/types";
// import { DEFAULT_NETWORK_ID, ZERO } from "config/constants";
import { Spinner } from "components";

interface IProps {
  nft?: INFT;
  onSelect: (_: INFT) => void;
  onClose: () => void;
}

export const NFTSelectModal = (props: IProps) => {
  const { nft, onSelect, onClose } = props;
  // const [nftCollection, setNftCollection] = useState<INFT>()
  // const { networkId } = useConnectedWeb3Context();
  // const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  // const nftCollections = Object.keys(knownNFTs)
  //   .map((key) => getNFT(key as KnownNFT))
  //   .filter((nft) => nft?.platformId === fNetworkId);
  // const balances = useNFTBalances(nftCollections);
  const { loading, nfts: nftItems } = useNFTItems();

  const renderNFTItems = () => {
    return (
      <div className="flex-1 min-h-[50vh] lg:min-h-fit divide-dark-800 text-white text-center">
        <div className="flex flex-wrap gap-2">
          {loading ? ( 
            <div className="w-full items-center">
              <Spinner className="lds-ring--small" />
            </div>
          ) : nftItems.length > 0 ? (
            nftItems.map((nftItem) => {
              const isSelected = (nft?.tokenId || "") === nftItem.tokenId;
              return (
                <div 
                  key={nftItem.tokenId} 
                  className={`p-2 cursor-pointer ${isSelected && "opacity-20"}`}
                  onClick={() => {
                    if (!isSelected) {
                      onSelect(nftItem);
                      onClose();
                    }
                  }}
                >
                  <img
                    className="w-24 h-24 rounded-[8px]" 
                    src={nftItem.image[0].startsWith("http") ? nftItem.image[0] : "assets/tokens/empty-nft.png"}
                    alt={nftItem.name}
                  />
                  <div className="w-24 text-sm text-center overflow overflow-hidden text-ellipsis whitespace-nowrap">
                    {`${nftItem.name} #${nftItem.tokenId}`}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="w-full">No items</div>
          )}
        </div>
      </div>
    );
  }

  // const renderNFTCollections = () => {
  //   return (
  //     <div className="flex flex-col flex-1 flex-grow min-h-[50vh] lg:min-h-fit overflow-hidden h-full divide-y divide-dark-800">
  //       {nftCollections.length ? (
  //         nftCollections.map((nftCollection) => {
  //           const isSelected = 
  //             (nft?.address.toLowerCase() || "") === 
  //             nftCollection.address.toLowerCase();
  //           return (
  //             <div
  //               key={nftCollection.address}
  //               className={
  //                 isSelected
  //                   ? "opacity-20 flex items-center w-full hover:bg-dark-800/40 px-4 py-2  border-none"
  //                   : "flex items-center w-full hover:bg-dark-800/40 px-4 py-2 border-none"
  //               }
  //               onClick={() => {
  //                 setNftCollection(nftCollection);
  //               }}
  //             >
  //               <div className="flex items-center flex-grow gap-2 rounded cursor-pointer">
  //                 <img
  //                   className="rounded-full w-6 h-6"
  //                   src={nftCollection.image[0]}
  //                   alt="img"
  //                 />
  //                 <div className="flex flex-col flex-1">
  //                   <div className="text-[0.625rem] leading-[1.2] font-medium text-secondary">
  //                     {nftCollection.name}
  //                   </div>
  //                   <div className="text-sm leading-5 font-bold text-high-emphesis">
  //                     {nftCollection.symbol}
  //                   </div>
  //                 </div>
  //                 <div className="text-sm leading-5 text-primary">
  //                   {(balances[nftCollection.address.toLowerCase()] || ZERO).toString()}
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })
  //       ) : (
  //         <div className="w-full text-white text-center">No collections</div>
  //       )}
  //     </div>
  //   )
  // }

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
            {/* {nftCollection && (
              <button 
                className="p-2" 
                onClick={() => setNftCollection(undefined)}
              >
                <ArrowNarrowLeftIcon className="w-6 h-6 text-white" />
              </button>
            )} */}
            <p className="text-base md:text-lg font-medium text-white">
              {"Select NFT"}
            </p>
            <button className="p-2" onClick={onClose}>
              <XIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="h-full overflow-hidden overflow-y-auto border rounded border-dark-800 bg-[rgba(0,0,0,0.2)]">
            {/* {nftCollection ? ( */}
              {renderNFTItems()}
            {/* ) : (
              renderNFTCollections()
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

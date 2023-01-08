import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BigNumber } from "ethers";

import { AddressInput, NFTInput } from "components/Input";
import { NULL_ADDRESS, ONE, ZERO } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { useNFTBalance, useServices } from "helpers";
import { INFT } from "types/types";
import { isAddress } from "utils/tools";
import { ERC721Service } from "services";

interface IProps {
  onReload: () => Promise<void>;
}

interface IState {
  nft?: INFT;
  amount: BigNumber;
  tokenId?: BigNumber;
  recipient: string;
}


export const ERC721Transfer = (props: IProps) => {  
  const { networkId, setTxModalInfo, account  } = useConnectedWeb3Context();
  const { valve721 } = useServices();
  const [state, setState] = useState<IState>({ amount: ZERO, recipient: "" });
  const { balance } = useNFTBalance(state.nft?.address || NULL_ADDRESS);

  useEffect(() => {
    setState((prev) => ({ ...prev, nft: undefined }));
  }, []);

  // const onTransfer = async () => {
  //   if (!state.nft || !networkId || !account) {
  //     return;
  //   }
  //   try {
  //     if (state.nft.address === NULL_ADDRESS) {
  //       // bnb
  //     } else {
  //       setTxModalInfo(true, "Checking allowance");
  //       const nft = new ERC721Service(
  //         valve721.provider,
  //         account,
  //         state.nft.address
  //       );
  //       const hasEnoughAllowance = await nft.ownerOf(
  //         account,
  //         valve721.address,
  //         state.amount
  //       );
  //       if (!hasEnoughAllowance) {
  //         setTxModalInfo(true, "Approving");
  //         const hash = await nft.approveUnlimited(valve721.address);
  //         setTxModalInfo(
  //           true,
  //           "Approving",
  //           "Please wait until transaction is confirmed",
  //           hash
  //         );
  //         await nft.provider.waitForTransaction(hash);
  //       }
  //     }
  //     setTxModalInfo(true, "Doing Transfer");
  //     const hash = await valve721.createTransfer(
  //       state.nft.address,
  //       state.recipient,
  //       state.amount
  //     );
  //     setTxModalInfo(
  //       true,
  //       "Doing Transfer",
  //       "Please wait until transaction is confirmed",
  //       hash
  //     );
  //     await valve.provider.waitForTransaction(hash);

  //     await props.onReload();

  //     setTxModalInfo(false);
  //     toast.success("Transfer is created successfully!");
  //   } catch (error) {
  //     setTxModalInfo(false);
  //     toast.error("Something went wrong!");
  //   }
  // };

  const getMessage = () => {
    if (!state.nft) {
      return "Select a NFT";
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
      <NFTInput
        amount={state.amount}
        nft={state.nft}
        onChangeNFT={(nft) => {
          let amount = ZERO;
          console.log("balance", balance.gte(ONE));
          if (balance.gte(ONE)) amount = ONE;
          setState((prev) => ({ ...prev, amount, nft }));
          console.log(state.amount);
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
        // onClick={onTransfer}
      >
        {getMessage()}
      </button>
    </div>
  );
}
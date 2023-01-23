import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { BigNumber } from "ethers";

import { AddressInput, DirectCheck, NFTInput, TransferButton } from "components";
// import { NULL_ADDRESS } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers";
import { INFT } from "types/types";
import { isAddress } from "utils/tools";
import { ERC721Service } from "services";

interface IProps {
  recipient: string;
  onReload: () => Promise<void>;
}

interface IState {
  nft?: INFT;
  recipient: string;
  isDirect: boolean;
}


export const NFTTransfer = (props: IProps) => {  
  const { networkId, setTxModalInfo, account  } = useConnectedWeb3Context();
  const { valve721 } = useServices();
  const [state, setState] = useState<IState>({ recipient: props.recipient, isDirect: false });

  useEffect(() => {
    setState((prev) => ({ ...prev, nft: undefined }));
  }, []);

  const onTransfer = async () => {
    if (!state.nft || !networkId || !account || !state.nft.tokenId) {
      toast.error("Something went wrong!");
      return;
    }
    try {
      setTxModalInfo(true, "Checking allowance");
      const nft = new ERC721Service(
        valve721.provider,
        account,
        state.nft.address
      );
      const approvalAddr = await nft.getApproved(state.nft.tokenId);
      if (approvalAddr !== state.recipient) {
        setTxModalInfo(true, "Approving");
        const hash = await nft.approve(valve721.address, state.nft.tokenId);
        setTxModalInfo(
          true,
          "Approving",
          "Please wait until transaction is confirmed",
          hash
        );
        await nft.provider.waitForTransaction(hash);
      }
      setTxModalInfo(true, "Doing Transfer");
      const hash = await valve721.createTransfer(
        state.nft.address,
        state.recipient,
        state.nft.tokenId,
        state.isDirect
      );
      setTxModalInfo(
        true,
        "Doing Transfer",
        "Please wait until transaction is confirmed",
        hash
      );
      await valve721.provider.waitForTransaction(hash);

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
    if (!state.nft) {
      return "Error: Select a NFT";
    }
    if (!isAddress(state.recipient)) {
      return "Error: Invalid recipient";
    }
    return "";
  };

  return (
    <div>
      <div className="flex flex-col items-center py-5">
        <NFTInput
          nft={state.nft}
          onChangeNFT={(nft) => {
            setState((prev) => ({ ...prev, nft }));
          }}
        />
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
          isDirect={state.isDirect}
          disabled={state.nft?.tokenId === undefined} 
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
  );
}
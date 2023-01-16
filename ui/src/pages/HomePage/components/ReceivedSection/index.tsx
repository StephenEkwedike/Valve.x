import { Spinner } from "components";
import { useConnectedWeb3Context, useSelectedTokenTypeContext } from "contexts";
import { TokenType } from "utils/enums";
import { NFTTransferItem } from "../NFTTransferItem";
import { TokenTransferItem } from "../TokenTransferItem";

interface IProps {
  transferIds: number[];
  loading: boolean;
}

export const ReceivedSection = (props: IProps) => {
  const { transferIds, loading } = props;
  
  const { account } = useConnectedWeb3Context();
  const { tokenType } = useSelectedTokenTypeContext();
  
  if (!account) {
    return (
      <div className="my-5">
        <p className="text-primary font-bold text-2xl  text-center">
          Please connect wallet
        </p>
      </div>
    );
  }

  return (
    <div className="pb-4 px-8">
      {loading && transferIds.length === 0 ? (
        <div className="flex items-center my-4 justify-center">
          <Spinner />
        </div>
      ) : transferIds.length === 0 ? (
        <div className="my-2">
          <p className="text-primary text-2xl text-center">No receives</p>
        </div>
      ) : (
        <div className="overflow-hidden overflow-y-auto max-h-80">
          <div className="flex flex-col flex-1 flex-grow min-h-[50vh] lg:min-h-fit overflow-hidden h-full gap-4">
            {tokenType === TokenType.Token ? ( 
              transferIds.map((id) => (
                <TokenTransferItem transferId={id} key={`${id}`} />
              ))
            ) : (
              transferIds.map((id) => (
                <NFTTransferItem transferId={id} key={`${id}`} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

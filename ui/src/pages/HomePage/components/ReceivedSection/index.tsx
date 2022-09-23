import { Spinner } from "components";
import { useConnectedWeb3Context } from "contexts";
import { TransferItem } from "../TransferItem";

interface IProps {
  transferIds: number[];
  loading: boolean;
}

export const ReceivedSection = (props: IProps) => {
  const { account } = useConnectedWeb3Context();
  const { transferIds, loading } = props;
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
    <div className="py-2">
      {loading && transferIds.length === 0 ? (
        <div className="flex items-center my-4 justify-center">
          <Spinner />
        </div>
      ) : transferIds.length === 0 ? (
        <div className="my-2">
          <p className="text-primary text-2xl text-center">No receives</p>
        </div>
      ) : (
        <div className="overflow-hidden overflow-y-auto border rounded border-dark-800 bg-[rgba(0,0,0,0.2)]  max-h-80">
          <div className="flex flex-col flex-1 flex-grow min-h-[50vh] lg:min-h-fit overflow-hidden h-full divide-y divide-dark-800">
            {transferIds.reverse().map((id) => (
              <TransferItem transferId={id} key={`${id}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

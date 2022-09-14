import { Spinner } from "components";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers";
import { TransferItem } from "pages/HomePage/components";
import { useEffect, useState } from "react";

interface IProps {
  exId: string;
}

interface IState {
  loading: boolean;
  transferId: number;
}

export const TransferPageContent = (props: IProps) => {
  const { exId } = props;
  const [state, setState] = useState<IState>({ loading: true, transferId: -1 });
  const { valve } = useServices();
  const { networkId } = useConnectedWeb3Context();

  useEffect(() => {
    const load = async () => {
      try {
        const transferId = await valve.getTransferId(exId);
        setState({ loading: false, transferId });
      } catch (error) {
        setState({ loading: false, transferId: -1 });
      }
    };

    load();
  }, [exId, networkId]);

  return (
    <div>
      {state.loading ? (
        <div className="flex justify-center my-4">
          <Spinner className="" />
        </div>
      ) : state.transferId === -1 ? (
        <div className="my-4">
          <p className="text-primary">Invalid Link.</p>
        </div>
      ) : (
        <TransferItem transferId={state.transferId} />
      )}
    </div>
  );
};

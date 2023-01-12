import { Spinner } from "components";
import { useConnectedWeb3Context } from "contexts";
import { useServices } from "helpers";
import { NFTTransferItem, TokenTransferItem } from "pages/HomePage/components";
import { useEffect, useState } from "react";
import { TokenType } from "utils/enums";

interface IProps {
  exId: string;
  tokenType?: TokenType;
}

interface IState {
  loading: boolean;
  transferId: number;
}

export const TransferPageContent = (props: IProps) => {
  const { exId, tokenType } = props;
  const [state, setState] = useState<IState>({ loading: true, transferId: -1 });
  const { valve, valve721 } = useServices();
  const { networkId } = useConnectedWeb3Context();

  useEffect(() => {
    const load = async () => {
      try {
        const transferId = tokenType === TokenType.Token ? await valve.getTransferId(exId) : await valve721.getTransferId(exId);
        setState({ loading: false, transferId });
      } catch (error) {
        setState({ loading: false, transferId: -1 });
      }
    };

    load();
  }, [exId, networkId, tokenType, valve, valve721]);

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
      ) : tokenType === TokenType.Token ? (
        <TokenTransferItem transferId={state.transferId} />
      ) : (
        <NFTTransferItem transferId={state.transferId} />
      )
      }
    </div>
  );
};

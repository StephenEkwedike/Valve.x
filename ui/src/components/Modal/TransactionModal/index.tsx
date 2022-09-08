import { Spinner } from "components/Spinner";
import { getEtherscanUri } from "config/networks";
import { useConnectedWeb3Context } from "contexts";

interface IProps {
  onClose: () => void;
  title: string;
  description: string;
  txId: string;
}

export const TransactionModal = (props: IProps) => {
  const { onClose, title, description, txId } = props;
  const { networkId } = useConnectedWeb3Context();
  const explorerUri = getEtherscanUri(networkId);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 modal-drop modal-drop--visible " />
      <div className="px-8 py-8 pt-6 rounded-3xl w-96 bg-black relative">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-white">{title}</p>
        </div>
        <div className="mt-4 text-center">
          <Spinner />
          {description ? (
            <p className="text-gray text-sm">{description}</p>
          ) : null}
          {txId ? (
            <div className="mt-4 text-center ">
              <a
                href={`${explorerUri}tx/${txId}`}
                target="_blank"
                className="text-gray underline"
                rel="noreferrer"
              >
                View Tx
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

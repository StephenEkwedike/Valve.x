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
      <div className="bg-dark-900 border border-dark-800  max-w-md w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <p className="text-base md:text-lg font-medium text-white">
              {title}
            </p>
          </div>
          <div className="mt-4 text-center">
            <Spinner />
            {description ? (
              <p className="text-primary text-sm">{description}</p>
            ) : null}
            {txId ? (
              <div className="mt-4 text-center ">
                <a
                  href={`${explorerUri}tx/${txId}`}
                  target="_blank"
                  className="text-primary underline"
                  rel="noreferrer"
                >
                  View Tx
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

import { AddressItem, BaseButton, Spinner } from "components";
import { getTokenFromAddress } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useServices, useTransfer } from "helpers";
import { formatBigNumber, getCurrentTimestamp, getTimeStr } from "utils";
import { TransferStatus } from "utils/enums";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { DocumentDuplicateIcon } from "@heroicons/react/solid";

interface IProps {
  transferId: number;
}

export const TransferItem = (props: IProps) => {
  const { account, networkId, setTxModalInfo } = useConnectedWeb3Context();
  const { loading, data, load } = useTransfer(props.transferId);
  const { valve } = useServices();

  const onCancel = async () => {
    if (!data) return;

    try {
      setTxModalInfo(true, "Cancelling");
      const hash = await valve.cancelTransfer(data.exId);
      setTxModalInfo(
        true,
        "Cancelling",
        "Please wait until tx is confirmed",
        hash
      );
      await valve.provider.waitForTransaction(hash);
      setTxModalInfo(true, "Reloading...");
      await load();
      setTxModalInfo(false);
    } catch (error) {
      setTxModalInfo(false);
    }
  };

  const onAccept = async () => {
    if (!data) return;

    try {
      setTxModalInfo(true, "Accepting");
      const hash = await valve.acceptTransfer(data.exId);
      setTxModalInfo(
        true,
        "Accepting",
        "Please wait until tx is confirmed",
        hash
      );
      await valve.provider.waitForTransaction(hash);
      setTxModalInfo(true, "Reloading...");
      await load();
      setTxModalInfo(false);
    } catch (error) {
      setTxModalInfo(false);
    }
  };

  if (!account || !networkId) {
    return null;
  }

  const renderContent = () => {
    if (!data) return null;
    const isReceiver = account.toLowerCase() === data.to.toLowerCase();
    const isSender = account.toLowerCase() === data.from.toLowerCase();
    const token = getTokenFromAddress(data.token, networkId);
    const timestamp = getCurrentTimestamp();

    return (
      <div className="flex">
        <div className="flex-1 items__column">
          <div className="text-primary flex items-center">
            <img src={token.image[0]} alt="img" className="rounded w-6 h-6" />
            &nbsp;
            <span>
              {formatBigNumber(data.amount, token.decimals, 4)} {token.symbol}
            </span>
          </div>
          <div className="text-primary">
            From: <AddressItem address={data.from} />
          </div>
          <div className="text-primary">
            To: <AddressItem address={data.to} />
          </div>
          <div className="text-primary">
            Expire At: {getTimeStr(data.expireAt)}
          </div>
        </div>

        <div className="ml-4">
          {data.status === TransferStatus.Init &&
          timestamp < data.expireAt &&
          isReceiver ? (
            <button
              className="text-higher-emphesis hover:bg-gradient-to-b   hover:to-black/20  disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700  px-4 h-[36px] flex items-center justify-center gap-1 rounded-xl mb-1"
              onClick={onAccept}
            >
              Accept
            </button>
          ) : null}
          {data.status === TransferStatus.Init && isSender ? (
            <button
              className="text-higher-emphesis hover:bg-gradient-to-b   hover:to-black/20  disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700  px-4 h-[36px] flex items-center justify-center gap-1 rounded-xl mb-1"
              onClick={onCancel}
            >
              Cancel
            </button>
          ) : null}
          {data.status === TransferStatus.Sent ||
          data.status === TransferStatus.Cancelled ? (
            <p className="text-primary">
              {data.status === TransferStatus.Sent ? "Sent" : "Cancelled"}
            </p>
          ) : null}
          <br />
          <div className="text-right">
            <span
              className="inline-flex items-center text-primary cursor-pointer border rounded-lg py-1 px-2"
              onClick={() => {
                const link = `${window.location.origin}/transfer/${data.exId}/${networkId}`;
                copy(link);
                toast.info("Link is copied");
              }}
            >
              Link&nbsp;
              <DocumentDuplicateIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border-dark-700 hover:border-dark-600 rounded-[14px] border bg-dark-900 p-3 flex flex-col gap-4 component__token_input">
      {loading && !data ? (
        <div className="text-center">
          <Spinner className="lds-ring--small" />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

import { AddressItem, ContactModal, Spinner } from "components";
import { getTokenFromAddress } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { useServices, useTransfer } from "helpers";
import { formatBigNumber, formatSeconds, getCurrentTimestamp, getDateStr } from "utils";
import { TokenType, TransferStatus } from "utils/enums";

interface IProps {
  transferId: number;
}

interface IState {
  timestamp: number;
  contactModalVisible: boolean;
}

export const TokenTransferItem = (props: IProps) => {
  const { account, networkId, setTxModalInfo } = useConnectedWeb3Context();
  const { loading, tokenData, loadToken } = useTransfer(props.transferId, TokenType.Token);
  const { valve } = useServices();
  const [state, setState] = useState<IState>({
    timestamp: getCurrentTimestamp(),
    contactModalVisible: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const timestamp = getCurrentTimestamp();
      if (tokenData && timestamp < tokenData.expireAt) {
        setState((prev) => ({ ...prev, timestamp: getCurrentTimestamp() }));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [tokenData]);

  const onCancel = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!tokenData) return;

    try {
      setTxModalInfo(true, "Cancelling");
      const hash = await valve.cancelTransfer(tokenData.exId);
      setTxModalInfo(
        true,
        "Cancelling",
        "Please wait until tx is confirmed",
        hash
      );
      await valve.provider.waitForTransaction(hash);
      setTxModalInfo(true, "Reloading...");
      await loadToken();
      setTxModalInfo(false);
    } catch (error) {
      setTxModalInfo(false);
    }
  };

  const onAccept = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!tokenData) return;

    try {
      setTxModalInfo(true, "Accepting");
      const hash = await valve.acceptTransfer(tokenData.exId);
      setTxModalInfo(
        true,
        "Accepting",
        "Please wait until tx is confirmed",
        hash
      );
      await valve.provider.waitForTransaction(hash);
      setTxModalInfo(true, "Reloading...");
      await loadToken();
      setTxModalInfo(false);
    } catch (error) {
      setTxModalInfo(false);
    }
  };

  const getTransferTimeStamp = () => {
    const timestamp = getCurrentTimestamp();
    let tokenTimestamp;
    switch (tokenData?.status) {
      case TransferStatus.Init:
        tokenTimestamp = timestamp > tokenData.expireAt ? tokenData.expireAt : tokenData.createTimestamp;
        break;
      case TransferStatus.Sent:
        tokenTimestamp = tokenData.isDirect ? tokenData.createTimestamp : tokenData.acceptTimestamp;
        break;
      case TransferStatus.Cancelled:
        tokenTimestamp = tokenData.cancelTimestamp;
    }
    return tokenTimestamp && getDateStr(tokenTimestamp);
  }

  if (!account || !networkId) {
    return null;
  }

  const renderContent = () => {
    if (!tokenData) return null;
    const isReceiver = account.toLowerCase() === tokenData.to.toLowerCase();
    const isSender = account.toLowerCase() === tokenData.from.toLowerCase();
    const token = getTokenFromAddress(tokenData.token, networkId);
    const timestamp = getCurrentTimestamp();

    return (
      <>
        <div 
          className="flex gap-4"
          onClick={() => setState((prev) => ({ ...prev, contactModalVisible: true }))}
        >
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-primary flex items-center">
              <img src={token.image[0]} alt="img" className="rounded w-6 h-6" />
              &nbsp;
              <span>
                {formatBigNumber(tokenData.amount, token.decimals, 4)} {token.symbol}
              </span>
            </div>
            <div className="text-primary text-sm">
              From: <AddressItem address={tokenData.from} />
            </div>
            <div className="text-primary text-sm">
              To: <AddressItem address={tokenData.to} />
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 justify-between">
            {tokenData.status === TransferStatus.Init &&
            timestamp < tokenData.expireAt &&
            isReceiver ? (
              <button
                className="text-higher-emphesis hover:bg-gradient-to-b hover:to-black/20 disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700 px-2 sm:px-4 py-1 text-sm rounded-full"
                onClick={onAccept}
              >
                Accept
              </button>
            ) : null}
            {tokenData.status === TransferStatus.Init && isSender ? (
              <button
                className="text-higher-emphesis hover:bg-gradient-to-b hover:to-black/20 disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700 px-2 sm:px-4 py-1 text-sm rounded-full"
                onClick={onCancel}
              >
                Cancel
              </button>
            ) : null}
            {tokenData.status === TransferStatus.Sent ||
            tokenData.status === TransferStatus.Cancelled ||
            (tokenData.status === TransferStatus.Init && timestamp > tokenData.expireAt) ? (
              <div className="flex items-end text-primary text-sm">
                <span>
                  {tokenData.status === TransferStatus.Sent
                    ? "Sent"
                    : tokenData.status === TransferStatus.Cancelled
                    ? "Cancelled"
                    : "Expired"}
                </span>
                &nbsp;
                <span>at {getTransferTimeStamp()}</span>
              </div>
            ) : null}
            {tokenData.status === TransferStatus.Init && timestamp < tokenData.expireAt && (
              <div className="text-primary text-sm">
                Expire In {formatSeconds(tokenData.expireAt - timestamp)}
              </div>
            )}
            <div className="text-right">
              <span
                className="inline-flex items-center text-white text-center text-sm cursor-pointer rounded-full bg-blue-600 py-1 sm:px-6 px-2"
                onClick={(event) => {
                  event.stopPropagation();
                  const link = `${window.location.origin}/transfer/${TokenType.Token}/${tokenData.exId}/${networkId}`;
                  copy(link);
                  toast.info("Link is copied");
                }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.33333 13.6667C0.966667 13.6667 0.652667 13.5362 0.391333 13.2753C0.130444 13.014 0 12.7 0 12.3333V3.00001H1.33333V12.3333H8.66667V13.6667H1.33333ZM4 11C3.63333 11 3.31956 10.8696 3.05867 10.6087C2.79733 10.3473 2.66667 10.0333 2.66667 9.66668V1.66668C2.66667 1.30001 2.79733 0.98601 3.05867 0.724677C3.31956 0.463788 3.63333 0.333344 4 0.333344H10C10.3667 0.333344 10.6807 0.463788 10.942 0.724677C11.2029 0.98601 11.3333 1.30001 11.3333 1.66668V9.66668C11.3333 10.0333 11.2029 10.3473 10.942 10.6087C10.6807 10.8696 10.3667 11 10 11H4ZM4 9.66668H10V1.66668H4V9.66668ZM4 9.66668V1.66668V9.66668Z" fill="white"/>
                </svg>
                &nbsp;Copy link
              </span>
            </div>
          </div>
        </div>
        {/* {state.contactModalVisible && (
          <ContactModal 
            wallet={account.toLowerCase() === tokenData.to.toLowerCase() ? tokenData.from : tokenData.to}
            onClose={() => setState((prev) => ({ ...prev, contactModalVisible: false }))} 
          />
        )} */}
      </>
    );
  };

  return (
    <div className="border border-gray-500 hover:border-gray-300 rounded-xl p-2 flex flex-col gap-4 component__token_input">
      {loading && !tokenData ? (
        <div className="text-center">
          <Spinner className="lds-ring--small" />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

import { setupNetwork, supportedNetworkIds } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkId } from "types/types";
import { TransferPageContent } from "./TransferPageContent";

const TransferPage = () => {
  const params = useParams<{ exId: string; networkId: string }>();
  const navigate = useNavigate();
  const { networkId } = useConnectedWeb3Context();

  const isInvalid = !params.exId || !params.networkId;

  useEffect(() => {
    const check = async () => {
      if (isInvalid) {
        navigate("/");
        return;
      }
      if (
        !supportedNetworkIds.includes(
          Number(params.networkId || "0") as NetworkId
        )
      ) {
        navigate("/");
        return;
      }
    };
    check();
  }, [isInvalid, navigate, params]);

  const renderContent = () => {
    if (!networkId) {
      return (
        <div className="my-4">
          <p className="text-primary text-lg text-center">
            Please connect wallet
          </p>
        </div>
      );
    }
    if (networkId !== Number(params.networkId)) {
      return (
        <div className="my-4">
          <p className="text-primary text-lg">Wrong Network</p>
          <div className="mt-4 text-center">
            <button
              className="text-higher-emphesis hover:bg-gradient-to-b   hover:to-black/20  disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700  px-4 h-[36px] inline-flex items-center justify-center gap-1 rounded-xl"
              onClick={async () => {
                await setupNetwork(Number(params.networkId) as NetworkId);
              }}
            >
              Switch to the correct network
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <TransferPageContent exId={params.exId || ""} />
      </div>
    );
  };

  return (
    <div className="page__home">
      <div className="text-white font-bold text-lg mb-2">Token Transfer</div>

      {isInvalid ? null : renderContent()}
    </div>
  );
};

export default TransferPage;

import { DEFAULT_NETWORK_ID } from "config/constants";
import { networks } from "config/networks";
import { useConnectedWeb3Context } from "contexts";
import { NetworkId } from "types/types";

export const NetworkSelector = () => {
  const { networkId, setNetworkSelectorVisible } = useConnectedWeb3Context();
  const selectedNetworkId = networkId || DEFAULT_NETWORK_ID;
  const selectedNetwork = networks[selectedNetworkId as NetworkId];

  return (
    <button className="mx-2" onClick={() => setNetworkSelectorVisible(true)}>
      <img className="w-6 h-6" src={selectedNetwork.icon} alt="network" />
    </button>
  );
};

import { useConnectedWeb3Context } from "contexts";
import copy from "copy-to-clipboard";
import { shortenAddress } from "utils";
import { DocumentDuplicateIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";

interface IProps {
  className?: string;
  address: string;
}

export const AddressItem = (props: IProps) => {
  const { address, className } = props;
  const { account } = useConnectedWeb3Context();
  const isYou = (account || "").toLowerCase() === address.toLowerCase();

  return (
    <div
      className={`inline-flex items-center justify-center text-primary ${className}`}
    >
      <p>{isYou ? "Your wallet" : shortenAddress(address)}</p>
      &nbsp;
      <DocumentDuplicateIcon
        className="cursor-pointer w-5 h-5"
        onClick={() => {
          copy(address);
          toast.info("Copied");
        }}
      />
    </div>
  );
};

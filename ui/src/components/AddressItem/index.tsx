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
      <p>{shortenAddress(address)} {isYou && "(You)" }</p>
      &nbsp;
      <div 
        className="cursor-pointer" 
        onClick={() => {
          copy(address);
          toast.info("Copied");
        }}
      >
        <svg width="14" height="16" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.33333 13.6667C0.966667 13.6667 0.652667 13.5362 0.391333 13.2753C0.130444 13.014 0 12.7 0 12.3333V2.99999H1.33333V12.3333H8.66667V13.6667H1.33333ZM4 11C3.63333 11 3.31956 10.8695 3.05867 10.6087C2.79733 10.3473 2.66667 10.0333 2.66667 9.66666V1.66666C2.66667 1.29999 2.79733 0.985995 3.05867 0.724661C3.31956 0.463773 3.63333 0.333328 4 0.333328H10C10.3667 0.333328 10.6807 0.463773 10.942 0.724661C11.2029 0.985995 11.3333 1.29999 11.3333 1.66666V9.66666C11.3333 10.0333 11.2029 10.3473 10.942 10.6087C10.6807 10.8695 10.3667 11 10 11H4ZM4 9.66666H10V1.66666H4V9.66666ZM4 9.66666V1.66666V9.66666Z" fill="#007AFF"/>
        </svg>
      </div>
    </div>
  );
};

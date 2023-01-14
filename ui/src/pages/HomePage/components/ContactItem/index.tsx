import { IContact } from "types/types"
import { getTimeStr, shortenAddress } from "utils";

interface IProps {
  contact: IContact;
}

export const ContactItem = (props: IProps) => {
  const { contact } = props;

  return (
    <div className="py-4 gap-2 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-white">
          {contact.name} | {shortenAddress(contact.wallet)}
        </div>
        <div className="text-secondary">
          at {getTimeStr(contact.timestamp / 1000)}
        </div>
      </div>
      <div className="text-blue-600 underline flex flex-row gap-2">
        <div className="cursor-pointer">
          Send Token
        </div>
        <div className="cursor-pointer">
          Send NFT
        </div>
      </div>
    </div>
  )
}
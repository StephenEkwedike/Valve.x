import { IContact } from "types/types"
import { getTimeStr, shortenAddress } from "utils";
import { TokenType } from "utils/enums";

interface IProps {
  contact: IContact;
  onTransfer: (_: TokenType, recipient: string) => void;
}

export const ContactItem = (props: IProps) => {
  const { contact, onTransfer } = props;

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
        <div 
          className="select-none cursor-pointer"
          onClick={() => onTransfer(TokenType.Token, contact.wallet)}
        >
          Send Token
        </div>
        <div 
          className="select-none cursor-pointer"
          onClick={() => onTransfer(TokenType.NFT, contact.wallet)}
        >
          Send NFT
        </div>
      </div>
    </div>
  )
}
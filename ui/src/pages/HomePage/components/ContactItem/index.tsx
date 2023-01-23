import { useState } from "react";
// import { TrashIcon } from "@heroicons/react/solid";
// import AlertConfirm from "react-alert-confirm";

import { ContactModal } from "components";
import { IContact } from "types/types"
import { getDateStr, getTimeStr, shortenAddress } from "utils";
import { TokenType } from "utils/enums";

interface IState {
  contactModalVisible: boolean;
}

interface IProps {
  contact: IContact;
  loadContact: (_: string) => Promise<void>;
  onTransfer: (_: TokenType, recipient: string) => void;
}

export const ContactItem = (props: IProps) => {
  const { contact, loadContact, onTransfer } = props;

  const [state, setState] = useState<IState>({ contactModalVisible: false });

  return (
    <>
      <div className="py-4 gap-2 flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-white">
            {contact.name} | {shortenAddress(contact.wallet)}
          </div>
          <div className="text-secondary">
            at {getDateStr(contact.timestamp / 1000)}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-blue-600 flex underline flex-row gap-2">
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
          <div 
            className="text-white underline cursor-pointer"
            onClick={() => setState(() => ({ contactModalVisible: true }))}
          >
            Edit contact
          </div>
        </div>
      </div>
      {state.contactModalVisible && (
        <ContactModal 
          wallet={contact.wallet}
          name={contact.name}
          onClose={async () => {
            await loadContact("");
            setState((prev) => ({ ...prev, contactModalVisible: false }));
          }} 
        />
      )}
    </>
  )
}
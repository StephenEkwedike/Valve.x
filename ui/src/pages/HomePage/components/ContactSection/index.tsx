import { useState } from "react";

import { ContactModal, SearchInput, Spinner } from "components";
import { useContacts } from "helpers";
import { ContactItem } from "../ContactItem";
import { TokenType } from "utils/enums";

interface IState {
  search: string;
  contactModalVisible: boolean;
}

interface IProps {
  onTransfer: (_: TokenType, recipient: string) => void;
}

export const ContactSection = (props: IProps) => {
  const { onTransfer } = props;
  const { contacts, loading, loadContact } = useContacts();

  const [state, setState] = useState<IState>({ search: "", contactModalVisible: false });

  return (
    <div className="md:p-4 p-2 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-white text-xl grow">
          Send to a friend or saved wallet
        </div>
        <button
          className="grow-0 text-higher-emphesis hover:bg-gradient-to-b hover:to-black/20 disabled:pointer-events-none disabled:opacity-40 !bg-gradient-to-r from-blue to-pink-600 hover:from-blue/80 hover:to-pink-600/80 focus:from-blue/80 focus:to-pink-600/80 active:from-blue/70 active:to-pink-600/70 focus:border-blue-700 px-4 py-2 sm:text-base text-sm rounded-full"
          onClick={() => {
            setState((prev) => ({ ...prev, contactModalVisible: true }))
          }}
        >
          Add Contact
        </button>
      </div>
      <SearchInput 
        placeholder="Search name or wallet id" 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
          loadContact(event.target.value)
        }
      />
      <div className="divide-y divide-white">
        {loading && contacts.length === 0 ? (
          <div className="flex items-center my-4 justify-center">
            <Spinner />
          </div>
        ): contacts.length === 0 ? (
          <div className="my-2">
            <p className="text-primary text-2xl text-center">No contacts</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactItem 
              key={contact.id} 
              contact={contact} 
              loadContact={loadContact}
              onTransfer={onTransfer} 
            />
          ))
        )}
      </div>
      {state.contactModalVisible && (
        <ContactModal 
          onClose={async () => {
            await loadContact("");
            setState((prev) => ({ ...prev, contactModalVisible: false }));
          }} 
        />
      )}
    </div>
  );
};
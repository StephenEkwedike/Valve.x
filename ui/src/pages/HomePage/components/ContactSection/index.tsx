import { useState } from "react";

import { ContactModal, SearchInput } from "components";
import { useContacts } from "helpers";
import { ContactItem } from "../ContactItem";

interface IState {
  contactModalVisible: boolean;
  search: string;
}

export const ContactSection = () => {
  const [state, setState] = useState<IState>({ search: "", contactModalVisible: false });

  const { contacts, loadContact } = useContacts();
    
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
          NewContact
        </button>
      </div>
      <SearchInput 
        placeholder="Search name or wallet id" 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
          loadContact(event.target.value)
        }
      />
      <div className="divide-y divide-white">
        {contacts?.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
      {state.contactModalVisible && (
        <ContactModal 
          onClose={() => {
            setState((prev) => ({ ...prev, contactModalVisible: false }))
          }} 
        />
      )}
    </div>
  );
};
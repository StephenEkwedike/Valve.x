import { ContactEntity } from "../../cusTypeorm/entities/contacts/contacts";
import { IContact } from "types/types";

export const contactUtils = {
  deserialize: (entity: Required<ContactEntity>): IContact => {
    const item: IContact = {
      id: entity.id,
      user: entity.user,
      wallet: entity.wallet,
      name: entity.name,
      timestamp: Number(entity.timestamp),
      signature: entity.signature,
    };

    return item;
  },

  serialize: (item: IContact): ContactEntity => {
    const entity = new ContactEntity();

    entity.user = item.user.toLowerCase();
    entity.wallet = item.wallet.toLowerCase();

    entity.id = `${entity.user}-${entity.wallet}`;

    entity.name = item.name;
    entity.timestamp = item.timestamp.toString();
    entity.signature = item.signature;

    return entity;
  },
};

import { getRepository, Like } from "typeorm";
import { ContactEntity } from "../typeorm/entities/contacts/contacts";
import { contactUtils } from "../utils/entities/contactUtils";
import { IContact } from "types/types";

export class ContactService {
  async listByUser(user: string, search: string): Promise<IContact[]> {
    const contactRepository = getRepository(ContactEntity);

    const entities = await contactRepository.find({
      where: [
        { 
          user: user.toLowerCase(), 
          name: Like(`%${search}%`)
        },
        { 
          user: user.toLowerCase(), 
          wallet: Like(`%${search}%`)
        },
      ],
      order: {
        name: "ASC",
      },
    });

    return entities.map((entity) =>
      contactUtils.deserialize(entity as Required<ContactEntity>)
    );
  }

  async createOrUpdate(contact: IContact): Promise<IContact> {
    const contactRepository = getRepository(ContactEntity);

    const contactEntity = await contactRepository.save(
      contactUtils.serialize(contact)
    );

    return contactUtils.deserialize(contactEntity as Required<ContactEntity>);
  }

  async removeAll(): Promise<void> {
    const contactRepository = getRepository(ContactEntity);
    await contactRepository.delete({});
  }
}

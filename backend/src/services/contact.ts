import { getRepository, Like, Raw } from "typeorm";
import { ContactEntity } from "../typeorm/entities/contacts/contacts";
import { contactUtils } from "../utils/entities/contactUtils";
import { IContact } from "types/types";

export class ContactService {
  async listByUser(user: string, search: string): Promise<IContact[]> {
    const contactRepository = getRepository(ContactEntity);

    const entities = await contactRepository.find({ 
      where: [
        {
          user: Raw(alias => `LOWER(${alias}) Like '%${user.toLowerCase()}%'`),
          wallet: Raw(alias => `LOWER(${alias}) Like '%${search.toLowerCase()}%'`),
        },
        {
          user: Raw(alias => `LOWER(${alias}) Like '%${user.toLowerCase()}%'`),
          email: Raw(alias => `LOWER(${alias}) Like '%${search.toLowerCase()}%'`),
        },
        {
          user: Raw(alias => `LOWER(${alias}) Like '%${user.toLowerCase()}%'`),
          name: Raw(alias => `LOWER(${alias}) Like '%${search.toLowerCase()}%'`),
        }
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

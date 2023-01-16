import * as express from "express";
import { utils } from "ethers";
import { isAddress } from "ethers/lib/utils";
import validator from "validator";

import { ContactService } from "../services/contact";
import { IContact } from "types/types";
import { CONTACT_CREATE_VALID_TIME } from "../config/constants";

export const getUserContacts = async (
  req: express.Request,
  res: express.Response
) => {
  const { user } = req.params;
  const { search } = req.query;
  const contactService = new ContactService();

  try {
    const contacts = await contactService.listByUser(user, <string>search);
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export const postContact = async (
  req: express.Request,
  res: express.Response
) => {
  // prices is an array of {token, price, timestamp, message, signature,}
  const contact = req.body.contact as IContact;

  if (
    isAddress(contact.user) === false ||
    isAddress(contact.wallet) === false ||
    validator.isEmail(contact.email) === false ||
    !contact.name ||
    Date.now() - contact.timestamp > CONTACT_CREATE_VALID_TIME
  ) {
    return res.status(400).end();
  }

  try {
    const message = [
      contact.user,
      contact.wallet,
      contact.email,
      contact.name,
      contact.timestamp.toString(),
    ].join("-");
    const msgHash = utils.hashMessage(message);
    const msgHashBytes = utils.arrayify(msgHash);
    const signer = utils.recoverAddress(msgHashBytes, contact.signature);

    if (signer.toLowerCase() === contact.user.toLowerCase()) {
      //
      const contactService = new ContactService();
      const savedContact = await contactService.createOrUpdate(contact);

      return res.json(savedContact);
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    return res.status(500).end();
  }
};

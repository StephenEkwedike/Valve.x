import "dotenv/config";
import { createServer } from "http";

import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import Moralis from "moralis";

import { rootHandler } from "./handlers/rootHandler";
import { getUserContacts, postContact } from "./handlers/contactHandler";
import { getNFTMetaData, getNFTsbyWallet } from "./handlers/nftHandler";

import { dbCreateConnection } from "./typeorm/dbCreateConnection";

(async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY
  });
  await dbCreateConnection();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", rootHandler);
  app.get("/api/contacts/:user", getUserContacts);
  app.post("/api/contacts", postContact);
  app.get("/api/nfts/:account/:networkId", getNFTsbyWallet);
  app.get("/api/nfts/:address/:networkId/:tokenId", getNFTMetaData);

  const server = createServer(app);
  server.listen(process.env.PORT);
})();

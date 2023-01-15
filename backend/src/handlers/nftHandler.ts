import * as express from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

export const getNFTsbyWallet = async (
  req: express.Request,
  res: express.Response
) => {
  const { account, networkId, nftAddr } = req.params;
  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address: account,
      chain: networkId,
      tokenAddresses: [nftAddr]
    });

    return res.status(200).json(response.result); 
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error!"});
  }
};
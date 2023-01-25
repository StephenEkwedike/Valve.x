import * as express from "express";
import Moralis from "moralis";

export const getNFTsbyWallet = async (
  req: express.Request,
  res: express.Response
) => {
  const { account, networkId } = req.params;
  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address: account,
      chain: networkId,
    });

    return res.status(200).json(response.result); 
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error!"});
  }
};

export const getNFTMetaData = async (
  req: express.Request,
  res: express.Response
) => {
  const { address, networkId, tokenId  } = req.params;
  try {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain: networkId,
      tokenId
    });

    return res.status(200).json(response?.result); 
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error!"});
  }
};

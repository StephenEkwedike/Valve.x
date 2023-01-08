import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { parseEther } from "ethers/lib/utils";

import { ZERO } from "config/constants";
import { INFT } from "types/types";

export const useNFTPrice = (nft?: INFT) => {
  const [price, setPrice] = useState(ZERO);

  const loadPrice = useCallback(async () => {
    if (nft) {
      try {
        const response = (
          await axios.get(
            `https://api.coingecko.com/api/v3/nft/${nft.collectionId}`
          )
        ).data;
        const price = response.floor_price.usd;
        setPrice(parseEther(String(price)));
      } catch (error) {
        console.log(error);
        setPrice(ZERO);
      }
    }
  }, [nft]);

  useEffect(() => {
    loadPrice();
  }, [loadPrice]);

  return price;
};

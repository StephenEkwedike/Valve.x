import { useEffect, useState } from "react";
import axios from "axios";
import { parseEther } from "ethers/lib/utils";

import { ZERO } from "config/constants";
import { INFT } from "types/types";

export const useNFTPrice = (nft?: INFT) => {
  const [price, setPrice] = useState(ZERO);

  useEffect(() => {
    const loadPrice = async () => {
      if (nft) {
        const response = (
          await axios.get(
            `https://api.coingecko.com/api/v3/nft/${nft.collectionId}`
          )
        ).data;
        const price = response.floor_price.usd;
        setPrice(parseEther(String(price)));
      }
    };

    loadPrice();
  }, [nft]);

  return price;
};

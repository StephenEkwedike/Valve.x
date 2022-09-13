import axios from "axios";
import { ZERO } from "config/constants";
import { parseEther } from "ethers/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { IToken } from "types/types";

export const useTokenPrice = (token?: IToken) => {
  const [price, setPrice] = useState(ZERO);

  useEffect(() => {
    const loadPrice = async () => {
      if (token) {
        const response = (
          await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${token.coingeckoId}&vs_currencies=usd`
          )
        ).data;
        const price = response[token.coingeckoId].usd;
        setPrice(parseEther(String(price)));
      }
    };

    loadPrice();
  }, [token]);

  return price;
};

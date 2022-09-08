import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils";

export const isAddress = (address: string): boolean => {
  try {
    getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};

export const isContract = async (
  provider: any,
  address: string
): Promise<boolean> => {
  const code = await provider.getCode(address);
  return code && code !== "0x";
};

export const splitAddressAndPId = (id: string) => {
  const address = id.substring(0, 42);
  const pId = BigNumber.from(id.substring(42));
  return { address, pId };
};

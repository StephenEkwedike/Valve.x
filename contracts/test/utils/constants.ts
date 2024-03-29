import { ethers,constants } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

const { AddressZero, MaxUint256, One, Two, Zero } = constants;

export const ADDRESS_ZERO = AddressZero;
export const EMPTY_BYTES = "0x";
export const MAX_UINT_256 = MaxUint256;
export const ONE = One;
export const TWO = Two;
export const THREE = BigNumber.from(3);
export const ZERO = Zero;
export const MAX_INT_256 = "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export const MIN_INT_256 = "-0x8000000000000000000000000000000000000000000000000000000000000000";
export const ONE_DAY_IN_SECONDS = BigNumber.from(60 * 60 * 24);
export const ONE_HOUR_IN_SECONDS = BigNumber.from(60 * 60);
export const ONE_YEAR_IN_SECONDS = BigNumber.from(31557600);

export const PRECISE_UNIT = constants.WeiPerEther;
export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export enum TranferStatus {
  Init,
  Sent,
  Cancelled
}

export const ether = (amount: number | string): BigNumber => {
  const weiString = ethers.utils.parseEther(amount.toString());
  return BigNumber.from(weiString);
};

export const wei = (amount: number | string): BigNumber => {
  const weiString = ethers.utils.parseUnits(amount.toString(), 0);
  return BigNumber.from(weiString);
};

export const gWei = (amount: number): BigNumber => {
  const weiString = BigNumber.from("1000000000").mul(amount);
  return BigNumber.from(weiString);
};

export const usdc = (amount: number): BigNumber => {
  const weiString = BigNumber.from("1000000").mul(amount);
  return BigNumber.from(weiString);
};

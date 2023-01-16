import { BigNumber } from 'ethers';
import { ValueTransformer } from 'typeorm';

export const BigNumberTransformer: ValueTransformer = {
  from: (value: string | null): BigNumber | null => {
    return value === null ? null : BigNumber.from(value);
  },
  to: (value: BigNumber | null | undefined): string | null => {
    return value === null || value === undefined ? null : value.toString();
  },
};

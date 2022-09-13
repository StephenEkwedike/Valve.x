import { BigNumber, Contract, Wallet, ethers, utils } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { Maybe } from "../types/types";
import abis from "abis";

const erc20Abi = abis.ERC20;

class ERC20Service {
  provider: any;
  contract: Contract;

  constructor(
    provider: any,
    signerAddress: Maybe<string>,
    tokenAddress: string
  ) {
    this.provider = provider;
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(
        tokenAddress,
        erc20Abi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    }
  }

  get address(): string {
    return this.contract.address;
  }

  /**
   * @returns A boolean indicating if `spender` has enough allowance to transfer `neededAmount` tokens from `spender`.
   */
  hasEnoughAllowance = async (
    owner: string,
    spender: string,
    neededAmount: BigNumber
  ): Promise<boolean> => {
    const allowance: BigNumber = await this.contract.allowance(owner, spender);
    return allowance.gte(neededAmount);
  };

  totalSupply = async (): Promise<BigNumber> => {
    return this.contract.totalSupply();
  };

  /**
   * @returns The allowance given by `owner` to `spender`.
   */
  allowance = async (owner: string, spender: string): Promise<BigNumber> => {
    return this.contract.allowance(owner, spender);
  };

  /**
   * Approve `spender` to transfer `amount` tokens on behalf of the connected user.
   */
  approve = async (spender: string, amount: BigNumber): Promise<string> => {
    const transactionObject = await this.contract.approve(spender, amount, {
      value: "0x0",
      gasLimit: hexlify(100000),
    });
    return transactionObject.hash;
  };

  /**
   * Approve `spender` to transfer an "unlimited" amount of tokens on behalf of the connected user.
   */
  approveUnlimited = async (spender: string): Promise<string> => {
    const transactionObject = await this.contract.approve(
      spender,
      ethers.constants.MaxUint256,
      {
        value: "0x0",
        gasLimit: hexlify(100000),
      }
    );
    return transactionObject.hash;
  };

  getBalanceOf = async (address: string): Promise<BigNumber> => {
    return this.contract.balanceOf(address);
  };

  hasEnoughBalanceToFund = async (
    owner: string,
    amount: BigNumber
  ): Promise<boolean> => {
    const balance: BigNumber = await this.contract.balanceOf(owner);

    return balance.gte(amount);
  };

  getDetails = async (): Promise<{
    name: string;
    symbol: string;
    decimals: number;
  }> => {
    const [decimals, symbol, name] = await Promise.all([
      this.contract.decimals(),
      this.contract.symbol(),
      this.contract.name(),
    ]);
    return { name, symbol, decimals };
  };

  static encodeTransferFrom = (
    from: string,
    to: string,
    amount: BigNumber
  ): string => {
    const transferFromInterface = new utils.Interface(erc20Abi);

    return transferFromInterface.encodeFunctionData("transferFrom", [
      from,
      to,
      amount,
    ]);
  };

  static encodeTransfer = (to: string, amount: BigNumber): string => {
    const transferInterface = new utils.Interface(erc20Abi);

    return transferInterface.encodeFunctionData("transfer", [to, amount]);
  };

  static encodeApprove = (
    spenderAccount: string,
    amount: BigNumber
  ): string => {
    const approveInterface = new utils.Interface(erc20Abi);

    return approveInterface.encodeFunctionData("approve", [
      spenderAccount,
      amount,
    ]);
  };

  static encodeApproveUnlimited = (spenderAccount: string): string => {
    const approveInterface = new utils.Interface(erc20Abi);

    return approveInterface.encodeFunctionData("approve", [
      spenderAccount,
      ethers.constants.MaxUint256,
    ]);
  };
}

export { ERC20Service };

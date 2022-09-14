import { Contract, Wallet, ethers } from "ethers";
import { ITokenTransfer, Maybe } from "../types/types";
import abis from "abis";
import { NULL_ADDRESS } from "config/constants";

const valveAbi = abis.Valve;

class ValveService {
  provider: any;
  contract: Contract;

  constructor(provider: any, signerAddress: Maybe<string>, address: string) {
    this.provider = provider;
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(address, valveAbi, provider).connect(
        signer
      );
    } else {
      this.contract = new ethers.Contract(address, valveAbi, provider);
    }
  }

  get address(): string {
    return this.contract.address;
  }

  async getUserTransferCount(account: string): Promise<number> {
    const count = await this.contract.getUserTransferCount(account);

    return count.toNumber();
  }

  async getTransferId(exId: string): Promise<number> {
    const count = await this.contract.transferInfo(exId);

    return count.toNumber();
  }

  async getUserReceiveCount(account: string): Promise<number> {
    const count = await this.contract.getUserReceiveCount(account);

    return count.toNumber();
  }

  async getTransfer(id: any): Promise<ITokenTransfer> {
    const transfer = await this.contract.transfers(id);

    return {
      ...transfer,
      expireAt: transfer.expireAt.toNumber(),
    } as ITokenTransfer;
  }

  async createTransfer(
    token: string,
    to: string,
    amount: any
  ): Promise<string> {
    const txObject = await this.contract.createTransfer(token, to, amount, {
      value: token === NULL_ADDRESS ? amount : 0,
    });
    console.log("Create Transfer Hash:", txObject.hash);
    return txObject.hash;
  }

  async acceptTransfer(exId: string): Promise<string> {
    const txObject = await this.contract.acceptTransfer(exId);
    console.log("Accept Transfer Hash:", txObject.hash);
    return txObject.hash;
  }

  async cancelTransfer(exId: string): Promise<string> {
    const txObject = await this.contract.cancelTransfer(exId);
    console.log("Cancel Transfer Hash:", txObject.hash);
    return txObject.hash;
  }
}

export { ValveService };

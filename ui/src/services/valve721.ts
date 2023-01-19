import { BigNumber, Contract, ethers, Wallet } from "ethers";

import abis from "abis";
import { INFTTransfer, Maybe } from "types/types";

const valve721Abi = abis.Valve721;

class Valve721Service {
  provider: any;
  contract: Contract;

  constructor(provider: any, signerAddress: Maybe<string>, address: string) {
    this.provider = provider;
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(address, valve721Abi, provider).connect(signer);
    } else {
      this.contract = new ethers.Contract(address, valve721Abi, provider);
    }
  }

  get address(): string {
    return this.contract.address;
  }

  async getFee(): Promise<BigNumber> {
    return this.contract.fee();
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

  async getTransfer(id: any): Promise<INFTTransfer> {
    const transfer = await this.contract.transfers(id);

    return {
      ...transfer,
      expireAt: transfer.expireAt.toNumber(),
    } as INFTTransfer;
  }

  async createTransfer(
    token:string,
    to: string,
    tokenId: number,
    isDirect: boolean,
    data?: string,
  ): Promise<string> {
    if (!data) data="0x00";
    const fee = await this.getFee();
    const txObject = await this.contract.createTransfer(token, to, tokenId, data, isDirect, {
      value: fee
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

export { Valve721Service };
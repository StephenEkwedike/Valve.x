import { BigNumber, Contract, ethers, Wallet } from "ethers";

import abis from "abis";
import { Maybe } from "types/types";

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

  async createTransfer(
    token:string,
    to: string,
    tokenId: number,
    data?: string,
  ): Promise<string> {
    if (!data) data="0x00";
    const fee = await this.getFee();
    const txObject = await this.contract.createTransfer(token, to, tokenId, data, {
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
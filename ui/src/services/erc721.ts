import {BigNumber, Contract, ethers, Wallet} from "ethers";
import { hexlify } from "ethers/lib/utils";

import abis from "abis";
import {Maybe} from "types/types";

const erc721Abi = abis.ERC721;

class ERC721Service {
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
        erc721Abi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(tokenAddress, erc721Abi, provider);
    }
  }

  get address(): string {
    return this.contract.address;
  }

  getBalanceOf = async (address: string): Promise<BigNumber> => {
    return this.contract.balanceOf(address);
  }

  ownerOf = async (tokenId: number) => {
    const transactionObject = await this.contract.ownerOf(tokenId);
    return transactionObject.hash;
  }

  approve = async (to: string, tokenId: number): Promise<string> => {
    const transactionObject = await this.contract.approve(to, tokenId);
    return transactionObject.hash;
  }
}

export { ERC721Service };

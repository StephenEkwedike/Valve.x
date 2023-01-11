import {BigNumber, Contract, ethers, Wallet} from "ethers";

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

  getBalanceOf = (address: string): Promise<BigNumber> => {
    return this.contract.balanceOf(address);
  }

  ownerOf = (tokenId: number): Promise<string> => {
    return this.contract.ownerOf(tokenId);
  }

  getApproved = (tokenId: number): Promise<string> => {
    return this.contract.getApproved(tokenId);
  }

  approve = async (to: string, tokenId: number): Promise<string> => {
    const transactionObject = await this.contract.approve(to, tokenId);
    return transactionObject.hash;
  }
}

export { ERC721Service };

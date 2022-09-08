import abis from "abis";
import { Contract, Wallet, ethers } from "ethers";
import { Maybe, Call } from "types/types";
import { MultiCallResponse } from "utils/type-utils";

const multicallAbi = abis.Multicall;

interface MulticallOptions {
  requireSuccess?: boolean;
}

class MulticallService {
  provider: any;
  contract: Contract;

  constructor(provider: any, signerAddress: Maybe<string>, address: string) {
    this.provider = provider;
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(
        address,
        multicallAbi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(address, multicallAbi, provider);
    }
  }

  get address(): string {
    return this.contract.address;
  }

  multicallv2 = async <T = any>(
    abi: any[],
    calls: Call[],
    options: MulticallOptions = { requireSuccess: true }
  ): Promise<MultiCallResponse<T>> => {
    const { requireSuccess } = options;
    const multi = this.contract;
    const itf = new ethers.utils.Interface(abi);

    const calldata = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ]);
    const returnData = await multi.callStatic.tryAggregate(
      requireSuccess,
      calldata
    );
    const res = returnData.map((call: any, i: number) => {
      const [result, data] = call;
      return result ? itf.decodeFunctionResult(calls[i].name, data) : null;
    });

    return res;
  };
}

export { MulticallService };

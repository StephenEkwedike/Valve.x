import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";

import { IContact } from "types/types"
import { isAddress } from "utils/tools";
import { useContacts } from "helpers";
import { useConnectedWeb3Context } from "contexts";

interface IProps {
  contact?: IContact;
  onClose: () => void;
}

interface IFormData {
  wallet: string;
  name: string;
}

export const ContactModal = (props: IProps) => {
  const { onClose } = props;
  
  const { account, setTxModalInfo, library: provider } = useConnectedWeb3Context();
  const { postContact } = useContacts();
  const { register, handleSubmit } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    if (!isAddress(data.wallet)) {
      toast.error("Wrong address!");
      return;
    }
    if (!provider || !account) {
      toast.error("Something went wrong!");
      return;
    }

    setTxModalInfo(true, "Signaturing");
    const signer = provider.getSigner();
    const timestamp = Date.now();
    const msg = [
      account,
      data.wallet,
      data.name,
      timestamp.toString(),
    ].join("-");
    const signatureHash = await signer.signMessage(msg);

    setTxModalInfo(true, "Submitting");
    const isSuccess = await postContact({ ...data, user: account, signature: signatureHash, timestamp });

    setTxModalInfo(false);
    if (isSuccess) toast.success("Success!")
    else toast.error("Something went wrong!");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 modal-drop modal-drop--visible"
        onClick={onClose}
      />
      <div className="bg-dark-900 border border-dark-800 lg:max-w-lg md:max-w-md w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4">
        <div className="lg:max-h-[92vh] lg:h-[40rem] h-full flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-base md:text-lg font-medium text-white">
              Contact
            </p>
            <button className="p-2" onClick={onClose}>
              <XIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col text-white text-lg items-center md:p-4 p-2 gap-4 h-full border rounded border-dark-800 bg-[rgba(0,0,0,0.2)]">
              <input
                className="w-full bg-transparent border border-gray-500 rounded p-2 placeholder-low-emphesis focus:placeholder-primary focus:placeholder:text-low-emphesis"  
                type="text" 
                placeholder="Enter friend address"
                {...register("wallet", {required: true})}
              />
              <input
                className="w-full bg-transparent border border-gray-500 rounded p-2 placeholder-low-emphesis focus:placeholder-primary focus:placeholder:text-low-emphesis" 
                type="text" 
                placeholder="Enter friend name" 
                {...register("name", {required: true})}
              />
              <input
                className="text-white bg-blue-600 rounded-full px-6 py-2 disabled:bg-[#4F4E57] disabled:text-[#A5A1A1]" 
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};
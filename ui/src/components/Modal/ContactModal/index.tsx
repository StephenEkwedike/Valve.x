import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { isAddress } from "utils/tools";
import { useContacts } from "helpers";
import { useConnectedWeb3Context } from "contexts";
import { FormInput } from "components";

interface IProps {
  wallet?: string;
  name?: string;
  onClose: () => void;
}

interface IFormData {
  wallet: string;
  name: string;
}

const validationSchema = yup.object().shape({
  wallet: yup.string().required("This field is required"),
  name: yup.string().required("This field is required"),
});

export const ContactModal = (props: IProps) => {
  const { wallet, name, onClose } = props;
  
  const { account, setTxModalInfo, library: provider } = useConnectedWeb3Context();
  const { postContact, loadContact } = useContacts();
  const { handleSubmit, control } = useForm<IFormData>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: { wallet, name }
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
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
  
      setTxModalInfo(true, "Saving!");
      const isSuccess = await postContact({ ...data, user: account, signature: signatureHash, timestamp });
      await loadContact("");
  
      setTxModalInfo(false);
      if (isSuccess) toast.success("Success!");
      else toast.error("Something went wrong!");
    } catch (error) {
      setTxModalInfo(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 modal-drop modal-drop--visible"
        onClick={onClose}
      />
      <div className="bg-dark-900 border border-dark-800 md:max-w-2xl w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4">
        <div className="lg:max-h-[92vh] h-full flex flex-col gap-4">
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
              <FormInput
                name="wallet"
                label="Wallet"
                type="text"
                placeholder={"Enter a wallet"}
                control={control}
              />
              <FormInput
                name="name"
                label="Friend name"
                type="text"
                placeholder={"Enter a name"}
                control={control}
              />
              <input
                className="text-white bg-blue-600 rounded-xl px-4 w-36 py-2 disabled:bg-[#4F4E57] disabled:text-[#A5A1A1]" 
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};
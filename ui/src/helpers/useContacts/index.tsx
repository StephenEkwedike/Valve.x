import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { useConnectedWeb3Context } from "contexts";
import { IContact } from "types/types";
import { API_URL } from "config/constants";

interface IState {
  contacts?: IContact[];
  loading: boolean;
}

export const useContacts = () => {
  const { account } = useConnectedWeb3Context();
  const [state, setState] = useState<IState>({ loading: false });

  const postContact = async (newContact: IContact) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = (
        await axios.post(
          `${API_URL}/contacts/`, 
          { contact: newContact }
        )
      ).data;
      if (response) return true;
      else return false;
    } catch (error) {
      return false;
    }
  }

  const loadContact = useCallback(async (search: string) => {
    try {
      if (!account) {
        setState(() => ({ loading: false }));
        return;
      }
      setState((prev) => ({ ...prev, loading: true }));
      const reponse = (
        await axios.get(
          `${API_URL}/contacts/${account}`, 
          { 
            params: { 
              search: search 
            } 
          }
        )
      ).data;
      setState(() => ({ contacts: reponse, loading: false }));
    } catch (error) {
      setState(() => ({ loading: false }));
    }
  }, [account]);

  useEffect(() => {
    loadContact("");
  }, [loadContact]);
  
  return { ...state, postContact, loadContact};
};
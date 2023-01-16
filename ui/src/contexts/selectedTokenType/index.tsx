import React, { useState } from "react";
import { Maybe } from "types/types";

import { TokenType } from "utils/enums";

interface ISelectedTokenTypeContext {
  tokenType: TokenType;
  setTokenType: (_:TokenType) => void;
}

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

interface IState {
  tokenType: TokenType;
}

const SelectedTokenTypeContext = React.createContext<Maybe<ISelectedTokenTypeContext>>(null)

export const useSelectedTokenTypeContext = () => {
  const context = React.useContext(SelectedTokenTypeContext);

  if (!context) {
    throw new Error("Component rendered outside the provider tree");
  }

  return context;
}

export const SelectedTokenType = (props: IProps) => {
  const [state, setState] = useState<IState>({ tokenType: TokenType.Token });

  const setTokenType = (tokenType: TokenType) => setState((prev) => ({ ...prev, tokenType }));

  const value = {
    tokenType: state.tokenType,
    setTokenType
  }

  return (
    <SelectedTokenTypeContext.Provider value={value}>
      {props.children}
    </SelectedTokenTypeContext.Provider>
  )
}
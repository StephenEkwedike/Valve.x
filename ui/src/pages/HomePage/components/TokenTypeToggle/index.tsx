import { TokenType } from "utils/enums";

interface IProps {
  tokenType: TokenType;
  onClickToken: () => void;
  onClickNFT: () => void;
}

export const TokenTypeToggle = (props: IProps) => {
  const { tokenType, onClickToken, onClickNFT } =  props;

  return (
    <div className="cursor-pointer rounded-full text-white flex mx-auto mb-3 component_token_type">
      <div 
        className={`px-4 py-2 rounded-full ${tokenType === TokenType.Token && "bg-blue-600"}`} 
        onClick={onClickToken}
      >
        Token
      </div>
      <div 
        className={`px-4 py-2 rounded-full ${tokenType === TokenType.NFT && "bg-blue-600"}`} 
        onClick={onClickNFT}
      >
        NFT
      </div>
    </div>
  );
};
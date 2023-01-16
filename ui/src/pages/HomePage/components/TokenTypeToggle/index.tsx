import { useSelectedTokenTypeContext } from "contexts";
import { TokenType } from "utils/enums";

export const TokenTypeToggle = () => {
  const { tokenType, setTokenType } = useSelectedTokenTypeContext();

  return (
    <div className="cursor-pointer rounded-full text-white flex mx-auto mb-3 component_token_type">
      <div 
        className={`px-4 py-2 rounded-full ${tokenType === TokenType.Token && "bg-blue-600"}`} 
        onClick={() => setTokenType(TokenType.Token)}
      >
        Token
      </div>
      <div 
        className={`px-4 py-2 rounded-full ${tokenType === TokenType.NFT && "bg-blue-600"}`} 
        onClick={() => setTokenType(TokenType.NFT)}
      >
        NFT
      </div>
    </div>
  );
};
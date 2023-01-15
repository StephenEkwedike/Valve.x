export enum TokenType {
  ERC20,
  ERC721,
  ERC1155,
}

export enum TransferStatus {
  Init, 
  Sent, 
  Cancelled 
}

export function mapTokenType(type: TokenType): string {
  switch (type) {
    case TokenType.ERC20:
      return "ERC20";
    case TokenType.ERC721:
      return "ERC721";
    case TokenType.ERC1155:
      return "ERC1155";
    default:
      return "";
  }
}

export function mapTransferStatus(type: TransferStatus): string {
  switch (type) {
    case TransferStatus.Init:
      return "Init";
    case TransferStatus.Sent:
      return "Sent";
    case TransferStatus.Cancelled:
      return "Cancelled";
    default:
      return "Init";
  }
}
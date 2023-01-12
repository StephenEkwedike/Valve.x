export enum ConnectorNames {
  Injected = "injected",
  TrustWallet = "trustwallet",
  WalletConnect = "walletconnect",
  Fortmatic = "fortmatic",
}

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum TransferStatus {
  Init,
  Sent,
  Cancelled,
}

export enum TokenType {
  Token = "ERC20",
  NFT = "ERC721"
}

export enum HomeTab {
  Transfer = "Transfer",
  Sent = "Sent",
  Received = "Received",
}

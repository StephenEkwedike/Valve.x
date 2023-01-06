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

export enum HomeTab {
  Token = "Token",
  NFT = "NFT",
  ERC1155 = "ERC1155",
  Sent = "Sent",
  Received = "Received",
}

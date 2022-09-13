export enum ConnectorNames {
  Injected = "injected",
  TrustWallet = "trustwallet",
  WalletConnect = "walletconnect",
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
  Transfer = "Transfer",
  Sent = "Sent",
  Received = "Received",
}

export enum ConnectorNames {
  Injected = "injected",
  TrustWallet = "trustwallet",
  WalletConnect = "walletconnect",
  Ledger = "ledger",
  Trezor = "trezor",
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
  Transfer = "Transfer",
  Sent = "Sent",
  Received = "Received",
}

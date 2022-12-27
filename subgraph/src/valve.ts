import {
  NewTransfer as NewTransferEvent,
  TransferAccepted as TransferAcceptedEvent,
  TransferCancelled as TransferCancelledEvent,
} from "../generated/Valve/Valve"
import {
  NewTransfer,
  TransferAccepted,
  TransferCancelled,
} from "../generated/schema"
import { mapTokenType, TokenType } from "./utils/enums"

export function handleNewTransfer(event: NewTransferEvent): void {
  let entity = new NewTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.tid = event.params.tid
  entity.token = event.params.token
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.expireAt = event.params.expireAt
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferAccepted(event: TransferAcceptedEvent): void {
  let entity = new TransferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId
  entity.tokenType = mapTokenType(TokenType.ERC20)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferCancelled(event: TransferCancelledEvent): void {
  let entity = new TransferCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId
  entity.tokenType = mapTokenType(TokenType.ERC20)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

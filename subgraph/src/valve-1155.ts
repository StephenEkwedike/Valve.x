import {
  Valve1155NewTransfer as Valve1155NewTransferEvent,
  Valve1155TransferAccepted as Valve1155TransferAcceptedEvent,
  Valve1155TransferCancelled as Valve1155TransferCancelledEvent,
} from "../generated/Valve1155/Valve1155"
import {
  Valve1155NewTransfer,
  TransferAccepted,
  TransferCancelled,
} from "../generated/schema"
import { mapTokenType, TokenType } from "./utils/enums"

export function handleValve1155NewTransfer(
  event: Valve1155NewTransferEvent
): void {
  let entity = new Valve1155NewTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.tid = event.params.tid
  entity.token = event.params.token
  entity.to = event.params.to
  entity.tokenIds = event.params.tokenIds
  entity.amounts = event.params.amounts
  entity.data = event.params.data
  entity.expireAt = event.params.expireAt
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155TransferAccepted(
  event: Valve1155TransferAcceptedEvent
): void {
  let entity = new TransferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId
  entity.tokenType = mapTokenType(TokenType.ERC1155)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155TransferCancelled(
  event: Valve1155TransferCancelledEvent
): void {
  let entity = new TransferCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId
  entity.tokenType = mapTokenType(TokenType.ERC1155)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

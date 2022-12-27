import {
  Valve721NewTransfer as Valve721NewTransferEvent,
  Valve721TransferAccepted as Valve721TransferAcceptedEvent,
  Valve721TransferCancelled as Valve721TransferCancelledEvent,
} from "../generated/Valve721/Valve721"
import {
  Valve721NewTransfer,
  TransferAccepted,
  TransferCancelled,
} from "../generated/schema"
import { mapTokenType, TokenType } from "./utils/enums"

export function handleValve721NewTransfer(
  event: Valve721NewTransferEvent
): void {
  let entity = new Valve721NewTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.tid = event.params.tid
  entity.token = event.params.token
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.data = event.params.data
  entity.expireAt = event.params.expireAt
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721TransferAccepted(
  event: Valve721TransferAcceptedEvent
): void {
  let entity = new TransferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId
  entity.tokenType = mapTokenType(TokenType.ERC721)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721TransferCancelled(
  event: Valve721TransferCancelledEvent
): void {
  let entity = new TransferCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId
  entity.tokenType = mapTokenType(TokenType.ERC721)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

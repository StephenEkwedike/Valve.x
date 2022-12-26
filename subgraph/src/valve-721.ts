import {
  Valve721NewTransfer as Valve721NewTransferEvent,
  Valve721OwnershipTransferred as Valve721OwnershipTransferredEvent,
  Valve721Pause as Valve721PauseEvent,
  Valve721Paused as Valve721PausedEvent,
  Valve721TransferAccepted as Valve721TransferAcceptedEvent,
  Valve721TransferCancelled as Valve721TransferCancelledEvent,
  Valve721Unpause as Valve721UnpauseEvent,
  Valve721Unpaused as Valve721UnpausedEvent
} from "../generated/Valve721/Valve721"
import {
  Valve721NewTransfer,
  Valve721OwnershipTransferred,
  Valve721Pause,
  Valve721Paused,
  Valve721TransferAccepted,
  Valve721TransferCancelled,
  Valve721Unpause,
  Valve721Unpaused
} from "../generated/schema"

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

export function handleValve721OwnershipTransferred(
  event: Valve721OwnershipTransferredEvent
): void {
  let entity = new Valve721OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721Pause(event: Valve721PauseEvent): void {
  let entity = new Valve721Pause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721Paused(event: Valve721PausedEvent): void {
  let entity = new Valve721Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721TransferAccepted(
  event: Valve721TransferAcceptedEvent
): void {
  let entity = new Valve721TransferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721TransferCancelled(
  event: Valve721TransferCancelledEvent
): void {
  let entity = new Valve721TransferCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721Unpause(event: Valve721UnpauseEvent): void {
  let entity = new Valve721Unpause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve721Unpaused(event: Valve721UnpausedEvent): void {
  let entity = new Valve721Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

import {
  Valve1155NewTransfer as Valve1155NewTransferEvent,
  Valve1155OwnershipTransferred as Valve1155OwnershipTransferredEvent,
  Valve1155Pause as Valve1155PauseEvent,
  Valve1155Paused as Valve1155PausedEvent,
  Valve1155TransferAccepted as Valve1155TransferAcceptedEvent,
  Valve1155TransferCancelled as Valve1155TransferCancelledEvent,
  Valve1155Unpause as Valve1155UnpauseEvent,
  Valve1155Unpaused as Valve1155UnpausedEvent
} from "../generated/Valve1155/Valve1155"
import {
  Valve1155NewTransfer,
  Valve1155OwnershipTransferred,
  Valve1155Pause,
  Valve1155Paused,
  Valve1155TransferAccepted,
  Valve1155TransferCancelled,
  Valve1155Unpause,
  Valve1155Unpaused
} from "../generated/schema"

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

export function handleValve1155OwnershipTransferred(
  event: Valve1155OwnershipTransferredEvent
): void {
  let entity = new Valve1155OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155Pause(event: Valve1155PauseEvent): void {
  let entity = new Valve1155Pause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155Paused(event: Valve1155PausedEvent): void {
  let entity = new Valve1155Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155TransferAccepted(
  event: Valve1155TransferAcceptedEvent
): void {
  let entity = new Valve1155TransferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155TransferCancelled(
  event: Valve1155TransferCancelledEvent
): void {
  let entity = new Valve1155TransferCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tid = event.params.tid
  entity.exId = event.params.exId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155Unpause(event: Valve1155UnpauseEvent): void {
  let entity = new Valve1155Unpause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValve1155Unpaused(event: Valve1155UnpausedEvent): void {
  let entity = new Valve1155Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

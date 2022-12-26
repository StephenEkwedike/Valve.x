import {
  NewTransfer as NewTransferEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Pause as PauseEvent,
  Paused as PausedEvent,
  TransferAccepted as TransferAcceptedEvent,
  TransferCancelled as TransferCancelledEvent,
  Unpause as UnpauseEvent,
  Unpaused as UnpausedEvent
} from "../generated/Valve/Valve"
import {
  NewTransfer,
  OwnershipTransferred,
  Pause,
  Paused,
  TransferAccepted,
  TransferCancelled,
  Unpause,
  Unpaused
} from "../generated/schema"

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

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePause(event: PauseEvent): void {
  let entity = new Pause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

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

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpause(event: UnpauseEvent): void {
  let entity = new Unpause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

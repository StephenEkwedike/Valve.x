import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NewTransfer,
  OwnershipTransferred,
  Pause,
  Paused,
  TransferAccepted,
  TransferCancelled,
  Unpause,
  Unpaused
} from "../generated/Valve/Valve"

export function createNewTransferEvent(
  from: Address,
  tid: BigInt,
  token: Address,
  to: Address,
  amount: BigInt,
  expireAt: BigInt,
  exId: Bytes
): NewTransfer {
  let newTransferEvent = changetype<NewTransfer>(newMockEvent())

  newTransferEvent.parameters = new Array()

  newTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  newTransferEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  newTransferEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  newTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  newTransferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  newTransferEvent.parameters.push(
    new ethereum.EventParam(
      "expireAt",
      ethereum.Value.fromUnsignedBigInt(expireAt)
    )
  )
  newTransferEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return newTransferEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPauseEvent(): Pause {
  let pauseEvent = changetype<Pause>(newMockEvent())

  pauseEvent.parameters = new Array()

  return pauseEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTransferAcceptedEvent(
  tid: BigInt,
  exId: Bytes
): TransferAccepted {
  let transferAcceptedEvent = changetype<TransferAccepted>(newMockEvent())

  transferAcceptedEvent.parameters = new Array()

  transferAcceptedEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  transferAcceptedEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return transferAcceptedEvent
}

export function createTransferCancelledEvent(
  tid: BigInt,
  exId: Bytes
): TransferCancelled {
  let transferCancelledEvent = changetype<TransferCancelled>(newMockEvent())

  transferCancelledEvent.parameters = new Array()

  transferCancelledEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  transferCancelledEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return transferCancelledEvent
}

export function createUnpauseEvent(): Unpause {
  let unpauseEvent = changetype<Unpause>(newMockEvent())

  unpauseEvent.parameters = new Array()

  return unpauseEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

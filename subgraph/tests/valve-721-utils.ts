import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Valve721NewTransfer,
  Valve721OwnershipTransferred,
  Valve721Pause,
  Valve721Paused,
  Valve721TransferAccepted,
  Valve721TransferCancelled,
  Valve721Unpause,
  Valve721Unpaused
} from "../generated/Valve721/Valve721"

export function createValve721NewTransferEvent(
  from: Address,
  tid: BigInt,
  token: Address,
  to: Address,
  tokenId: BigInt,
  data: Bytes,
  expireAt: BigInt,
  exId: Bytes
): Valve721NewTransfer {
  let valve721NewTransferEvent = changetype<Valve721NewTransfer>(newMockEvent())

  valve721NewTransferEvent.parameters = new Array()

  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam(
      "expireAt",
      ethereum.Value.fromUnsignedBigInt(expireAt)
    )
  )
  valve721NewTransferEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return valve721NewTransferEvent
}

export function createValve721OwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): Valve721OwnershipTransferred {
  let valve721OwnershipTransferredEvent = changetype<
    Valve721OwnershipTransferred
  >(newMockEvent())

  valve721OwnershipTransferredEvent.parameters = new Array()

  valve721OwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  valve721OwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return valve721OwnershipTransferredEvent
}

export function createValve721PauseEvent(): Valve721Pause {
  let valve721PauseEvent = changetype<Valve721Pause>(newMockEvent())

  valve721PauseEvent.parameters = new Array()

  return valve721PauseEvent
}

export function createValve721PausedEvent(account: Address): Valve721Paused {
  let valve721PausedEvent = changetype<Valve721Paused>(newMockEvent())

  valve721PausedEvent.parameters = new Array()

  valve721PausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return valve721PausedEvent
}

export function createValve721TransferAcceptedEvent(
  tid: BigInt,
  exId: Bytes
): Valve721TransferAccepted {
  let valve721TransferAcceptedEvent = changetype<Valve721TransferAccepted>(
    newMockEvent()
  )

  valve721TransferAcceptedEvent.parameters = new Array()

  valve721TransferAcceptedEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  valve721TransferAcceptedEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return valve721TransferAcceptedEvent
}

export function createValve721TransferCancelledEvent(
  tid: BigInt,
  exId: Bytes
): Valve721TransferCancelled {
  let valve721TransferCancelledEvent = changetype<Valve721TransferCancelled>(
    newMockEvent()
  )

  valve721TransferCancelledEvent.parameters = new Array()

  valve721TransferCancelledEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  valve721TransferCancelledEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return valve721TransferCancelledEvent
}

export function createValve721UnpauseEvent(): Valve721Unpause {
  let valve721UnpauseEvent = changetype<Valve721Unpause>(newMockEvent())

  valve721UnpauseEvent.parameters = new Array()

  return valve721UnpauseEvent
}

export function createValve721UnpausedEvent(
  account: Address
): Valve721Unpaused {
  let valve721UnpausedEvent = changetype<Valve721Unpaused>(newMockEvent())

  valve721UnpausedEvent.parameters = new Array()

  valve721UnpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return valve721UnpausedEvent
}

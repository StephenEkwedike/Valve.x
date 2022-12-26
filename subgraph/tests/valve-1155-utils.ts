import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Valve1155NewTransfer,
  Valve1155OwnershipTransferred,
  Valve1155Pause,
  Valve1155Paused,
  Valve1155TransferAccepted,
  Valve1155TransferCancelled,
  Valve1155Unpause,
  Valve1155Unpaused
} from "../generated/Valve1155/Valve1155"

export function createValve1155NewTransferEvent(
  from: Address,
  tid: BigInt,
  token: Address,
  to: Address,
  tokenIds: Array<BigInt>,
  amounts: Array<BigInt>,
  data: Bytes,
  expireAt: BigInt,
  exId: Bytes
): Valve1155NewTransfer {
  let valve1155NewTransferEvent = changetype<Valve1155NewTransfer>(
    newMockEvent()
  )

  valve1155NewTransferEvent.parameters = new Array()

  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIds",
      ethereum.Value.fromUnsignedBigIntArray(tokenIds)
    )
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam(
      "amounts",
      ethereum.Value.fromUnsignedBigIntArray(amounts)
    )
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam(
      "expireAt",
      ethereum.Value.fromUnsignedBigInt(expireAt)
    )
  )
  valve1155NewTransferEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return valve1155NewTransferEvent
}

export function createValve1155OwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): Valve1155OwnershipTransferred {
  let valve1155OwnershipTransferredEvent = changetype<
    Valve1155OwnershipTransferred
  >(newMockEvent())

  valve1155OwnershipTransferredEvent.parameters = new Array()

  valve1155OwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  valve1155OwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return valve1155OwnershipTransferredEvent
}

export function createValve1155PauseEvent(): Valve1155Pause {
  let valve1155PauseEvent = changetype<Valve1155Pause>(newMockEvent())

  valve1155PauseEvent.parameters = new Array()

  return valve1155PauseEvent
}

export function createValve1155PausedEvent(account: Address): Valve1155Paused {
  let valve1155PausedEvent = changetype<Valve1155Paused>(newMockEvent())

  valve1155PausedEvent.parameters = new Array()

  valve1155PausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return valve1155PausedEvent
}

export function createValve1155TransferAcceptedEvent(
  tid: BigInt,
  exId: Bytes
): Valve1155TransferAccepted {
  let valve1155TransferAcceptedEvent = changetype<Valve1155TransferAccepted>(
    newMockEvent()
  )

  valve1155TransferAcceptedEvent.parameters = new Array()

  valve1155TransferAcceptedEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  valve1155TransferAcceptedEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return valve1155TransferAcceptedEvent
}

export function createValve1155TransferCancelledEvent(
  tid: BigInt,
  exId: Bytes
): Valve1155TransferCancelled {
  let valve1155TransferCancelledEvent = changetype<Valve1155TransferCancelled>(
    newMockEvent()
  )

  valve1155TransferCancelledEvent.parameters = new Array()

  valve1155TransferCancelledEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  valve1155TransferCancelledEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return valve1155TransferCancelledEvent
}

export function createValve1155UnpauseEvent(): Valve1155Unpause {
  let valve1155UnpauseEvent = changetype<Valve1155Unpause>(newMockEvent())

  valve1155UnpauseEvent.parameters = new Array()

  return valve1155UnpauseEvent
}

export function createValve1155UnpausedEvent(
  account: Address
): Valve1155Unpaused {
  let valve1155UnpausedEvent = changetype<Valve1155Unpaused>(newMockEvent())

  valve1155UnpausedEvent.parameters = new Array()

  valve1155UnpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return valve1155UnpausedEvent
}

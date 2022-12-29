import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NewTransfer,
  TransferAccepted,
  TransferCancelled,
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
  let newTransferEvent = <NewTransfer>(newMockEvent())

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

export function createTransferAcceptedEvent(
  tid: BigInt,
  exId: Bytes
): TransferAccepted {
  let transferAcceptedEvent = <TransferAccepted>(newMockEvent())

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
  let transferCancelledEvent = <TransferCancelled>(newMockEvent())

  transferCancelledEvent.parameters = new Array()

  transferCancelledEvent.parameters.push(
    new ethereum.EventParam("tid", ethereum.Value.fromUnsignedBigInt(tid))
  )
  transferCancelledEvent.parameters.push(
    new ethereum.EventParam("exId", ethereum.Value.fromFixedBytes(exId))
  )

  return transferCancelledEvent
}

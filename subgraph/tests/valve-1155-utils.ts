import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NewTransfer,
  TransferAccepted,
  TransferCancelled,
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
): NewTransfer {
  let valve1155NewTransferEvent = <NewTransfer>(
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

export function createValve1155TransferAcceptedEvent(
  tid: BigInt,
  exId: Bytes
): TransferAccepted {
  let valve1155TransferAcceptedEvent = <TransferAccepted>(
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
): TransferCancelled {
  let valve1155TransferCancelledEvent = <TransferCancelled>(
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

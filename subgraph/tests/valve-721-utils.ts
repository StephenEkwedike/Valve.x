import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NewTransfer,
  TransferAccepted,
  TransferCancelled,
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
): NewTransfer {
  let valve721NewTransferEvent = <NewTransfer>(newMockEvent())

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

export function createValve721TransferAcceptedEvent(
  tid: BigInt,
  exId: Bytes
): TransferAccepted {
  let valve721TransferAcceptedEvent = <TransferAccepted>(
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
): TransferCancelled {
  let valve721TransferCancelledEvent = <TransferCancelled>(
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

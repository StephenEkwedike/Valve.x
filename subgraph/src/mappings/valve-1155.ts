import { Address } from "@graphprotocol/graph-ts"

import {
  NewTransfer as Valve1155NewTransferEvent,
  TransferAccepted as Valve1155TransferAcceptedEvent,
  TransferCancelled as Valve1155TransferCancelledEvent,
} from "../../generated/Valve1155/Valve1155"
import { Transfer } from "../../generated/schema"
import { mapTokenType, mapTransferStatus, TokenType, TransferStatus } from "../enums"
import { getOrCreateToken } from "../models/Token"
import { increaseFromCount, increaseToCount, increaseAcceptedCount } from "../models/User"
import { increaseAccepted, increaseCancelled, increaseERC1155, increaseTransfer } from "../models/Overview"

export function handleValve1155NewTransfer(
  event: Valve1155NewTransferEvent
): void {
  increaseERC1155()
  increaseTransfer()

  let transfer = new Transfer(
    mapTokenType(TokenType.ERC1155) + '-' + event.params.tid.toString()
  )
  
  transfer.tid = event.params.tid
  transfer.status = mapTransferStatus(TransferStatus.Init)
  transfer.token = getOrCreateToken(event.params.token, mapTokenType(TokenType.ERC1155)).id
  transfer.from = increaseFromCount(event.params.from).id
  transfer.to = increaseToCount(event.params.to).id
  transfer.exId = event.params.exId
  transfer.amounts = event.params.amounts
  transfer.tokenIds = event.params.tokenIds
  transfer.blockNumber = event.block.number
  transfer.blockTimestamp = event.block.timestamp
  transfer.transactionHash = event.transaction.hash

  transfer.save()
}

export function handleValve1155TransferAccepted(
  event: Valve1155TransferAcceptedEvent
): void {
  increaseAccepted()

  let transfer = Transfer.load(mapTokenType(TokenType.ERC1155) + '-' + event.params.tid.toString())
  if(transfer){
    transfer.status = mapTransferStatus(TransferStatus.Sent)
    increaseAcceptedCount(Address.fromString(transfer.to))
    
    transfer.blockNumber = event.block.number
    transfer.blockTimestamp = event.block.timestamp
    transfer.transactionHash = event.transaction.hash
    
    transfer.save()
  }
}

export function handleValve1155TransferCancelled(
  event: Valve1155TransferCancelledEvent
): void {
  increaseCancelled()
  
  let transfer = Transfer.load(mapTokenType(TokenType.ERC1155) + '-' + event.params.tid.toString())
  if(transfer){
    transfer.status = mapTransferStatus(TransferStatus.Cancelled)

    transfer.blockNumber = event.block.number
    transfer.blockTimestamp = event.block.timestamp
    transfer.transactionHash = event.transaction.hash
    
    transfer.save()
  }
}

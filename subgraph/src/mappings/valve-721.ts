import { Address } from "@graphprotocol/graph-ts"

import {
  NewTransfer as Valve721NewTransferEvent,
  TransferAccepted as Valve721TransferAcceptedEvent,
  TransferCancelled as Valve721TransferCancelledEvent,
} from "../../generated/Valve721/Valve721"
import { Transfer } from "../../generated/schema"
import { mapTokenType, mapTransferStatus, TokenType, TransferStatus } from "../enums"
import { getOrCreateToken } from "../models/Token"
import { increaseFromCount, increaseToCount, increaseAcceptedCount } from "../models/User"
import { increaseAccepted, increaseCancelled, increaseERC721, increaseTransfer } from "../models/Overview"

export function handleValve721NewTransfer(
  event: Valve721NewTransferEvent
): void {
  increaseERC721()
  increaseTransfer()

  let transfer = new Transfer(
    mapTokenType(TokenType.ERC721) + '-' + event.params.tid.toString()
  )
  
  transfer.tid = event.params.tid
  transfer.status = mapTransferStatus(TransferStatus.Init)
  transfer.token = getOrCreateToken(event.params.token, mapTokenType(TokenType.ERC721)).id
  transfer.from = increaseFromCount(event.params.from).id
  transfer.to = increaseToCount(event.params.to).id
  transfer.exId = event.params.exId
  transfer.tokenId = event.params.tokenId
  transfer.blockNumber = event.block.number
  transfer.blockTimestamp = event.block.timestamp
  transfer.transactionHash = event.transaction.hash

  transfer.save()
}

export function handleValve721TransferAccepted(
  event: Valve721TransferAcceptedEvent
): void {
  increaseAccepted()

  let transfer = Transfer.load(mapTokenType(TokenType.ERC721) + '-' + event.params.tid.toString())
  if(transfer){
    transfer.status = mapTransferStatus(TransferStatus.Sent)
    increaseAcceptedCount(Address.fromString(transfer.to))
    transfer.blockNumber = event.block.number
    transfer.blockTimestamp = event.block.timestamp
    transfer.transactionHash = event.transaction.hash
    
    transfer.save()
  }
}

export function handleValve721TransferCancelled(
  event: Valve721TransferCancelledEvent
): void {
  increaseCancelled()
  
  let transfer = Transfer.load(mapTokenType(TokenType.ERC721) + '-' + event.params.tid.toString())
  if(transfer){
    transfer.status = mapTransferStatus(TransferStatus.Cancelled)

    transfer.blockNumber = event.block.number
    transfer.blockTimestamp = event.block.timestamp
    transfer.transactionHash = event.transaction.hash
    
    transfer.save()
  }
}

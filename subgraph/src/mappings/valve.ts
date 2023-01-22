import { Address } from "@graphprotocol/graph-ts"

import {
  NewTransfer as NewTransferEvent,
  TransferAccepted as TransferAcceptedEvent,
  TransferCancelled as TransferCancelledEvent,
} from "../../generated/Valve/Valve"
import { Transfer } from "../../generated/schema"
import { mapTokenType, mapTransferStatus, TokenType, TransferStatus } from "../enums"
import { getOrCreateToken } from "../models/Token"
import { 
  increaseFromCount, 
  increaseToCount, 
  increaseAcceptedCount, 
  increaseDirectFromCount, 
  increaseDirectToCount, 
  increaseCancelledCount
} from "../models/User"
import { 
  increaseAccepted, 
  increaseCancelled, 
  increaseDirect, 
  increaseERC20, 
  increaseTransfer 
} from "../models/Overview"

export function handleNewTransfer(event: NewTransferEvent): void {
  increaseERC20()
  increaseTransfer()

  let isDirect = false
  if (event.params.status === TransferStatus.Sent) {
    isDirect = true
    increaseDirectFromCount(event.params.from)
    increaseDirectToCount(event.params.to)
    increaseDirect()
  }

  let transfer = new Transfer(
    mapTokenType(TokenType.ERC20) + '-' + event.params.tId.toString()
  )
  
  transfer.tId = event.params.tId
  transfer.status = mapTransferStatus(event.params.status)
  transfer.token = getOrCreateToken(event.params.token, mapTokenType(TokenType.ERC20)).id
  transfer.from = increaseFromCount(event.params.from).id
  transfer.to = increaseToCount(event.params.to).id
  transfer.exId = event.params.exId
  transfer.amount = event.params.amount
  transfer.expireAt = event.params.expireAt
  transfer.isDirect = isDirect
  transfer.createTimestamp = event.block.timestamp
  transfer.createHash = event.transaction.hash

  transfer.save()
}

export function handleTransferAccepted(event: TransferAcceptedEvent): void {
  increaseAccepted()

  let transfer = Transfer.load(mapTokenType(TokenType.ERC20) + '-' + event.params.tId.toString())

  if(transfer){
    increaseAcceptedCount(Address.fromString(transfer.to))

    transfer.status = mapTransferStatus(TransferStatus.Sent)
    transfer.acceptTimestamp = event.block.timestamp
    transfer.acceptHash = event.transaction.hash
    
    transfer.save()
  }
}

export function handleTransferCancelled(event: TransferCancelledEvent): void {
  increaseCancelled()
  
  let transfer = Transfer.load(mapTokenType(TokenType.ERC20) + '-' + event.params.tId.toString())

  if(transfer){
    increaseCancelledCount(Address.fromString(transfer.from))

    transfer.status = mapTransferStatus(TransferStatus.Cancelled)
    transfer.cancelTimestamp = event.block.timestamp
    transfer.cancelHash = event.transaction.hash
    
    transfer.save()
  }
}

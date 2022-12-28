import { Address } from "@graphprotocol/graph-ts";

import { Token } from "../../generated/schema";

export function getOrCreateToken(tokenAddress: Address, tokenType: string): Token {
  let token = Token.load(tokenAddress.toHexString())
  if (token != null) {
    return token as Token
  }
  return upsertToken(tokenAddress, tokenType)
}

export function upsertToken(tokenAddress: Address, tokenType: string): Token {
  let token = new Token(tokenAddress.toHexString())

  token.address = tokenAddress
  token.type = tokenType
  token.save()

  return token
}
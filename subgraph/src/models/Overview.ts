import { BigInt } from "@graphprotocol/graph-ts";
import { Overview } from "../../generated/schema";

export function getOrCreateOverview(): Overview {
  let overview = Overview.load("valv.fi-overview")
  if (overview == null) {
    overview = new Overview("valv.fi-overview")
    overview.erc1155TokenCount = BigInt.fromI32(0)
    overview.erc721TokenCount = BigInt.fromI32(0)
    overview.erc20TokenCount = BigInt.fromI32(0)
    overview.transferCount = BigInt.fromI32(0)
    overview.totalCancelled = BigInt.fromI32(0)
    overview.totalAccepted = BigInt.fromI32(0)
    overview.totalDirect = BigInt.fromI32(0)
    overview.save()
  }
  return overview
}
export function increaseERC20(): void {
  let overview = getOrCreateOverview()
  overview.erc20TokenCount = overview.erc20TokenCount.plus(BigInt.fromI32(1))
  overview.save()
}

export function increaseERC721(): void {
  let overview = getOrCreateOverview()
  overview.erc721TokenCount = overview.erc721TokenCount.plus(BigInt.fromI32(1))
  overview.save()
}

export function increaseERC1155(): void {
  let overview = getOrCreateOverview()
  overview.erc1155TokenCount = overview.erc1155TokenCount.plus(BigInt.fromI32(1))
  overview.save()
}

export function increaseTransfer(): void {
  let overview = getOrCreateOverview()
  overview.transferCount = overview.transferCount.plus(BigInt.fromI32(1))
  overview.save()
}

export function increaseAccepted(): void {
  let overview = getOrCreateOverview()
  overview.totalAccepted = overview.totalAccepted.plus(BigInt.fromI32(1))
  overview.save() 
}

export function increaseCancelled(): void {
  let overview = getOrCreateOverview()
  overview.totalCancelled = overview.totalCancelled.plus(BigInt.fromI32(1))
  overview.save() 
}

export function increaseDirect(): void {
  let overview = getOrCreateOverview()
  overview.totalDirect = overview.totalDirect.plus(BigInt.fromI32(1))
  overview.save()
}

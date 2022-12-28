import { Address, BigInt } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";

export function getOrCreateUser(userAddress: Address): User {
  let user = User.load(userAddress.toHexString())
  if (user != null)
    return user as User
  return upsertUser(userAddress)
}

export function upsertUser(userAddress: Address): User {
  let user = new User(userAddress.toHexString())

  user.address = userAddress
  user.fromCount = BigInt.fromI32(0)
  user.toCount = BigInt.fromI32(0)
  user.acceptedCount = BigInt.fromI32(0)
  user.save()

  return user
}

export function increaseFromCount(userAddress: Address): User {
  let user = getOrCreateUser(userAddress);
  user.fromCount = user.fromCount.plus(BigInt.fromI32(1))
  user.save()

  return user
}

export function increaseToCount(userAddress: Address): User {
  let user = getOrCreateUser(userAddress);
  user.toCount = user.toCount.plus(BigInt.fromI32(1))
  user.save()

  return user
}

export function increaseAcceptedCount(userAddress: Address): User {
  let user = getOrCreateUser(userAddress);
  user.acceptedCount = user.acceptedCount.plus(BigInt.fromI32(1))
  user.save()

  return user
}

import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Valve721NewTransfer } from "../generated/schema"
import { Valve721NewTransfer as Valve721NewTransferEvent } from "../generated/Valve721/Valve721"
import { handleValve721NewTransfer } from "../src/valve-721"
import { createValve721NewTransferEvent } from "./valve-721-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let tid = BigInt.fromI32(234)
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let tokenId = BigInt.fromI32(234)
    let data = Bytes.fromI32(1234567890)
    let expireAt = BigInt.fromI32(234)
    let exId = Bytes.fromI32(1234567890)
    let newValve721NewTransferEvent = createValve721NewTransferEvent(
      from,
      tid,
      token,
      to,
      tokenId,
      data,
      expireAt,
      exId
    )
    handleValve721NewTransfer(newValve721NewTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Valve721NewTransfer created and stored", () => {
    assert.entityCount("Valve721NewTransfer", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tid",
      "234"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expireAt",
      "234"
    )
    assert.fieldEquals(
      "Valve721NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "exId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

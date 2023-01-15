import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/schema"
import { NewTransfer as Valve1155NewTransferEvent } from "../generated/Valve1155/Valve1155"
import { handleValve1155NewTransfer } from "../src/mappings/valve-1155"
import { createValve1155NewTransferEvent } from "./valve-1155-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let tid = BigInt.fromI32(234)
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let tokenIds = [BigInt.fromI32(234)]
    let amounts = [BigInt.fromI32(234)]
    let data = Bytes.fromI32(1234567890)
    let expireAt = BigInt.fromI32(234)
    let exId = Bytes.fromI32(1234567890)
    let newValve1155NewTransferEvent = createValve1155NewTransferEvent(
      from,
      tid,
      token,
      to,
      tokenIds,
      amounts,
      data,
      expireAt,
      exId
    )
    handleValve1155NewTransfer(newValve1155NewTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Valve1155NewTransfer created and stored", () => {
    assert.entityCount("Valve1155NewTransfer", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tid",
      "234"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenIds",
      "[234]"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amounts",
      "[234]"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expireAt",
      "234"
    )
    assert.fieldEquals(
      "Valve1155NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "exId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { NewTransfer } from "../generated/schema"
import { NewTransfer as NewTransferEvent } from "../generated/Valve/Valve"
import { handleNewTransfer } from "../src/valve"
import { createNewTransferEvent } from "./valve-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let tid = BigInt.fromI32(234)
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let expireAt = BigInt.fromI32(234)
    let exId = Bytes.fromI32(1234567890)
    let newNewTransferEvent = createNewTransferEvent(
      from,
      tid,
      token,
      to,
      amount,
      expireAt,
      exId
    )
    handleNewTransfer(newNewTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewTransfer created and stored", () => {
    assert.entityCount("NewTransfer", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tid",
      "234"
    )
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expireAt",
      "234"
    )
    assert.fieldEquals(
      "NewTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "exId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

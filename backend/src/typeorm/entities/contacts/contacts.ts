import { PrimaryColumn, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  name: "contacts",
  materialized: true,
  synchronize: false,
})
export class ContactEntity {
  @PrimaryColumn({ name: "id" })
  public id?: string;

  @ViewColumn({ name: "user" })
  public user?: string;

  @ViewColumn({ name: "wallet" })
  public wallet?: string;

  @ViewColumn({ name: "name" })
  public name?: string;

  @ViewColumn({ name: "timestamp" })
  public timestamp?: string;

  @ViewColumn({ name: "signature" })
  public signature?: string;
}

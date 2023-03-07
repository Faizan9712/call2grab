import { Model, Table, Column, DataType } from "sequelize-typescript";

export interface RefundI {
  refundId: number;
  refundUserId: number;
  refundOrderId: number;
  refundAmount: number;
  refundReason: string;
  refundStatus: string;
  refundMethod: string;
  refundCreatedDate: Date;
  refundUpdatedDate: Date;
}

@Table({
  tableName: "refund",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Refund extends Model implements RefundI {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "refund_id",
  })
  refundId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "refund_user_id",
  })
  refundUserId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "refund_order_id",
  })
  refundOrderId!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "refund_amount",
    defaultValue: 0.0,
  })
  refundAmount!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "refund_reason",
    defaultValue: "",
  })
  refundReason!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "refund_status",
    defaultValue: "",
  })
  refundStatus!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "refund_method",
    defaultValue: "",
  })
  refundMethod!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "refund_created_date",
    defaultValue: new Date(),
  })
  refundCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "refund_updated_date",
    defaultValue: new Date(),
  })
  refundUpdatedDate!: Date;
}

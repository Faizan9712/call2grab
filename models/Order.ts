import { Model, Table, Column, DataType } from "sequelize-typescript";

export interface OrderI {
  orderId: number;
  orderUserId: number;
  orderStatus: string;
  orderCouponId: number;
  orderSubtotal: number;
  orderDiscount: number;
  orderTotal: number;
  orderShippingAddress: string;
  orderShippingCity: string;
  orderBillingAddress: string;
  orderBillingCity: string;
  orderPaymentMethod: string;
  orderTransactionId: string;
  orderTrackingNumber: string;
  orderShippingMethod: string;
  orderShippingCost: number;
  orderTax: number;
  orderCreatedDate: Date;
  orderUpdatedDate: Date;
}

@Table({
  tableName: "orders",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Order extends Model implements OrderI {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "order_id",
  })
  orderId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "order_user_id",
  })
  orderUserId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "order_coupon_id",
  })
  orderCouponId!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_status",
    defaultValue: "",
  })
  orderStatus!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "order_subtotal",
    defaultValue: 0.0,
  })
  orderSubtotal!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "order_discount",
    defaultValue: 0.0,
  })
  orderDiscount!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "order_total",
    defaultValue: 0,
  })
  orderTotal!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_shipping_address",
    defaultValue: "",
  })
  orderShippingAddress!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_shipping_city",
    defaultValue: "",
  })
  orderShippingCity!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_billing_address",
    defaultValue: "",
  })
  orderBillingAddress!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_billing_city",
    defaultValue: "",
  })
  orderBillingCity!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_payment_method",
    defaultValue: "",
  })
  orderPaymentMethod!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_transaction_id",
    defaultValue: "",
  })
  orderTransactionId!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_tracking_number",
    defaultValue: "",
  })
  orderTrackingNumber!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "order_shipping_method",
    defaultValue: "",
  })
  orderShippingMethod!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "order_shipping_cost",
    defaultValue: 0.0,
  })
  orderShippingCost!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "order_tax",
    defaultValue: 0.0,
  })
  orderTax!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "order_created_date",
    defaultValue: new Date(),
  })
  orderCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "order_updated_date",
    defaultValue: new Date(),
  })
  orderUpdatedDate!: Date;
}

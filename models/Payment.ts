import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Cart from "./Cart";
import Category from "./Category";
import Image from "./ProductImage";
export interface PaymentI {
  paymentId: number;
  paymentOrderId: number;
  paymentProductId: number;
  paymentUserId: number;
  paymentAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentTransactionId: number;
  paymentCardHolderName: string;
  paymentCardLast4Digits: number;
  paymentCardCvv: number;
  paymentCreatedDate: Date;
  paymentUpdatedDate: Date;
}

@Table({
  tableName: "payment",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Payment extends Model implements PaymentI {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "payment_id",
  })
  paymentId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "payment_order_id",
    defaultValue: 0,
  })
  paymentOrderId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "payment_product_id",
    defaultValue: 0,
  })
  paymentProductId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "payment_user_id",
    defaultValue: 0,
  })
  paymentUserId!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "payment_amount",
    defaultValue: 0.0,
  })
  paymentAmount!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "payment_status",
    defaultValue: "",
  })
  paymentStatus!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "payment_method",
    defaultValue: "",
  })
  paymentMethod!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "payment_transaction_id",
    defaultValue: 0,
  })
  paymentTransactionId!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(150),
    field: "payment_card_holder_name",
    defaultValue: "",
  })
  paymentCardHolderName!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "payment_card_last4_digits",
    defaultValue: 0,
  })
  paymentCardLast4Digits!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "payment_card_cvv",
    defaultValue: 0,
  })
  paymentCardCvv!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "payment_created_date",
    defaultValue: new Date(),
  })
  paymentCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "payment_updated_date",
    defaultValue: new Date(),
  })
  paymentUpdatedDate!: Date;

  // @BelongsTo(() => Category)
  // Category!: Category;

  // @BelongsTo(() => Image)
  // Image!: Image[];

  // @HasMany(() => Cart)
  // Cart!: Cart[];
}

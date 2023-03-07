import { Model, Table, Column, DataType } from "sequelize-typescript";

export interface CouponI {
  couponId: number;
  couponTitle: string;
  couponCode: string;
  couponDiscountType: string;
  CouponDiscountAmount: number;
  couponMaxUses: number;
  couponCurrentUses: number;
  couponActive: number;
  couponStartDate: Date;
  couponEndDate: Date;
  couponCreatedDate: Date;
  couponUpdatedDate: Date;
}

@Table({
  tableName: "coupon",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Coupon extends Model implements CouponI {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "coupon_id",
  })
  couponId!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "coupon_title",
    defaultValue: "",
  })
  couponTitle!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "coupon_code",
    defaultValue: "",
  })
  couponCode!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "coupon_discount_type",
    defaultValue: "",
  })
  couponDiscountType!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "coupon_discount_amount",
    defaultValue: 0.0,
  })
  CouponDiscountAmount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "coupon_max_uses",
    defaultValue: 0,
  })
  couponMaxUses!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "coupon_current_uses",
    defaultValue: 0,
  })
  couponCurrentUses!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "coupon_active",
    defaultValue: 0,
  })
  couponActive!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "coupon_start_date",
    // defaultValue: "",
  })
  couponStartDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "coupon_end_date",
    // defaultValue: "",
  })
  couponEndDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "coupon_created_date",
    defaultValue: new Date(),
  })
  couponCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "coupon_updated_date",
    defaultValue: new Date(),
  })
  couponUpdatedDate!: Date;
}

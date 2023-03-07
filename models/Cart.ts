import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface cartI {
  cartId: number;
  cartUserId: number;
  cartProductId: number;
  cartProductQuantity: number;
  cartProductTotalPrice: number;
  cartDetail: string;
  cartCreatedDate: Date;
  cartUpdatedDate: Date;
}

@Table({
  tableName: "cart",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Cart extends Model implements cartI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "cart_id",
  })
  cartId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "cart_user_id",
    defaultValue: 0,
  })
  cartUserId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "cart_product_id",
    defaultValue: 0,
  })
  cartProductId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "cart_product_quantity",
    defaultValue: 0,
  })
  cartProductQuantity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "cart_product_total_price",
    defaultValue: 0,
  })
  cartProductTotalPrice!: number;

  @Column({
    allowNull: false,
    field: "cart_detail",
    type: DataType.STRING(70),
    defaultValue: "",
  })
  cartDetail!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "cart_created_date",
    defaultValue: new Date(),
  })
  cartCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "cart_updated_date",
    defaultValue: new Date(),
  })
  cartUpdatedDate!: Date;
}

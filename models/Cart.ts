import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Product from "./Product";
import User from "./User";
export interface cartI {
  cartId: number;
  userId: number;
  productId: number;
  productQuantity: number;
  productTotalPrice: number;
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

  // @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "user_id",
    defaultValue: 0,
  })
  userId!: number;

  // @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_id",
    defaultValue: 0,
  })
  productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_quantity",
    defaultValue: 0,
  })
  productQuantity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "product_total_price",
    defaultValue: 0,
  })
  productTotalPrice!: number;

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

  // @BelongsTo(() => User)
  // User!: User[];

  // @BelongsTo(() => Product)
  // Product!: Product[];

//   @HasMany(() => Product)
//   Product!: Product[];
}

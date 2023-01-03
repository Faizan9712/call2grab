import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface ProductI {
  productId: number;
  productName: string;
  productStatus: string;
  productMinPrice: number;
  productMaxPrice: number;
  productQuantity: number;
  productRatingCount: number;
  productAverageRating: number;
  productTotalSales: number;
  productCategoryId: number;
  productImages: string;
  productStockQuantity: number;
  productInStock: number;
  productOnsale: number;
  productActive: string;
  productBrandId: number;
  productCouponId: number;
  productTaxId: number;
  productShippingId: number;
  productCreatedDate: Date;
  productUpdatedDate: Date;
}

@Table({
  tableName: "product",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Product extends Model implements ProductI {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_id",
  })
  productId!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "product_name",
    defaultValue: "",
  })
  productName!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "product_status",
    defaultValue: "",
  })
  productStatus!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "product_min_price",
    defaultValue: 0.0,
  })
  productMinPrice!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "product_max_price",
    defaultValue: 0.0,
  })
  productMaxPrice!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_quantity",
    defaultValue: 0,
  })
  productQuantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_rating_count",
    defaultValue: 0,
  })
  productRatingCount!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "product_average_rating",
    defaultValue: 0.0,
  })
  productAverageRating!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: "product_total_sales",
    defaultValue: 0.0,
  })
  productTotalSales!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_category_id",
    defaultValue: 0,
  })
  productCategoryId!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "product_images",
    defaultValue: "",
  })
  productImages!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_stock_quantity",
    defaultValue: 0,
  })
  productStockQuantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_in_stock",
    defaultValue: 0,
  })
  productInStock!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_onsale",
    defaultValue: 0,
  })
  productOnsale!: number;

  @Column({
    allowNull: false,
    field: "product_active",
    type: DataType.CHAR,
    defaultValue: "0",
  })
  productActive!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_brand_id",
    defaultValue: 0,
  })
  productBrandId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_coupon_id",
    defaultValue: 0,
  })
  productCouponId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_tax_id",
    defaultValue: 0,
  })
  productTaxId!: number;

  @(Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "product_shipping_id",
    defaultValue: 0,
  })!)
  productShippingId!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "product_created_date",
    defaultValue: new Date(),
  })
  productCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "product_updated_date",
    defaultValue: new Date(),
  })
  productUpdatedDate!: Date;
}

import { Model, Table, Column, DataType } from "sequelize-typescript";

export interface ImageI {
  imageId: number;
  productImageId: number;
  productImageName: string;
  imageCreatedDate: Date;
  imageUpdatedDate: Date;
}

@Table({
  tableName: "image",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class ProductImage extends Model implements ImageI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "image_id",
  })
  imageId!: number;

  @Column({
    allowNull: false,
    field: "product_image_id",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  productImageId!: number;

  @Column({
    allowNull: false,
    field: "product_image_name",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  productImageName!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "image_created_date",
    defaultValue: new Date(),
  })
  imageCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "image_updated_date",
    defaultValue: new Date(),
  })
  imageUpdatedDate!: Date;
}

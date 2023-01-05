import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import Product from "./Product";
export interface ImageI {
  imageId: number;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  imageFive: string;
  imageCreatedDate: Date;
  imageUpdatedDate: Date;
}

@Table({
  tableName: "image",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Image extends Model implements ImageI {
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
    field: "image_one",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  imageOne!: string;

  @Column({
    allowNull: false,
    field: "image_two",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  imageTwo!: string;

  @Column({
    allowNull: false,
    field: "image_three",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  imageThree!: string;

  @Column({
    allowNull: true,
    field: "image_four",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  imageFour!: string;

  @Column({
    allowNull: false,
    field: "image_five",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  imageFive!: string;

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

  @HasOne(() => Product)
  Product!: Product;
}

import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import Product from "./Product";
export interface categoryI {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

@Table({
  tableName: "category",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Category extends Model implements categoryI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "category_id",
  })
  categoryId!: number;

  @Column({
    allowNull: false,
    field: "category_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  categoryName!: string;

  @Column({
    allowNull: false,
    field: "category_description",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  categoryDescription!: string;

  @HasMany(() => Product)
  Product!: Product[];
}

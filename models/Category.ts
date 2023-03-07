import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import Product from "./Product";
export interface categoryI {
  categoryId: number;
  categoryName: string;
  categoryParentId: number;
  categoryImage: string;
  categoryActive: number;
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
    type: DataType.INTEGER,
    allowNull: false,
    field: "category_parent_id",
    defaultValue: 0,
  })
  categoryParentId!: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    field: "category_image",
    defaultValue: "",
  })
  categoryImage!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "category_active",
    defaultValue: 0,
  })
  categoryActive!: number;
}

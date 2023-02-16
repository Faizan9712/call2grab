import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import Category from "./Category";
import Product from "./Product";
export interface parentCategoryI {
  parentCategoryId: number;
  parentCategoryName: string;
  parentCategoryDescription: string;
}

@Table({
  tableName: "parentcategory",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class ParentCategory extends Model implements parentCategoryI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "parent_category_id",
  })
  parentCategoryId!: number;

  @Column({
    allowNull: false,
    field: "parent_category_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  parentCategoryName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "parent_category_description",
    defaultValue: "",
  })
  parentCategoryDescription!: string;

//   @HasMany(() => Category)
//   Category!: Category[];
}

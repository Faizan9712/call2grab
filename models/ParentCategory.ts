import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import Category from "./Category";
import Product from "./Product";
export interface parentCategoryI {
  parentCategoryId: number;
  parentCategoryName: string;
  parentCategoryDescription: string;
  parentCategoryCreatedDate: Date;
  parentCategoryUpdatedDate: Date;
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

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "parent_category_created_date",
    defaultValue: new Date(),
  })
  parentCategoryCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "parent_category_updated_date",
    defaultValue: new Date(),
  })
  parentCategoryUpdatedDate!: Date;

  //   @HasMany(() => Category)
  //   Category!: Category[];
}

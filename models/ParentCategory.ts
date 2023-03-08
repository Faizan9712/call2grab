import { Model, Table, Column, DataType } from "sequelize-typescript";

export interface parentCategoryI {
  parentCategoryId: number;
  parentCategoryName: string;
  parentCategoryActive: number;
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
    type: DataType.INTEGER,
    allowNull: false,
    field: "parent_category_active",
    defaultValue: 0,
  })
  parentCategoryActive!: number;

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
}

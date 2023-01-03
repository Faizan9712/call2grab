import { Model, Table, Column, DataType } from "sequelize-typescript";
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
export default class category extends Model implements categoryI {
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
}

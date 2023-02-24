import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface BrandI {
  brandId: number;
  brandName: string;
  brandDescription: string;
  brandActive: number;
  brandCreatedDate: Date;
  brandUpdatedDate: Date;
}

@Table({
  tableName: "brand",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Brand extends Model implements BrandI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "brand_id",
  })
  brandId!: number;

  @Column({
    allowNull: false,
    field: "brand_first_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  brandName!: string;

  @Column({
    allowNull: false,
    field: "brand_last_name",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  brandDescription!: string;

  @Column({
    allowNull: false,
    field: "brand_active",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  brandActive!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "brand_created_date",
    defaultValue: new Date(),
  })
  brandCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "brand_updated_date",
    defaultValue: new Date(),
  })
  brandUpdatedDate!: Date;
}

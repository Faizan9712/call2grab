import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface AreaI {
  areaId: number;
  areaName: string;
  areaDescription: string;
  areaParentId: number;
  areaPincode: number;
  areaCreatedDate: Date;
  areaUpdatedDate: Date;
}

@Table({
  tableName: "area",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Area extends Model implements AreaI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "area_id",
  })
  areaId!: number;

  @Column({
    allowNull: false,
    field: "area_name",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  areaName!: string;

  @Column({
    allowNull: false,
    field: "area_description",
    type: DataType.STRING(200),
    defaultValue: "",
  })
  areaDescription!: string;

  @Column({
    allowNull: false,
    field: "area_parent_id",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  areaParentId!: number;

  @Column({
    allowNull: false,
    field: "area_pincode",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  areaPincode!: number;

  @Column({
    allowNull: false,
    field: "area_active",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  areaActive!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "area_created_date",
    defaultValue: new Date(),
  })
  areaCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "area_updated_date",
    defaultValue: new Date(),
  })
  areaUpdatedDate!: Date;
}

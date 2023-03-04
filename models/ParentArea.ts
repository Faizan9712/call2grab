import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface ParentAreaI {
  parentAreaId: number;
  parentAreaName: string;
  parentAreaDescription: string;
  parentAreaCreatedDate: Date;
  parentAreaUpdatedDate: Date;
}

@Table({
  tableName: "parent_area",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class ParentArea extends Model implements ParentAreaI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "parentarea_id",
  })
  parentAreaId!: number;

  @Column({
    allowNull: false,
    field: "parentarea_name",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  parentAreaName!: string;

  @Column({
    allowNull: false,
    field: "parentarea_description",
    type: DataType.STRING(200),
    defaultValue: "",
  })
  parentAreaDescription!: string;

  @Column({
    allowNull: false,
    field: "parentarea_active",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  parentAreaActive!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "parentarea_created_date",
    defaultValue: new Date(),
  })
  parentAreaCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "parentArea_updated_date",
    defaultValue: new Date(),
  })
  parentAreaUpdatedDate!: Date;
}

import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface TaxI {
  taxId: number;
  taxName: string;
  taxRate: number;
  taxCityCode: number;
  taxActive: number;
  taxCreatedDate: Date;
  taxUpdatedDate: Date;
}

@Table({
  tableName: "tax",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Tax extends Model implements TaxI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "tax_id",
  })
  taxId!: number;

  @Column({
    allowNull: false,
    field: "tax_name",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  taxName!: string;

  @Column({
    allowNull: false,
    field: "tax_rate",
    type: DataType.FLOAT,
    defaultValue: 0.0,
  })
  taxRate!: number;

  @Column({
    allowNull: false,
    field: "tax_city_code",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  taxCityCode!: number;

  @Column({
    allowNull: false,
    field: "tax_active",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  taxActive!: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "tax_created_date",
    defaultValue: new Date(),
  })
  taxCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "tax_updated_date",
    defaultValue: new Date(),
  })
  taxUpdatedDate!: Date;
}

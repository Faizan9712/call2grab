import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface AdminI {
  adminId: number;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  adminActive: string;
  adminCreatedDate: Date;
  adminUpdatedDate: Date;
}

@Table({
  tableName: "admin",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Admin extends Model implements AdminI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "admin_id",
  })
  adminId!: number;

  @Column({
    allowNull: false,
    field: "admin_first_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  adminFirstName!: string;

  @Column({
    allowNull: false,
    field: "admin_last_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  adminLastName!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "admin_gender_id",
    defaultValue: 0,
  })
  adminGenderId!: number;

  @Column({
    allowNull: false,
    field: "admin_email",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  adminEmail!: string;

  @Column({
    allowNull: false,
    field: "admin_password",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  adminPassword!: string;

  @Column({
    allowNull: false,
    field: "admin_active",
    type: DataType.CHAR(1),
    defaultValue: "0",
  })
  adminActive!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "admin_created_date",
    defaultValue: new Date(),
  })
  adminCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "admin_updated_date",
    defaultValue: new Date(),
  })
  adminUpdatedDate!: Date;
}

import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";
import Cart from "./Cart";

export interface UserI {
  userId: number;
  userFirstName: string;
  userMiddleName: string;
  userLastName: string;
  userEmail: string;
  userAlternativeEmail: string;
  userPassword: string;
  userPhoto: string;
  userPresentAddress: string;
  userPermanentAddress: string;
  userPincode: string;
  userState: string;
  userCity: string;
  userPhoneNumber: string;
  userMobileNumber: string;
  userGender: string;
  userDob: Date;
  userActive: string;
  userLastLogin: Date;
  userCreatedDate: Date;
  userUpdatedDate: Date;
}

@Table({
  tableName: "users",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class User extends Model implements UserI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "user_id",
  })
  userId!: number;

  @Column({
    allowNull: false,
    field: "user_first_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userFirstName!: string;

  @Column({
    allowNull: false,
    field: "user_middle_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userMiddleName!: string;

  @Column({
    allowNull: false,
    field: "user_last_name",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userLastName!: string;

  @Column({
    allowNull: false,
    field: "user_email",
    type: DataType.STRING(30),
    defaultValue: "",
  })
  userEmail!: string;

  @Column({
    allowNull: true,
    field: "user_alternative_email",
    type: DataType.STRING(30),
    defaultValue: "",
  })
  userAlternativeEmail!: string;

  @Column({
    allowNull: false,
    field: "user_password",
    type: DataType.STRING(30),
    defaultValue: "",
  })
  userPassword!: string;

  @Column({
    allowNull: false,
    field: "user_photo",
    type: DataType.STRING(150),
    defaultValue: "",
  })
  userPhoto!: string;

  @Column({
    allowNull: false,
    field: "user_present_address",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userPresentAddress!: string;

  @Column({
    allowNull: false,
    field: "user_permanent_address",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userPermanentAddress!: string;

  @Column({
    allowNull: false,
    field: "user_pincode",
    type: DataType.STRING(6),
    defaultValue: "",
  })
  userPincode!: string;

  @Column({
    allowNull: false,
    field: "user_string",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userState!: string;

  @Column({
    allowNull: false,
    field: "user_city",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userCity!: string;

  @Column({
    allowNull: true,
    field: "user_phone_number",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userPhoneNumber!: string;

  @Column({
    allowNull: false,
    field: "user_mobile_number",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  userMobileNumber!: string;

  @Column({
    allowNull: false,
    field: "user_gender",
    type: DataType.STRING(20),
    defaultValue: "",
  })
  userGender!: string;

  @Column({
    allowNull: false,
    field: "user_dob",
    type: DataType.DATEONLY,
    // defaultValue: "",
  })
  userDob!: Date;

  @Column({
    allowNull: false,
    field: "user_active",
    type: DataType.CHAR,
    defaultValue: "",
  })
  userActive!: string;

  @Column({
    allowNull: false,
    field: "user_last_login",
    type: DataType.DATE,
    // defaultValue: 0,
  })
  userLastLogin!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "user_created_date",
    defaultValue: new Date(),
  })
  userCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "user_updated_date",
    defaultValue: new Date(),
  })
  userUpdatedDate!: Date;

  // @HasOne(() => Cart)
  // Cart!: Cart[];
}

import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Product from "./Product";
import User from "./User";
export interface DealI {
  dealId: number;
  dealBannerImage: string;
  dealHeadingPrimary: string;
  dealHeadingSecondary: string;
  dealHeadingTeritary: string;
  dealButttonText: string;
  dealButtonLink: string;
  dealCreatedDate: Date;
  dealUpdatedDate: Date;
}

@Table({
  tableName: "deal",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Deal extends Model implements DealI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "deal_id",
  })
  dealId!: number;

  @Column({
    allowNull: false,
    field: "deal_banner_image",
    type: DataType.STRING(150),
    defaultValue: "",
  })
  dealBannerImage!: string;

  @Column({
    allowNull: false,
    field: "deal_heading_primary",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  dealHeadingPrimary!: string;

  @Column({
    allowNull: false,
    field: "deal_heading_secondary",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  dealHeadingSecondary!: string;

  @Column({
    allowNull: false,
    field: "deal_heading_teritary",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  dealHeadingTeritary!: string;

  @Column({
    allowNull: false,
    field: "deal_button_text",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  dealButttonText!: string;

  @Column({
    allowNull: false,
    field: "deal_button_link",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  dealButtonLink!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "deal_created_date",
    defaultValue: new Date(),
  })
  dealCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "deal_updated_date",
    defaultValue: new Date(),
  })
  dealUpdatedDate!: Date;

  // @BelongsTo(() => User)
  // User!: User[];

  // @BelongsTo(() => Product)
  // Product!: Product[];

  //   @HasMany(() => Product)
  //   Product!: Product[];
}

import { Model, Table, Column, DataType } from "sequelize-typescript";
export interface FeedbackI {
  feedbackId: number;
  feedbackUserId: number;
  feedbackOrderId: number;
  feedbackProductId: number;
  feedbackRating: string;
  feedbackTitle: string;
  feedbackDescription: string;
  feedbackRecommend: boolean;
  feedbackVerifiedPurchase: boolean;
  feedbackCreatedDate: Date;
  feedbackUpdatedDate: Date;
}

@Table({
  tableName: "feedback",
  freezeTableName: true,
  timestamps: false,
  underscored: true,
})
export default class Feedback extends Model implements FeedbackI {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    field: "feedback_id",
  })
  feedbackId!: number;

  @Column({
    allowNull: false,
    field: "feedback_user_id",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  feedbackUserId!: number;

  @Column({
    allowNull: false,
    field: "feedback_order_id",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  feedbackOrderId!: number;

  @Column({
    allowNull: false,
    field: "feedback_product_id",
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  feedbackProductId!: number;

  @Column({
    allowNull: false,
    field: "feedback_rating",
    type: DataType.STRING(50),
    defaultValue: "",
  })
  feedbackRating!: string;

  @Column({
    allowNull: false,
    field: "feedback_title",
    type: DataType.STRING(100),
    defaultValue: "",
  })
  feedbackTitle!: string;

  @Column({
    allowNull: false,
    field: "feedback_description",
    type: DataType.STRING(200),
    defaultValue: 0,
  })
  feedbackDescription!: string;

  @Column({
    allowNull: false,
    field: "feedback_recommend",
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  feedbackRecommend!: boolean;

  @Column({
    allowNull: false,
    field: "feedback_verified_purchase",
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  feedbackVerifiedPurchase!: boolean;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "feedback_created_date",
    defaultValue: new Date(),
  })
  feedbackCreatedDate!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "feedback_updated_date",
    defaultValue: new Date(),
  })
  feedbackUpdatedDate!: Date;
}

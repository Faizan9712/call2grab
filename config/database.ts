import { Sequelize } from "sequelize-typescript";
import Admin from "../models/Admin";
import Product from "../models/Product";
import User from "../models/User";
import Category from "../models/Category";
import Image from "../models/ProductImage";
import Cart from "../models/Cart";
import ParentCategory from "../models/ParentCategory";
import Order from "../models/Order";
import Coupon from "../models/Coupon";
import Brand from "../models/Brand";
import Deal from "../models/Deal";
import Area from "../models/Area";
import ParentArea from "../models/ParentArea";
import Tax from "../models/Tax";
import Payment from "../models/Payment";
import Feedback from "../models/Feedback";
import Refund from "../models/Refund";
const db: any = new Sequelize("call2grab", "root", "", {
  host: "localhost",
  storage: ".database/mysql",
  dialect: "mysql",
  models: ["../models/*.ts"],
  logging: false,
});
db.addModels([
  Admin,
  Product,
  User,
  Category,
  ParentCategory,
  Image,
  Cart,
  Order,
  Coupon,
  Brand,
  Deal,
  Area,
  ParentArea,
  Tax,
  Payment,
  Feedback,
  Refund,
]);

export default db;

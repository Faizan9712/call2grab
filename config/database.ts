import { Sequelize } from "sequelize-typescript";
import Admin from "../models/Admin";
const db: any = new Sequelize("call2grab", "root", "Ehsaan@12345", {
  host: "localhost",
  storage: ".database/mysql",
  dialect: "mysql",
  models: ["../models/*.ts"],
  logging: false,
});
db.addModels([Admin]);

export default db;

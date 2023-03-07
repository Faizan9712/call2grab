import { QueryTypes } from "sequelize";
import Deal from "../models/Deal";
import dotenv from "dotenv";
import db from "../config/database";
import { pagination } from "../helpers/functions";

//INSTANCE VARIABLES
let output: any;

dotenv.config();

//DEAL SERVICE CLASS
export default class DealService {
  //CASES FOR FILTERS AND POPULATES

  async dealCases(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    query: any,
    filter: any,
    limit: any
  ) {
    switch (query || filter) {
      case "all":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "1",
          "=",
          "1"
        );

      case "date":
        return await this.genQuery(
          pageNo,
          "deal_updated_date",
          "DESC",
          limit,
          "1",
          "=",
          "1"
        );
      case "active":
        return await this.genQuery(
          pageNo,
          orderBy,
          sortBy,
          limit,
          "deal_active",
          "=",
          "1"
        );
      case "count":
        return Deal.count();

      default:
        return output == "" ? `No Deals Found` : output;
    }
  }

  //GENERAL QUERY
  async genQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit: number,
    condVariable: any,
    operator: any,
    condValue: any
  ) {
    output = await db.query(
      `SELECT
    deal.deal_banner_image "dealId",
    deal.deal_heading_primary "dealHeadingPrimary",
    deal.deal_heading_secondary "dealHeadingSecondary",
    deal.deal_heading_teritary "dealHeadingTeritary",
    deal.deal_button_text "dealButtonText",
    deal.deal_button_link "dealButtonLink",
    deal.deal_created_date "dealCreatedDate",
    deal.deal_updated_date "dealUpdatedDate"

  FROM
  deal deal
  WHERE
    ${condVariable} ${operator} ${condValue}
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Deals Found` : output;
  }

  //LIKE QUERY
  async likeQuery(
    pageNo: number,
    orderBy: string,
    sortBy: string,
    limit: number,
    condVariable: any,
    condValue: any
  ) {
    output = await db.query(
      `SELECT
      deal.deal_banner_image "dealId",
      deal.deal_heading_primary "dealHeadingPrimary",
      deal.deal_heading_secondary "dealHeadingSecondary",
      deal.deal_heading_teritary "dealHeadingTeritary",
      deal.deal_button_text "dealButtonText",
      deal.deal_button_link "dealButtonLink",
      deal.deal_created_date "dealCreatedDate",
      deal.deal_updated_date "dealUpdatedDate"
  FROM
  deal deal
  WHERE
  ${condVariable} LIKE "%${condValue}%"
    ORDER BY ${orderBy}
    ${sortBy}
    LIMIT ${limit}
    OFFSET ${await pagination(pageNo)}`,

      {
        type: QueryTypes.SELECT,
      }
    );
    return output == "" ? `No Deals Found` : output;
  }

  //GET DEAL BY ID
  async getDeal(id: number) {
    output = "";
    output = await Deal.findByPk(id);
    return output == "" || output == null
      ? `No Deal with id=${id} Found`
      : output;
  }

  //ADD DEAL
  async addDeal(body: any) {
    output = "";
    output = await Deal.create(body);
    return output == "" ? `Error occured` : output._previousDataValues;
  }

  //UPDATE DEAL
  async updateDeal(body: any, id: number) {
    output = "";
    output = await Deal.update(body, {
      where: { Deal_id: id },
    });
    return output;
  }

  //DELETE DEAL
  async deleteDeal(id: number) {
    output = "";
    output = await Deal.destroy({
      where: { Deal_id: id },
    });
    return output;
  }

  //PATH OF PHOTO IN DB
  async dbSetPath(fullfilename: any, id: number) {
    output = "";
    output = await Deal.update(
      { dealBannerImage: fullfilename },
      {
        where: { dealId: id },
      }
    ).then((output: any) => {
      return output;
    });
  }
}

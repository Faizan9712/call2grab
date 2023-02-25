import Admin from "../models/Admin";

let output: any;
export default class AuthenticationService {
  //LOGIN
  async login(email: string, password: string) {
    output = "";
    output = await Admin.findOne({
      where: {
        admin_email: email,
        admin_password: password,
      },
    });
    return (await output) ? { flag: true, result: output } : { flag: false };
  }

  //CHECK EMAIL
  async checkEmailPassword(email: any, password: any) {
    output = "";
    output = await Admin.findOne({
      where: {
        admin_email: email,
      },
    });
    return output ? true : false;
  }

  //CHECK EMAIL AND PASSWORD
  async checkEmailAndPassword(email: any, password: any) {
    output = "";
    output = await Admin.findOne({
      where: {
        admin_email: email,
        admin_password: password,
      },
    });
    return output ? true : false;
  }

  //CHANGE PASSWORD
  async updateNewPassword(email: any, password: any) {
    output = "";
    output = await Admin.update(
      { adminPassword: password },
      {
        where: { admin_email: email },
      }
    );
    return output ? true : false;
  }

  //UPDATE PROFILE
  async updateProfile(body: any, id: number) {
    output = "";
    output = await Admin.update(body, {
      where: { admin_id: id },
    });
    return output;
  }
}

import Admin from "../models/Admin";

let output: any;
export default class AuthenticationService {
  //LOGIN IN
  async login(email: string, password: string) {
    output = "";
    output = await Admin.findOne({
      where: {
        admin_email: email,
        admin_password: password,
      },
    });
    return (await output) ? { flag: true, result: output } : { flag: false };
    // if (output) {
    //   return { flag: true, result: output };
    // } else {
    //   return { flag: false };
    // }
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
    // if (output) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}

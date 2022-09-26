export interface Isignup {
  fname: string;
  lname: string;
  username: string;
  password: string;
  pckg: string;
  ispaid: number;
  contact:number
}
export interface Isignin {
  username: string;
  password: string;
}
export interface IForgotPwd {
  userid: string;
  email: string;
  otp: string;
  password: string;
  confirmpassword: string;
}

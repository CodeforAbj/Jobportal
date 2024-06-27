import { generateId } from "../middlewares/idGenerator";

export default class UserModel {
  constructor(id, name, email, password, typeOfUser) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.jobsRelated = []);
    this.typeOfUser = typeOfUser;
    this.resumeFileName = undefined;
  }

  static getJobsRelated(email) {
    let targetUser = users.map((user) => user.email === email);
    return targetUser.jobsRelated;
  }

  static registerUser(user) {
    const id = generateId();
    let newUser = new UserModel(
      id,
      user.name,
      user.email,
      user.password,
      user.typeOfUser
    );
    users.push(newUser);
  }

  static isValidUser(email, password) {
    const result = users.find(
      (u) => u.email == email && u.password == password
    );
    return result;
  }
  static getUsers() {
    return users;
  }
  static getUserByEmail(email) {
    return users.find((u) => u.email == email);
  }
}
var users = [
  {
    id: "KMKbj",
    name: "Demo Recruiter",
    email: "demoRec@account.com",
    password: "Password@123",
    jobsRelated: [],
    typeOfUser: "recruiter",
    resumeFileName: undefined,
  },
  {
    id: "DG4cd",
    name: "Demo Seeker",
    email: "demoSeek@account.com",
    password: "Password@123",
    jobsRelated: ["V3ZoP", "ZeWMZ", "L43sM"],
    typeOfUser: "seeker",
    resumeFileName:
      "1719228115902-Abhijeet Shrivastava Resume APRIL V1 Final.pdf",
  },
  {
    id: "KL21p",
    name: "Priya Kapoor",
    email: "priyaKapoor@account.com",
    password: "Password@123",
    jobsRelated: ["ZeWMZ", "V3ZoP"],
    typeOfUser: "seeker",
    resumeFileName:
      "1719228115902-Abhijeet Shrivastava Resume APRIL V1 Final.pdf",
  },
  {
    id: "TZ98u",
    name: "Rahul Sharma",
    email: "rahulSharma@account.com",
    password: "Password@123",
    jobsRelated: ["L43sM"],
    typeOfUser: "seeker",
    resumeFileName:
      "1719228115902-Abhijeet Shrivastava Resume APRIL V1 Final.pdf",
  },
  {
    id: "VM71q",
    name: "Aisha Khan",
    email: "aishaKhan@account.com",
    password: "Password@123",
    jobsRelated: ["L43sM"],
    typeOfUser: "seeker",
    resumeFileName:
      "1719228115902-Abhijeet Shrivastava Resume APRIL V1 Final.pdf",
  },
];

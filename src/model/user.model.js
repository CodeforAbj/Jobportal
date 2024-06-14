export default class UserModel {
  constructor(id, name, email, password, typeOfUser) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.jobsRelated = []);
    this.typeOfUser = typeOfUser;
  }

  static getJobsRelated(email) {
    let targetUser = users.map((user) => user.email === email);
    return targetUser.jobsRelated;
  }

  static registerUser(user) {
    users.push(user);
  }

  static isValidUser(email, password) {
    const result = users.find(
      (u) => u.email == email && u.password == password
    );
    return result;
  }
}
let users = [
  new UserModel(
    users.length + 1,
    "Demo Recruiter",
    "demoRec@account.com",
    "password@123",
    "recruiter"
  ),
  new UserModel(
    users.length + 1,
    "Demo Seeker",
    "demoSeek@account.com",
    "password@123",
    "seeker"
  ),
];

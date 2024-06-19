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
    let newUser = new UserModel(
      users.length + 1,
      user.name,
      user.email,
      user.password,
      user.typeOfUser
    );
    users.push(user);
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
}
var users = [
  new UserModel(
    1,
    "Demo Recruiter",
    "demoRec@account.com",
    "Password@123",
    "recruiter"
  ),
  new UserModel(
    2,
    "Demo Seeker",
    "demoSeek@account.com",
    "Password@123",
    "seeker"
  ),
];

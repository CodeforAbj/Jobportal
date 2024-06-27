// ====================================================== //
// ========== To prevent reregistering any user ========= //
// ====================================================== //
import UserModel from "../model/user.model.js";
const alreadyExistsCheck = (req, res, next) => {
  const users = UserModel.getUsers();
  const user = users.find((u) => u.email == req.body.email);
  if (user) {
    res.render("landing/landingPage", {
      loginStatus: false,
      errorMessage: "Email already in use",
    });
  } else {
    next();
  }
};
export { alreadyExistsCheck };

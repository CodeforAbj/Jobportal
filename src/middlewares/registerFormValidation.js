import { body, validationResult } from "express-validator";

// Validation middleware
const validateRegistrationData = async (req, res, next) => {
  const rules = [
    // Validate and sanitize name
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .trim()
      .escape(),

    // Validate typeOfUser
    body("typeOfUser")
      .isIn(["recruiter", "seeker"])
      .withMessage('Type of user must be either "Recruiter" or "Seeker"'),

    // Validate password
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      .withMessage(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character"
      ),

    // Validate email
    body("email").isEmail().withMessage("Email is not valid"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.render("landing/landingPage", {
      loginStatus: false,
      errorMessage: validationErrors.array()[0].msg,
    });
  } else {
    next();
  }
};

export { validateRegistrationData };

const { check, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const registerValidation = () => {
  return [
    check("name", "Name is required").notEmpty(),
    check("email", "Please use a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ];
};

const loginValidation = () => {
  return [
    check("email", "Please use a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ];
};

const profileValidation = () => {
  return [
    check("status", "Status is required").notEmpty(),
    check("skills", "Skills is required").notEmpty(),
  ];
};

const experienceValidator = () => {
  return [
    check("title", "Title is required").notEmpty(),
    check("company", "Company is required").notEmpty(),
    check("from", "From date is required").notEmpty(),
  ];
};

const educationValidator = () => {
  return [
    check("school", "School is required").notEmpty(),
    check("degree", "Degree is required").notEmpty(),
    check("fieldOfStudy", "Field Of Study date is required").notEmpty(),
    check("from", "From date is required").notEmpty(),
  ];
};

const postValidator = () => {
  return [check("text", "Text is required").notEmpty()];
};

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  profileValidation,
  experienceValidator,
  educationValidator,
  postValidator,
};

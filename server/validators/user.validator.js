import { body } from "express-validator";

/**
 * Validate tag request while creation
 *
 */
export const create = () => {
  return [
    body("first_name")
      .not()
      .isEmpty()
      .withMessage("First Name is required")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Leader Name must be minimum 2 characters long")
      .isLength({ max: 255 })
      .withMessage("Leader Name must be maximum 255 characters long"),
    body("last_name")
      .not()
      .isEmpty()
      .withMessage("Last Name is required")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Title be minimum 2 characters long")
      .isLength({ max: 255 })
      .withMessage("Title must be maximum 255 characters long"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email address is required"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4, max: 16 })
      .withMessage("Password must be between 4 to 16 characters"),
    // .matches(/^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/).withMessage("Password must content at least upper case, lower case, digit, special character and no white space"),
    body("phone")
      .not()
      .isEmpty()
      .withMessage("mobile number is required")
      .isInt()
      .withMessage("Phone info must be whole number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone info must be 10 digit"),
  ];
};

/**
 * Validate tag request while updation
 *
 */
export const update = () => {
  return [
    body("first_name")
      .not()
      .isEmpty()
      .withMessage("First Name is required")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Leader Name must be minimum 2 characters long")
      .isLength({ max: 255 })
      .withMessage("Leader Name must be maximum 255 characters long"),
    body("last_name")
      .not()
      .isEmpty()
      .withMessage("Last Name is required")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Title be minimum 2 characters long")
      .isLength({ max: 255 })
      .withMessage("Title must be maximum 255 characters long"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email address is required"),
    body("phone")
      .not()
      .isEmpty()
      .withMessage("mobile number is required")
      .isInt()
      .withMessage("Phone info must be whole number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone info must be 10 digit"),
  ];
};

export default { create, update };

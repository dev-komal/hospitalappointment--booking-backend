import { body } from "express-validator";
import { get } from "lodash";

const _ = { get };

/**
 * Validate Login Authentication
 *
 */
export const login = () => {
  return [
    body("email").not().isEmpty().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ];
};

/**
 * Validate verify Authentication
 *
 */
export const verify = () => {
  return [
    body("email").not().isEmpty().withMessage("Email is required"),
    body("verification_code")
      .not()
      .isEmpty()
      .withMessage("verification_code is required"),
  ];
};

/**
 * Resend verify Authentication
 *
 */
export const resend = () => {
  return [body("email").not().isEmpty().withMessage("Email is required")];
};

/**
 * Change password
 *
 */
export const changePassword = () => {
  return [
    body("current_password")
      .not()
      .isEmpty()
      .withMessage("Current password is required"),
    body("new_password")
      .not()
      .isEmpty()
      .withMessage("New password is required")
      .isLength({ min: 4, max: 16 })
      .withMessage("Password must be between 4 to 16 characters"),
    body("confirm_password")
      .not()
      .isEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.new_password) {
          throw new Error("Password and Confirm password does not match");
        }
        return true;
      }),
  ];
};

export default {
  login,
  changePassword,
  verify,
  resend,
};

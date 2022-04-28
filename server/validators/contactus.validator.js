import { body } from "express-validator";

export const create = () => {
  return [
    body("fullname")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Fullname msut be maximum 255 character long"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("message").not().isEmpty().withMessage("Message is required"),
  ];
};

export const update = () => {
  return [
    body("fullname")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Fullname msut be maximum 255 character long"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("message").not().isEmpty().withMessage("Message is required"),
  ];
};

export default { create, update };

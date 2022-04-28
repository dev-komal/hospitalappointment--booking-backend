import { body } from "express-validator";

export const create = () => {
  return [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Title must be minimum 2 character long")
      .isLength({ max: 255 })
      .withMessage("Title msut be maximum 255 character long"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
    body("length").not().isEmpty().withMessage("Length is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
    body("quantity").not().isEmpty().withMessage("Quantity is required"),
    body("status").not().isEmpty().withMessage("Status is required"),
  ];
};

export const update = () => {
  return [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Title must be minimum 2 character long")
      .isLength({ max: 255 })
      .withMessage("Title msut be maximum 255 character long"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
    body("length").not().isEmpty().withMessage("Length is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
    body("quantity").not().isEmpty().withMessage("Quantity is required"),
    body("status").not().isEmpty().withMessage("Status is required"),
  ];
};

export default { create, update };

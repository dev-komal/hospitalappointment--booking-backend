import { body } from "express-validator";

export const create = () => {
  return [
    body("user_id").not().isEmpty().withMessage("User  is required"),

    body("product_id").not().isEmpty().withMessage("Product  is required"),

    body("quantity").not().isEmpty().withMessage("Quantity is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
  ];
};

export const update = () => {
  return [
    body("user_id").not().isEmpty().withMessage("User  is required"),

    body("product_id").not().isEmpty().withMessage("Product  is required"),

    body("quantity").not().isEmpty().withMessage("Quantity is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
  ];
};

export default { create, update };

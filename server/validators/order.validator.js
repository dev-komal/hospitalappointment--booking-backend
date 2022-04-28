import { body } from "express-validator";

export const create = () => {
  return [
    body("order_date").not().isEmpty().withMessage("Order date is required"),
    body("order_address")
      .not()
      .isEmpty()
      .withMessage("Order Address is required"),
  ];
};

export const update = () => {
  return [
    body("order_date").not().isEmpty().withMessage("Order Date is required"),
    body("order_address")
      .not()
      .isEmpty()
      .withMessage("Order Address is required"),
  ];
};

export default { create, update };

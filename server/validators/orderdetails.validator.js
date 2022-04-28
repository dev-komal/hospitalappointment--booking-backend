import { body } from "express-validator";

export const create = () => {
  return [
    body("total").not().isEmpty().withMessage("Total is required"),
    body("status").not().isEmpty().withMessage("Status is required"),
  ];
};

export const update = () => {
  return [
    body("total").not().isEmpty().withMessage("Total is required"),
    body("status").not().isEmpty().withMessage("Status is required"),
  ];
};

export default { create, update };

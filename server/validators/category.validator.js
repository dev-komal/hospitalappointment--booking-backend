import { body } from "express-validator";

export const create = () => {
  return [
    body("category_name")
      .not()
      .isEmpty()
      .withMessage("Category Name is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Category Name msut be maximum 255 character long"),
  ];
};

export const update = () => {
  return [
    body("category_name")
      .not()
      .isEmpty()
      .withMessage("Category Name is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Category Name msut be maximum 255 character long"),
  ];
};

export default { create, update };

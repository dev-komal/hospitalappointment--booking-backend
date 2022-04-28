import { body } from "express-validator";

export const create = () => {
  return [
    body("color_name")
      .not()
      .isEmpty()
      .withMessage("Color Name is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Color Name msut be maximum 255 character long"),
  ];
};

export const update = () => {
  return [
    body("color_name")
      .not()
      .isEmpty()
      .withMessage("Color Name is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Color Name msut be maximum 255 character long"),
  ];
};

export default { create, update };

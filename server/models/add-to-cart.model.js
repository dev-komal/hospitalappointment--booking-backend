"use strict";
import Sequelize from "sequelize";
import Helper from "../common/helper";
export default (sequelize) => {
  var AddToCart = sequelize.define(
    "AddToCart",
    {
      user_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "User ID Is Required" },
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "Product ID Is Required" },
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "Quantity  Is Required" },
        },
      },
      price: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "Price Is Required" },
        },
      },
      total: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "total Is Required" },
        },
      },
    },
    {
      tableName: "add-to-cart",
    }
  );
  AddToCart.associate = function (models) {
    models.AddToCart.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
    });

    models.AddToCart.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "product_id",
    });
  };
  return AddToCart;
};

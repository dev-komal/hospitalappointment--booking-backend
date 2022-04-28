"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Token = sequelize.define(
    "Token",
    {
      user: {
        type: Sequelize.INTEGER,
       
      },
      token: {
        type: Sequelize.TEXT,
        validate: {
          notEmpty: { msg: "token is required" },
        },
      },

     
    },
    {
      tableName: "token",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );

  Token.associate = function (models) {
    models.Token.belongsTo(models.User, {
      as: "Token",
      foreignKey: "user",
    });
  
  };

  return Disease;
};

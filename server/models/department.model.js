"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Department = sequelize.define(
    "Department",
    {
     
      Department_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Department Name Is Required" },
        },
      },
    },
    {
      tableName: "department",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  return Department;
};

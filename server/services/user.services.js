import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, isEmpty, isNull } from "lodash";
import { userRoles, commonStatuses, USER_DIR } from "../common/appConstants";
import appConfig from "../common/appConfig";
import bcrypt from "bcryptjs";

const _ = { get, isEmpty, isNull };

const listUsers = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    // Find all Users
    const users = await Models.User.findAndCountAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "password",
        "role",
        "created_at",
      ],
      include: [],
      where: {
        [Op.not]: {
          user_role_id: userRoles.ADMIN_ROLE.id,
        },
      },
      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["created_at", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((users || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((users || {}).rows || []).length || 0;
    pagination["count"] = (users || {}).count || 0;

    response = { ...statusConst.success, pagination, data: (users || {}).rows };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

/**
 * Get Users
 *
 * @param Request request
 * @return JSON response
 */
const listAllUsers = async (req) => {
  let response = statusConst.error;

  try {
    // Find all Users
    const users = await Models.User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "password",
        "role",
        "created_at",
      ],
      where: {
        [Op.not]: {
          user_role_id: userRoles.ADMIN_ROLE.id,
        },
      },
      order: [["created_at", "DESC"]],
    });

    response = { ...statusConst.success, data: users };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

/**
 * Get User Details
 *
 * @param id User Id
 * @param Object tokenUser
 * @return JSON response
 */
const getUserDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    // Check if user is authorised or not
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    // Get User data
    const user = await Models.User.findOne({
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "address",
        "phone",
        "status",
        "profile_image",
      ],
      where: {
        [Op.and]: {
          id: id,
          status: commonStatuses.ACTIVE.id,
        },
      },
    });

    if (!user) {
      return { ...statusConst.error, message: "User not found" };
    }

    response = { ...statusConst.success, data: user };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

/**
 * Create a User
 *
 * @param Request data
 * @return JSON response
 */
const createUser = async (req) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.profile_image;
    fileName = `user-${Date.now().toString()}.${(file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
      }`;
    filePath = `${USER_DIR}${fileName}`;

    // Move product image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }
  try {
    const userPayload = {
      first_name: _.get(data, "first_name", ""),
      last_name: _.get(data, "last_name", ""),
      email: _.get(data, "email", ""),
      password: await bcrypt.hash(data.password, appConfig.bcryptSaltRound),
      address: _.get(data, "address", ""),
      phone: _.get(data, "phone", ""),
      status: _.get(data, "status", ""),
      profile_image: fileName,
      status: commonStatuses.ACTIVE.id,
      user_role_id: data.user_role_id || userRoles.USER_ROLE.id,
    };

    // Create new User entity
    const user = await Models.User.create(userPayload, { raw: true });

    const userId = _.get(user, "id", 0);

    // User not created, throw an exception
    if (!userId) {
      return { ...statusConst.error, message: "Unable to create a new User" };
    }

    response = { ...statusConst.success, message: "User created successfully" };
  } catch (error) {
    let errors = {};

    // Default message
    response = { ...statusConst.error, message: error.message };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = { ...statusConst.validationErrors, errors };
      }
    } catch (error) {
      response = { ...statusConst.error, message: error.message };
    }
  }

  return response;
};

/**
 * Update a User
 *
 * @param id User ID
 * @param Request formData
 * @return JSON response
 */
const updateUser = async (req, id) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.profile_image;
    fileName = `user-${Date.now().toString()}.${(file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
      }`;
    filePath = `${USER_DIR}${fileName}`;

    // Move product image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }

  try {
    // Check if user is authorised or not
    // if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
    //   return { ...statusConst.forbidden };
    // }

    //Check if User exist
    const isUser = await Models.User.findOne({
      where: { id: id },
    });

    if (!isUser) {
      return { ...statusConst.notFound, message: "User not found" };
    }

    const userPayload = {
      first_name: data.first_name || isUser.first_name,
      last_name: data.last_name || isUser.last_name,
      email: data.email || isUser.email,
      phone: data.phone || isUser.phone,
      address: data.address || isUser.address,
      password: data.password || isUser.password,
      status: data.status || isUser.status,
      profile_image: fileName,
    };

    await isUser.update(userPayload);

    response = { ...statusConst.success, message: "User updated successfully" };
  } catch (error) {
    let errors = {};

    // Default message
    response = { ...statusConst.error, message: error.message };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = { ...statusConst.validationErrors, errors };
      }
    } catch (error) {
      response = { ...statusConst.error, message: error.message };
    }
  }

  return response;
};

/**
 * Delete a User
 *
 * @param id User ID
 * @return JSON response
 */
const deleteUser = async (id) => {
  let response = statusConst.error;
  try {
    // Check if User exist
    const isUser = await Models.User.findOne({
      where: { id: id },
    });

    if (!isUser) {
      return { ...statusConst.error, message: "User not found" };
    }

    // Delete User
    const user = await Models.User.destroy({
      where: { id: id },
    });

    // User not deleted? throw an exception
    if (user === 0) {
      return { ...statusConst.success, message: "User deleted Failed" };
    }

    response = { ...statusConst.success, message: "User deleted Successfully" };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

/**
 * Search a User
 *
 * @param String q
 * @param Object
 *
 * @return JSON response
 */
const searchUser = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search users
    const users = await Models.User.findAndCountAll({
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "address",
        "phone",
        "status",
        "profile_image",
      ],
      include: [],
      where: {
        [Op.or]: {
          first_name: { [Op.like]: `%${q}%` },
          last_name: { [Op.like]: `%${q}%` },
          email: { [Op.like]: `%${q}%` },
          phone: { [Op.like]: `%${q}%` },
          address: { [Op.like]: `%${q}%` },
        },
        [Op.not]: {
          user_role_id: userRoles.ADMIN_ROLE.id,
        },
      },
      offset: entityPagination.offset,
      limit: entityPagination.limit,
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((users || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((users || {}).rows || []).length || 0;

    response = { ...statusConst.success, pagination, data: (users || {}).rows };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const UserServices = {
  listUsers,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  listAllUsers,
};

export default UserServices;

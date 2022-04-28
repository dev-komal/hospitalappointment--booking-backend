import {
  each,
  size,
  set,
  isEmpty,
  isObject,
  startCase,
  chain,
  map,
  get,
  has,
  isNumber,
  cloneDeep,
} from "lodash";
import crypto from "crypto";
import Models from "../models";
import moment from "moment";
import appConst from "./appConstants";

const nodemailer = require("nodemailer");

const _ = {
  each,
  size,
  set,
  isEmpty,
  isObject,
  startCase,
  chain,
  map,
  get,
  has,
  isNumber,
  cloneDeep,
};

/**
 * Generate the login verification data once user log in
 *
 * @return Email verification data
 */
const generateLoginVerificationDetails = () => {
  return {
    login_verification_code: generateRandomString({ length: 6, upper: true }),
    verification_code_expired_at: moment()
      .add(10, "minutes")
      .format(appConst.standardDateFormat),
  };
};

/**
 * Throw an unique field validation when requirement matches
 *
 *     const options = {
 *        msg: Whether need to display explicit error message or not
 *    }
 *
 *
 * @param  String Modal name
 * @param  String Field to be validated
 * @param  Object See options object more for details
 * @return Thrown an unique error Sequelize validation if criteria matches
 */
const isUnique = (modelName, field, options = {}) => {
  return function (value, next) {
    var Model = Models[modelName];

    // Validate the field only if has any value
    if (!_.isEmpty(value)) {
      var query = {};
      query[field] = value;

      // Check if error message is passed
      const errorMessage = _.get(
        options,
        "msg",
        `${_.startCase(field)} is already in use`
      );
      Model.findOne({ where: query, attributes: ["id"] })
        .then(function (obj) {
          if (!_.isEmpty(obj)) {
            next(errorMessage);
          } else {
            next();
          }
        })
        .catch((e) => {
          next(`Unexpected error ${e.message}`);
        });
    } else {
      next();
    }
  };
};

/**
 * Format the Sequelize error instance object to readable format
 *
 * @param  Instance SequelizeValidationError
 * @return Formatted error messages in Object form
 */
const formatSequelizeErrors = (errorsObject) => {
  let errors = {};

  _.each(errorsObject.errors || [], function (e) {
    const field = _.get(e, "path", "");
    const message = _.get(e, "message", "");

    if (!_.isEmpty(field) && !_.isEmpty(message)) {
      errors[field] = message;
    }
  });

  return errors;
};

/**
 * Generate random string between min and max length
 *
 * @param  Object options
 * @return Random string
 */
const generateRandomString = (options = {}) => {
  try {
    // Define the length of the string
    const stringLength =
      _.has(options, "length") && _.isNumber(options.length)
        ? options.length
        : 6;

    // Generate Random String
    let generatedString = crypto.randomBytes(stringLength).toString("hex");

    // Check if string needs to be converted into Upper case
    if (_.has(options, "upper")) {
      generatedString = generatedString.toUpperCase();
    }

    return generatedString.substr(0, stringLength);
  } catch (error) {
    return error.message;
  }
};

/**
 * Check whether email addresses is valid or not.
 *
 * @param  String Email Address
 * @return TRUE if email addresses is valid, FALSE otherwise
 */
const validateEmail = (email = "") => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Add pagination to data list
 *
 * @param  paginateData paginateData
 * @return Pagination details object
 */
const dataPagination = (paginateData = {}) => {
  let currentPage =
    parseInt(paginateData.page || 0) > 0 ? parseInt(paginateData.page) : 1;
  const pageSize =
    parseInt(paginateData.pageSize || 0) > 0 &&
    parseInt(paginateData.pageSize || 0) <= appConst.pageSizeLimit
      ? parseInt(paginateData.pageSize)
      : appConst.pageSize;
  const defaultOffset = (currentPage - 1) * pageSize;

  return {
    limit: pageSize,
    offset: defaultOffset,
    page: currentPage,
    pageSize,
    pagination: {
      totalPages: 0,
      pageRecords: 0,
      page: currentPage,
      pageSize,
    },
  };
};

const sendMail = async (data = {}) => {
  const MAIL_HOST = _.get(process, "env.MAIL_HOST", "whatsadeal.com");
  const MAIL_PORT = _.get(process, "env.MAIL_PORT", 465);
  const MAIL_SECURE = _.get(process, "env.MAIL_SECURE", true);
  const MAIL_USER = _.get(
    process,
    "env.MAIL_USER",
    "donotreply@whatsadeal.com"
  );
  const MAIL_PASS = _.get(
    process,
    "env.MAIL_PASS",
    "AJAY@iq9zjKX9jpa8Y6B@KOLI"
  );

  let transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SECURE,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `${data.mailTitle} <donotreply@whatsadeal.com>`,
    to: data.email,
    subject: data.subject,
    html: data.mailTemplate,
  };

  let info = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info);
      return info;
    }
  });

  return info;
};

const Helper = {
  generateLoginVerificationDetails,
  isUnique,
  formatSequelizeErrors,
  generateRandomString,
  validateEmail,
  dataPagination,
  sendMail,
};

export default Helper;

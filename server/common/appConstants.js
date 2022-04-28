import { group } from "console";

const path = require("path");

export const DS = "/";
export const ROOT_DIR = path.resolve("./");
export const ASSETS_DIR = `${ROOT_DIR}${DS}assets${DS}`;
export const USER_DIR = `${ASSETS_DIR}${DS}users${DS}`;
export const PRODUCT_DIR = `${ASSETS_DIR}${DS}products${DS}`;
export const CATEGORY_DIR = `${ASSETS_DIR}${DS}categories${DS}`;
export const BANNER_DIR = `${ASSETS_DIR}${DS}banner${DS}`;
export const SMMI = `${ASSETS_DIR}${DS}smmi${DS}`;
export const TMP_DIR = `${ASSETS_DIR}${DS}tmp${DS}`;

export default {
  AWS: {
    accessKey: "ACCESS-KEY",
    secretAccessKey: "SECRET-ACCESS-KEY",
  },
  pageSize: 20,
  pageSizeLimit: 200,
  timeZone: "Asia/Kolkata",
  thumbMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/bmp"],
  imageMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/bmp"],
  fontMimeTypes: ["ttf", "otf"],
  standardDateFormat: "YYYY-MM-DD HH:mm:ss",
};

export const userRoles = {
  ADMIN_ROLE: {
    id: 1,
    title: "admin",
  },
  DOCTOR_ROLE: {
    id: 2,
    title: "doctor",
  },
  PATIENT_ROLE: {
    id: 3,
    title: 'patient'
  }

};

/**
 * Use common statuses across the Application, Mainly use for Active and Inactive flag
 *
 */
export const commonStatuses = {
  ACTIVE: {
    id: 1,
    title: "active",
  },
  INACTIVE: {
    id: 2,
    title: "inactive",
  },
  DELETED: {
    id: 3,
    title: "deleted",
  },
};

export const pageStatuses = {
  COMPLETED: {
    id: 1,
    title: "completed",
  },
  PENDING: {
    id: 2,
    title: "pending",
  },
};

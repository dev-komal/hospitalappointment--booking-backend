import statusConst from "./../common/statusConstants";
import jwt from "jsonwebtoken";
import appConfig from "./../common/appConfig";
import { userRoles } from "../common/appConstants";
import authServices from "./../services/auth.services";
import { chain } from "lodash";

const _ = { chain };

export default (req, res, next) => {
  const token = _.chain(req)
    .get("headers.authorization", "")
    .replace("Bearer ", "")
    .value();

  if (token) {
    // Validate token
    try {
      jwt.verify(token, appConfig.jwtSecretKey);

      // Match JTW with user table
      authServices
        .findByToken(token)
        .then((data) => {
          if (data.status === 200) {
            const userData = data.data || {};

            // Check if the role is user
            const adminRole = userRoles.ADMIN_ROLE.id;
            if (userData.user_role_id == adminRole) {
              // Pass token user with current request
              req.tokenUser = userData;
              next();
            } else {
              res.status(401).send({ ...statusConst.forbidden, status: 401 });
            }
          } else {
            res.status(401).send({ status: 401, message: data.message });
          }
        })
        .catch((error) => {
          res.status(401).send({ status: 401, message: error.message });
        });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).send(statusConst.tokenExpired);
      } else {
        res
          .status(401)
          .send({ ...statusConst.tokenExpired, message: error.message });
      }
    }
  } else {
    res
      .status(statusConst.noTokenProvided.status)
      .send(statusConst.noTokenProvided);
  }
};

import express from "express";
import cookieParser from "cookie-parser";
import _ from "lodash";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import indexRouter from "./routes/index";
import { ASSETS_DIR } from "./common/appConstants";
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "../public")));

// End point of API
app.use("/api", indexRouter);

// app.use('/assets',[adminAuthMiddleware], express.static(__dirname + 'assets'));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

fs.appendFile("message.txt", "data to append", function (err) {
  if (err) throw err;
  console.log("Saved Error");
});

// catch 404 and forward to error handler.
app.use(function (req, res, next) {
  next({
    status: 404,
    message: "Not Found!",
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message ? err.message : "Something went wrong.",
  });
});

export default app;

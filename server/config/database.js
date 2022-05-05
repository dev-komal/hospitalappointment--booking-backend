const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/hospital-appointment-booking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection established.");
    })
    .catch((err) => {
      console.log("Connection error:", err);
    });
};

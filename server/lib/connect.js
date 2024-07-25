const mongoose = require("mongoose");

const Connect = async (url) => {
  mongoose
    .connect(url)
    .then((res) => {
      console.log("MongoDB Connected Succesfully");
    })
    .catch((error) => {
      console.log("MongoDB connection Failed");
    });
};

module.exports = Connect;

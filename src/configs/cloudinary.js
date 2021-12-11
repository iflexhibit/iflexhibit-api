const cloudinary = require("cloudinary").v2;

const {
  cloudinary: { C_API_KEY, C_NAME, C_SECRET },
} = require("./config");
cloudinary.config({
  cloud_name: C_NAME,
  api_key: C_API_KEY,
  api_secret: C_SECRET,
});

module.exports = { cloudinary };

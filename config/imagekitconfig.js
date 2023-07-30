const dotenv = require("dotenv");
var ImageKit = require("imagekit");
dotenv.config();

const imageKitConfig = {
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGE_KIT_URL_END_POINT || "",
};
// console.log({ imageKitConfig });

var imageKit = new ImageKit({
  publicKey: imageKitConfig.publicKey,
  privateKey: imageKitConfig.privateKey,
  urlEndpoint: imageKitConfig.urlEndpoint,
});
module.exports = imageKit;

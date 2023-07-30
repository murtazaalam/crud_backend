const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const { join } = require("path");
// const uploadImageToImageKit = require("../helper/imagekit");
const imageKit = require("../config/imagekitconfig");
let dir = join(__dirname, "../uploads");
const fileRoutes = Router();
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let imageFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(jpg|JPG|png|PNG)$/)) {
    req.fileValidationError = "only image allowed";
    return callback(new Error("Image Error"), false);
  }
  callback(null, true);
};

let fileStorage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    },
  },
  { imageFilter: imageFilter }
);
const uploader = multer({ storage: fileStorage });

fileRoutes.post("/upload", uploader.single("image"), async (req, res) => {
  try {
    const uploadedFile = req.file;
    if (uploadedFile === null || uploadedFile === undefined) {
      return res
        .json({
          error: true,
          msg: "Image upload failed, image not found ",
        })
        .status(400);
    }
    const imageUrl = `${dir}/` + uploadedFile.filename;
    // console.log("imageUrl", imageUrl);
    const buffer = fs.readFileSync(imageUrl);
    const x = await new Promise((resolve, reject) => {
      imageKit.upload(
        { file: buffer, fileName: req.file.filename },
        (err, response) => {
          if (err) reject(new Error(JSON.stringify(err)));
          resolve(response);
        }
      );
    });
    fs.unlinkSync(imageUrl);
    return res.json({ error: false, msg: "OK", url: x?.["url"] });
  } catch (e) {
    console.log(e);
  }
});
module.exports = fileRoutes;

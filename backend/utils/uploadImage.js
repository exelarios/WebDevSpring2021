const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

const s3 = new aws.S3();

s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG & PNG is valid."), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: "broncos-market",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "IMAGE_UPLOAD_TEST"});
        },
        key: function (req, file, cb) {
            const extension = file.mimetype.split("/")[1];
            cb(null, Date.now().toString() + "." + extension);
        }
    })
})

module.exports = upload;
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

const s3 = new aws.S3();

// Checks if our S3 server is connected.
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'src/api')
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, Date.now().toString() + "." + extension);
    }
});

const multerS3Config = multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        cb(null, Date.now().toString() + "." + extension);
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
});

// const upload = multer({
//     fileFilter,
//     storage: multerS3({
//         acl: "public-read",
//         s3,
//         bucket: "broncos-market",
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: "IMAGE_UPLOAD_TEST"});
//         },
//         key: function (req, file, cb) {
//             const extension = file.mimetype.split("/")[1];
//             cb(null, Date.now().toString() + "." + extension);
//         }
//     })
// })

module.exports = upload;
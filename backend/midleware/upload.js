import multer from "multer";
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let extOrginnalname = file.originalname.split(".")[0];
    cb(null, extOrginnalname + "-" + Date.now() + "." + extension);
  },
});
const uploadImages = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/apng" ||
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/pjpeg" ||
      file.mimetype == "image/svg+xml" ||
      file.mimetype == "image/tiff" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/x-icon"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type"));
    }
  },
});

const uploadMultiple = uploadImages.array("files", 10);
const uploadSingle = uploadImages.single("file");
const upload = { uploadMultiple, uploadSingle };
export default upload;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createStorage = (folderName = "general") => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, `../../public/${folderName}`);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname) || ".png";
      cb(null, uniqueSuffix + fileExtension);
    },
  });
};

const uploadProduct = multer({ storage: createStorage("products") });

const uploadUser = multer({ storage: createStorage("avatars") });

const uploadFile = (folderName = "uploads") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, `../../public/${folderName}`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname) || ".png";
      cb(null, uniqueSuffix + fileExtension);
    },
  });
  return multer({ storage: storage });
};

module.exports = {
  uploadProduct,
  uploadUser,
  uploadFile,
};

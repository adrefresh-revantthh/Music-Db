// import multer from "multer";

// // storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname === "audio") {
//       cb(null, "uploads/audio");
//     } else {
//       cb(null, "uploads/images");
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });
import multer from "multer";
import fs from "fs";
import path from "path";

// 🔥 Ensure folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 🔥 Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads";

    if (file.fieldname === "audio") {
      uploadPath = "uploads/audio";
    } else if (file.fieldname === "image") {
      uploadPath = "uploads/images";
    }

    // create folder automatically if not exists
    ensureDir(uploadPath);

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname.replace(/\s+/g, "_");

    cb(null, uniqueName);
  },
});

// 🔥 File filter (optional but recommended)
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "audio") {
    if (
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/wav" ||
      file.mimetype === "audio/mp3"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files allowed"), false);
    }
  } else if (file.fieldname === "image") {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  } else {
    cb(null, true);
  }
};

// 🔥 Export multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

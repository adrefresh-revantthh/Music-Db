// import express from "express";
// import {
//   createSong,
//   getSongs,
//   updateSong,
//   deleteSong,
//   deleteAlbum,
// } from "../controllers/songController.js";

// const router = express.Router();

// router.post("/create", createSong);
// router.get("/songs", getSongs);
// router.put("/songs/:id", updateSong);
// router.delete("/songs/:id", deleteSong);
// router.delete("/albums/:albumName", deleteAlbum);

// export default router;
import express from "express";
import {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
  deleteAlbum,
} from "../controllers/songController.js";

import { upload } from "../config/multer.js"; // ✅ correct multer

const router = express.Router();

// CREATE SONG
router.post(
  "/create",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createSong
);

// GET SONGS
router.get("/", getSongs);

// UPDATE SONG
router.put(
  "/:id",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  updateSong
);

// DELETE SONG
router.delete("/:id", deleteSong);

// DELETE ALBUM
router.delete("/album/:albumName", deleteAlbum);

export default router;

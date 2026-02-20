// import mongoose from "mongoose";

// const songSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     artist: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     album: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     audioUrl: {
//       type: String,
//       required: true,
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Song", songSchema);
import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },

    audioUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },

    duration: Number,
    genre: String,
    plays: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
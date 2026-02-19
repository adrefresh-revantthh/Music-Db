import Song from "../models/Song.js";
import fs from "fs/promises";
import path from "path";

const uploadsDir = "uploads";

/* ================= CREATE SONG ================= */
export const createSong = async (req, res) => {
  try {
    const { title, artist, album } = req.body;
console.log( title, artist, album );

    if (!title || !artist || !album) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const audioFile = req.files?.audio?.[0];
    const imageFile = req.files?.image?.[0];

    if (!audioFile || !imageFile) {
      return res.status(400).json({ message: "Audio and image required" });
    }

    const newSong = await Song.create({
      title,
      artist,
      album,
      audioUrl: audioFile.filename,
      imageUrl: imageFile.filename,
    });

    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET SONGS ================= */
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    
    
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE SONG ================= */
export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    const { title, artist, album } = req.body;

    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (album) song.album = album;

    if (req.files?.audio?.[0]) {
      await safeDelete(song.audioUrl);
      song.audioUrl = req.files.audio[0].filename;
    }

    if (req.files?.image?.[0]) {
      await safeDelete(song.imageUrl);
      song.imageUrl = req.files.image[0].filename;
    }

    await song.save();

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE SINGLE SONG ================= */
export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    await safeDelete(song.audioUrl);
    await safeDelete(song.imageUrl);

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE ENTIRE ALBUM ================= */
export const deleteAlbum = async (req, res) => {
  try {
    const albumName = decodeURIComponent(req.params.albumName);

    const songs = await Song.find({ album: albumName });

    if (!songs.length) {
      return res.status(404).json({ message: "Album not found" });
    }

    for (const song of songs) {
      await safeDelete(song.audioUrl);
      await safeDelete(song.imageUrl);
    }

    await Song.deleteMany({ album: albumName });

    res.status(200).json({
      message: `Album "${albumName}" deleted successfully`,
      deletedSongs: songs.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= SAFE FILE DELETE ================= */
const safeDelete = async (filename) => {
  try {
    if (!filename) return;

    const filePath = path.join(uploadsDir, filename);
    await fs.unlink(filePath);
  } catch (err) {
    // ignore file not found errors
  }
};

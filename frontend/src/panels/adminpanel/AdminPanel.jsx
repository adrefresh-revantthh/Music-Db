// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AdminPanel() {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [album, setAlbum] = useState("");
//   const [newAlbum, setNewAlbum] = useState("");
//   const [albums, setAlbums] = useState([]);
//   const [songs, setSongs] = useState([]);
//   const [audio, setAudio] = useState(null);
//   const [image, setImage] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   const fetchData = async () => {
//     const res = await axios.get("http://localhost:5000/api/songs");
//     setSongs(res.data);

//     const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
//     setAlbums(uniqueAlbums);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const uploadOrUpdateSong = async () => {
//     const finalAlbum = album === "new" ? newAlbum : album;

//     if (!title || !finalAlbum) {
//       alert("Title and Album are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("artist", artist);
//     formData.append("album", finalAlbum);
//     if (audio) formData.append("audio", audio);
//     if (image) formData.append("image", image);

//     try {
//       if (editingId) {
//         await axios.put(
//           `http://localhost:5000/api/songs/${editingId}`,
//           formData
//         );
//         alert("Song updated");
//       } else {
//         if (!audio || !image) {
//           alert("Audio and image required for new song");
//           return;
//         }
//         await axios.post(
//           "http://localhost:5000/api/songs/create",
//           formData
//         );
//         alert("Song uploaded");
//       }

//       resetForm();
//       fetchData();

//     } catch (error) {
//       console.error(error);
//       alert("Operation failed");
//     }
//   };

//   const deleteSong = async (id) => {
//     if (!window.confirm("Delete this song?")) return;

//     await axios.delete(`http://localhost:5000/api/songs/${id}`);
//     fetchData();
//   };

//   const deleteAlbum = async () => {
//     if (!album || album === "new") {
//       alert("Select valid album");
//       return;
//     }

//     if (!window.confirm(`Delete entire album "${album}"?`)) return;

//     await axios.delete(
//       `http://localhost:5000/api/albums/${album}`
//     );

//     fetchData();
//     setAlbum("");
//   };

//   const editSong = (song) => {
//     setEditingId(song._id);
//     setTitle(song.title);
//     setArtist(song.artist);
//     setAlbum(song.album);
//   };

//   const resetForm = () => {
//     setTitle("");
//     setArtist("");
//     setAlbum("");
//     setNewAlbum("");
//     setAudio(null);
//     setImage(null);
//     setEditingId(null);
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h1 style={styles.heading}>
//           {editingId ? "Update Song" : "Admin Upload Panel"}
//         </h1>

//         <input
//           style={styles.input}
//           placeholder="Song Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           placeholder="Artist Name"
//           value={artist}
//           onChange={(e) => setArtist(e.target.value)}
//         />

//         <select
//           style={styles.input}
//           value={album}
//           onChange={(e) => setAlbum(e.target.value)}
//         >
//           <option value="">Select Album</option>
//           {albums.map((alb, index) => (
//             <option key={index} value={alb}>
//               {alb}
//             </option>
//           ))}
//           <option value="new">+ Create New Album</option>
//         </select>

//         {album === "new" && (
//           <input
//             style={styles.input}
//             placeholder="New Album Name"
//             value={newAlbum}
//             onChange={(e) => setNewAlbum(e.target.value)}
//           />
//         )}

//         <label style={styles.fileLabel}>
//           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setAudio(e.target.files[0])}
//             style={styles.fileInput}
//           />
//         </label>

//         <label style={styles.fileLabel}>
//           {image ? `Image: ${image.name}` : "Upload Cover Image"}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             style={styles.fileInput}
//           />
//         </label>

//         <button style={styles.button} onClick={uploadOrUpdateSong}>
//           {editingId ? "Update Song" : "Upload Song"}
//         </button>

//         <button
//           style={{ ...styles.button, background: "linear-gradient(90deg, #ff7eb6, #ff4d94)" }}
//           onClick={deleteAlbum}
//         >
//           Delete Selected Album
//         </button>

//         {/* SONG LIST WITH EDIT + DELETE */}
//         <div style={{ marginTop: "20px" }}>
//           {songs.map(song => (
//             <div key={song._id} style={styles.songItem}>
//               <span>{song.title} - {song.album}</span>
//               <div>
//                 <button
//                   style={styles.smallBtn}
//                   onClick={() => editSong(song)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   style={styles.smallDelete}
//                   onClick={() => deleteSong(song._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     width: "98vw",
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//     boxSizing: "border-box",
//     fontFamily: "Segoe UI, sans-serif",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "500px",
//     background: "rgba(255,255,255,0.75)",
//     backdropFilter: "blur(12px)",
//     padding: "30px",
//     borderRadius: "25px",
//     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   heading: {
//     textAlign: "center",
//     color: "#b03060",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: "12px",
//     border: "1px solid #ffb6d9",
//     outline: "none",
//     fontSize: "14px",
//   },
//   fileLabel: {
//     background: "#ffe6f0",
//     padding: "12px",
//     borderRadius: "12px",
//     cursor: "pointer",
//     textAlign: "center",
//     color: "#b03060",
//     border: "1px solid #ffc0e0",
//   },
//   fileInput: { display: "none" },
//   button: {
//     marginTop: "10px",
//     padding: "14px",
//     borderRadius: "18px",
//     border: "none",
//     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
//     color: "white",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   songItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//     padding: "8px",
//     background: "#ffe6f0",
//     borderRadius: "10px",
//   },
//   smallBtn: {
//     marginRight: "8px",
//     padding: "5px 10px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#ff9ecb",
//     color: "white",
//     cursor: "pointer",
//   },
//   smallDelete: {
//     padding: "5px 10px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#ff4d94",
//     color: "white",
//     cursor: "pointer",
//   }
// };

// export default AdminPanel;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://music-vivid.onrender.com/api";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/`);
      setSongs(res.data);

      const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
      setAlbums(uniqueAlbums);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch songs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- CREATE / UPDATE ----------------
  // ---------------- CREATE / UPDATE ----------------
const uploadOrUpdateSong = async () => {
  const finalAlbum = album === "new" ? newAlbum : album;

  // ✅ Proper validation
  if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
    alert("Title, Artist and Album are required");
    return;
  }

  // ✅ For create → audio & image must exist
  if (!editingId && (!audio || !image)) {
    alert("Audio and Image are required for new song");
    return;
  }

  const formData = new FormData();

  formData.append("title", title.trim());
  formData.append("artist", artist.trim());
  formData.append("album", finalAlbum.trim());

  // ✅ Only append if present (important for update)
  if (audio) formData.append("audio", audio);
  if (image) formData.append("image", image);

  try {
    setLoading(true);

    if (editingId) {
      // UPDATE
      await axios.put(`${API}/${editingId}`, formData);
      alert("Song updated successfully");
    } else {
      // CREATE
      await axios.post(`${API}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Song uploaded successfully");
    }

    resetForm();
    fetchData();
  } catch (error) {
    console.error("Upload error:", error.response?.data || error);
    alert(error.response?.data?.message || "Upload failed");
  } finally {
    setLoading(false);
  }
};


  // ---------------- DELETE SONG ----------------
  const deleteSong = async (id) => {
    if (!window.confirm("Delete this song?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      alert("Song deleted");
      fetchData();
    } catch (error) {
      console.error("Delete song error:", error.response?.data || error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // ---------------- DELETE ALBUM ----------------
  const deleteAlbum = async () => {
    if (!album || album === "new") {
      alert("Select valid album");
      return;
    }

    if (!window.confirm(`Delete entire album "${album}"?`)) return;

    try {
      await axios.delete(
        `${API}/albums/${encodeURIComponent(album)}`
      );
      alert("Album deleted");
      fetchData();
      setAlbum("");
    } catch (error) {
      console.error("Delete album error:", error.response?.data || error);
      alert(error.response?.data?.message || "Album delete failed");
    }
  };

  // ---------------- EDIT MODE ----------------
  const editSong = (song) => {
    setEditingId(song._id);
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
  };

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setAlbum("");
    setNewAlbum("");
    setAudio(null);
    setImage(null);
    setEditingId(null);
  };

  // ---------------- UI ----------------
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          {editingId ? "Update Song" : "Admin Upload Panel"}
        </h1>

        <input
          style={styles.input}
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <select
          style={styles.input}
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          <option value="">Select Album</option>
          {albums.map((alb, index) => (
            <option key={index} value={alb}>
              {alb}
            </option>
          ))}
          <option value="new">+ Create New Album</option>
        </select>

        {album === "new" && (
          <input
            style={styles.input}
            placeholder="New Album Name"
            value={newAlbum}
            onChange={(e) => setNewAlbum(e.target.value)}
          />
        )}

        <label style={styles.fileLabel}>
          {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            style={styles.fileInput}
          />
        </label>

        <label style={styles.fileLabel}>
          {image ? `Image: ${image.name}` : "Upload Cover Image"}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.fileInput}
          />
        </label>

        <button
          style={styles.button}
          onClick={uploadOrUpdateSong}
          disabled={loading}
        >
          {editingId ? "Update Song" : "Upload Song"}
        </button>

        <button
          style={{ ...styles.button, background: "#ff4d94" }}
          onClick={deleteAlbum}
        >
          Delete Selected Album
        </button>

        <div style={{ marginTop: "20px" }}>
          {songs.map(song => (
            <div key={song._id} style={styles.songItem}>
              <span>{song.title} - {song.album}</span>
              <div>
                <button
                  style={styles.smallBtn}
                  onClick={() => editSong(song)}
                >
                  Edit
                </button>
                <button
                  style={styles.smallDelete}
                  onClick={() => deleteSong(song._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "98vw",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: { textAlign: "center", color: "#b03060" },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ffb6d9",
    fontSize: "14px",
  },
  fileLabel: {
    background: "#ffe6f0",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "center",
    color: "#b03060",
    border: "1px solid #ffc0e0",
  },
  fileInput: { display: "none" },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  songItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    padding: "8px",
    background: "#ffe6f0",
    borderRadius: "10px",
  },
  smallBtn: {
    marginRight: "8px",
    padding: "5px 10px",
    borderRadius: "8px",
    border: "none",
    background: "#ff9ecb",
    color: "white",
    cursor: "pointer",
  },
  smallDelete: {
    padding: "5px 10px",
    borderRadius: "8px",
    border: "none",
    background: "#ff4d94",
    color: "white",
    cursor: "pointer",
  }
};

export default AdminPanel;

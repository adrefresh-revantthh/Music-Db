import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function UserPanel() {
  const [songs, setSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [clickEffect, setClickEffect] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/")
      .then(res => setSongs(res.data));
  }, []);
console.log(songs);

  const albums = songs.reduce((acc, song) => {
    if (!acc[song.album]) acc[song.album] = [];
    acc[song.album].push(song);
    return acc;
  }, {});

  const albumNames = Object.keys(albums);
  const currentSongs = selectedAlbum ? albums[selectedAlbum] : [];
  const currentSong = currentSongs[currentIndex];

  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (!currentSongs.length) return;

    if (isShuffle) {
      const random = Math.floor(Math.random() * currentSongs.length);
      setCurrentIndex(random);
    } else {
      setCurrentIndex((prev) => (prev + 1) % currentSongs.length);
    }

    setIsPlaying(true);
  };

  const prevSong = () => {
    if (!currentSongs.length) return;
    setCurrentIndex((prev) =>
      (prev - 1 + currentSongs.length) % currentSongs.length
    );
    setIsPlaying(true);
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const half = rect.width / 2;

    if (clickX < half) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10
      );
      setClickEffect("-10s");
    } else {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 10
      );
      setClickEffect("+10s");
    }

    setTimeout(() => setClickEffect(null), 800);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        {/* <h1>PinkWave Music</h1> */}
      </div>

      {!selectedAlbum && (
        <div style={styles.albumGrid}>
          {albumNames.map((album) => (
            <div
              key={album}
              style={styles.albumCard}
              onClick={() => {
                setSelectedAlbum(album);
                setCurrentIndex(0);
              }}
            >
              <h3>{album}</h3>
              <p>{albums[album].length} Tracks</p>
            </div>
          ))}
        </div>
      )}

      {selectedAlbum && (
        <div style={styles.content}>
          <button
            style={styles.backButton}
            onClick={() => setSelectedAlbum(null)}
          >
            ← Back
          </button>

          <div style={styles.mainSection}>
            <div style={styles.songList}>
              {currentSongs.map((song, index) => (
                <div
                  key={song._id}
                  style={{
                    ...styles.songItem,
                    background:
                      index === currentIndex
                        ? "rgba(255,105,180,0.15)"
                        : "transparent",
                  }}
                  onClick={() => playSong(index)}
                >
                  <span>{song.title}</span>
                  <span style={{ opacity: 0.6 }}>{song.artist}</span>
                </div>
              ))}
            </div>

            {currentSong && (
              <div style={styles.player}>
                <div style={styles.imageWrapper}>
                  <img
                    src={`http://localhost:5000/uploads/images/${currentSong.imageUrl}`}
                    alt=""
                    style={styles.image}
                    onClick={handleImageClick}
                  />
                  {clickEffect && (
                    <div style={styles.clickIndicator}>
                      {clickEffect}
                    </div>
                  )}
                </div>

                <h2>{currentSong.title}</h2>
                <p style={{ opacity: 0.6 }}>{currentSong.artist}</p>

                <audio
                  ref={audioRef}
                  src={`http://localhost:5000/uploads/audio/${currentSong.audioUrl}`}
                  onTimeUpdate={() =>
                    setCurrentTime(audioRef.current.currentTime)
                  }
                  onLoadedMetadata={() =>
                    setDuration(audioRef.current.duration)
                  }
                  onEnded={handleEnded}
                />

                {/* Progress */}
                <div style={styles.progressWrapper}>
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    style={styles.range}
                  />
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                  <button style={styles.controlBtn} onClick={prevSong}>
                    ⏮
                  </button>

                  <button style={styles.playBtn} onClick={togglePlay}>
                    {isPlaying ? "Pause" : "Play"}
                  </button>

                  <button style={styles.controlBtn} onClick={nextSong}>
                    ⏭
                  </button>
                </div>

                <div style={styles.extraControls}>
                  <button
                    style={{
                      ...styles.smallBtn,
                      background: isShuffle ? "#ff7eb9" : "#ffd6e7",
                    }}
                    onClick={() => setIsShuffle(!isShuffle)}
                  >
                    Shuffle
                  </button>

                  <button
                    style={{
                      ...styles.smallBtn,
                      background: isRepeat ? "#ff7eb9" : "#ffd6e7",
                    }}
                    onClick={() => setIsRepeat(!isRepeat)}
                  >
                    Repeat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    width: "98vw",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#fff0f6,#ffd6e7,#ffc2dc)",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: { padding: 20, textAlign: "center" },
  albumGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 20,
    padding: 20,
  },
  albumCard: {
    background: "rgba(255,255,255,0.7)",
    padding: 20,
    borderRadius: 16,
    cursor: "pointer",
    textAlign: "center",
  },
  content: { padding: 20 },
  mainSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: 30,
  },
  songList: {
    flex: "1 1 300px",
    background: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    padding: 15,
    maxHeight: 400,
    overflowY: "auto",
  },
  songItem: {
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  player: {
    flex: "1 1 300px",
    background: "rgba(255,255,255,0.8)",
    padding: 20,
    borderRadius: 20,
    textAlign: "center",
  },
  imageWrapper: { position: "relative" },
  image: {
    width: "100%",
    maxWidth: 250,
    borderRadius: 16,
    cursor: "pointer",
  },
  clickIndicator: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "rgba(255,105,180,0.8)",
    color: "white",
    padding: "8px 12px",
    borderRadius: 20,
  },
  progressWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  range: {
    flex: 1,
    accentColor: "#ff7eb9",
  },
  controls: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },
  controlBtn: {
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "#ff99c8",
    cursor: "pointer",
  },
  playBtn: {
    padding: "12px 20px",
    borderRadius: 16,
    border: "none",
    background: "#ff4fa3",
    color: "white",
    cursor: "pointer",
  },
  extraControls: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  smallBtn: {
    padding: "6px 12px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
  },
  backButton: {
    marginBottom: 15,
    padding: "8px 14px",
    borderRadius: 10,
    border: "none",
    background: "#ffb3d9",
    cursor: "pointer",
  },
};

export default UserPanel;

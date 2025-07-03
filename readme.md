# 🎵 Spotify Clone

A fully responsive and dynamic music player web app that mimics the core functionality and feel of Spotify. Built using **HTML, CSS, and JavaScript**, this project allows users to browse dynamically detected albums, play songs, and control playback — all from a local directory structure.

---

## 🚀 Features

- 🎧 **Custom Audio Player**  
  Built from scratch with play/pause, next/previous, seek bar, and volume/mute control.

- 📁 **Dynamic Album Detection**  
  Automatically detects folders inside `/songs/`, reads metadata from `info.json`, and displays albums dynamically without hardcoding.

- 📄 **Metadata-Based UI**  
  Album titles and descriptions are read from JSON files for full flexibility.

- 🧠 **First-Song Autoplay**  
  When a user selects an album, the first song starts playing automatically.

- ⚡ **No Preloading**  
  Albums and songs are only loaded when the user selects an album, keeping the app lightweight.

- 📱 **Responsive Design**  
  Works across desktops, tablets, and mobile phones using flexbox and media queries.

- 💾 **Local Backend Simulation**  
  Uses the local folder structure to simulate backend-like behavior without a database or server-side code.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Assets:** Local MP3 files, JSON metadata
- **Tools:** VS Code, Git, GitHub

---

## 📁 Folder Structure

spotify-clone/
│
├── css/
│ ├── style.css
│ └── utility.css
├── js/
│ └── script.js
├── img/
│ └── *.svg / cover.jpg
├── songs/
│ ├── Album1/
│ │ ├── cover.jpg
│ │ ├── info.json
│ │ └── *.mp3
│ ├── Album2/
│ │ └── ...
├── index.html
└── README.md


---

## 🧪 How It Works

- `displayAlbums()` scans `/songs/` using `fetch()`, identifies folders, and reads `info.json` for title/description.
- Album cards are dynamically created in the UI.
- On clicking an album, `getSongs()` fetches all `.mp3` files inside it.
- The first song is autoplayed using `playMusic()`.
- Seek, volume, and control bar are updated in real-time.




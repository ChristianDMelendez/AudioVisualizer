# 🎧 Spotify AudioVisualizer Blob

A **3D animated blob** that **reacts to your currently playing Spotify track** using real beat data, audio features, and energy levels — even while you’re wearing headphones. Powered by the **Spotify Web API**, `Three.js`, and custom GLSL shaders.

![Visualizer Preview](https://christiandmelendez.github.io/AudioVisualizer/preview.gif) <!-- optional if you upload a demo gif -->

---

## 🚀 Live Demo
👉 [Launch Visualizer](https://christiandmelendez.github.io/AudioVisualizer/)

---

## 🟢 Features

✅ Spotify OAuth Login  
✅ Real-time Beat Pulse Sync  
✅ Energy-based Blob Intensity  
✅ Album Art Glow Background  
✅ Headphone Friendly (No mic needed)  
✅ Hosted Free on GitHub Pages  

---

## 🧠 How It Works

1. You log in with Spotify (Premium required).
2. The app grabs your currently playing track.
3. It fetches the **beat map + energy level** from Spotify's Web API.
4. A GLSL shader animates the blob in sync with the beats.
5. Your album art becomes a glowing, blurred background 🎨

---

## 🧪 Built With

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Three.js](https://threejs.org/)
- GLSL / WebGL
- HTML + JS (hosted with GitHub Pages)

---

## 🛠 Setup Instructions

1. Clone this repo or fork it.
2. Replace the `Client ID` in `index.html` with your own (from Spotify Dev Dashboard).
3. Add your authorized **Redirect URI** in Spotify settings:

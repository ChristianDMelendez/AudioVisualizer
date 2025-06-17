const CLIENT_ID = 'a652cb1bc4381d4da9f5eaf90f9d71b40';
const REDIRECT_URI = 'https://christiandmelendez.github.io/AudioVisualizer/callback.html';
const SCOPES = 'user-read-playback-state user-read-currently-playing';

function redirectToSpotifyAuth() {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  window.location.href = url;
}

function fetchSpotifyData(token) {
  fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { 'Authorization': 'Bearer ' + token }
  }).then(res => {
    if (!res.ok || res.status === 204) throw new Error("No track currently playing");
    return res.json();
  }).then(data => {
    const track = data.item.name;
    const artist = data.item.artists.map(a => a.name).join(", ");
    document.getElementById("track-info").textContent = `${track} – ${artist}`;

    return fetch('https://api.spotify.com/v1/audio-features/' + data.item.id, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
  }).then(res => res.json()).then(features => {
    initVisualizer(features.energy || 0.6);
  }).catch(err => {
    console.warn("Spotify fetch failed:", err);
    initVisualizer(0.5);
  });
}

(function init() {
  const token = localStorage.getItem("spotify_access_token");
  const loginBtn = document.getElementById("login-btn");

  if (!token) {
    loginBtn.style.display = 'block';
    loginBtn.addEventListener("click", redirectToSpotifyAuth);
  } else {
    loginBtn.style.display = 'none';
    fetchSpotifyData(token);
  }
})();

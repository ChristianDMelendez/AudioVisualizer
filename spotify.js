const BACKEND_URL = 'https://audiovisualizer-62xe.onrender.com';

function redirectToSpotifyAuth() {
  // Route login through your backend, not directly to Spotify
  window.location.href = `${BACKEND_URL}/login`;
}

function fetchSpotifyData(token) {
  fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => {
    if (!res.ok || res.status === 204) throw new Error("No track currently playing");
    return res.json();
  }).then(data => {
    const track = data.item.name;
    const artist = data.item.artists.map(a => a.name).join(", ");
    document.getElementById("track-info").textContent = `${track} – ${artist}`;

    return fetch('https://api.spotify.com/v1/audio-features/' + data.item.id, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }).then(res => res.json()).then(features => {
    initVisualizer(features.energy || 0.6);
  }).catch(err => {
    console.warn("Spotify fetch failed:", err);
    initVisualizer(0.5);
  });
}

(function init() {
  const loginBtn = document.getElementById("login-btn");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("access_token");

  if (token) {
    localStorage.setItem("spotify_access_token", token);
    window.history.replaceState({}, document.title, window.location.pathname); // Clean up the URL
  }

  const storedToken = localStorage.getItem("spotify_access_token");

  if (!storedToken) {
    loginBtn.style.display = 'block';
    loginBtn.addEventListener("click", redirectToSpotifyAuth);
  } else {
    loginBtn.style.display = 'none';
    fetchSpotifyData(storedToken);
  }
})();

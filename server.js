const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());

app.get('/login', (req, res) => {
  const scope = 'user-read-playback-state user-read-currently-playing';
  const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
  const url = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scope)}`;
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const creds = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        'Authorization': `Basic ${creds}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI
      }
    });

    const access_token = response.data.access_token;
    res.redirect(`https://christiandmelendez.github.io/AudioVisualizer/?access_token=${access_token}`);
  } catch (err) {
    console.error('Error exchanging token:', err.response?.data || err.message);
    res.status(500).send('Token exchange failed.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('./refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirect: 'localhost:3000',
        clientId: 'a48fc48de6f042adaae96306d3875be0',
        clientSecret: '3bc63cea8ec74d11800505ef1a674506',
        refreshToken
    })
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
spotifyApi.refreshAccessToken().then(
    data => {
      console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }).catch(() => {
        res.status(400)
    })
    function(err) {
      console.log('Could not refresh access token', err);
    }
  );
  
})

// hard coding client ID's
// to test login page before moving to an env file
app.post('/login',(req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirect: 'localhost:3000',
        clientId: 'a48fc48de6f042adaae96306d3875be0',
        clientSecret: '3bc63cea8ec74d11800505ef1a674506',
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data .body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(() => {
        res.status(400)
    })
})


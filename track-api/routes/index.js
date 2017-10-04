var express = require('express');
var cors = require('cors');
var Spotify = require('spotify-web-api-node');

const clientID = '0a3fd5f4c0fe442d86b8a8d1dfe59761';
const secretID = '6637b5c96d7847ffaf61247c336ebf1b';
const redirect = 'http://localhost:3010/authorize';
const STATE_KEY = 'spotify_auth_state';

var scopes = ['user-read-private', 'user-read-email'];

const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);


var router = express.Router();
var spotifyApi = new Spotify({
  clientId: clientID,
  clientSecret: secretID,
  redirectUri: redirect
});

/* GET home page. */

router.get('/login', cors(), function(req, res, next) {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.json(spotifyApi.createAuthorizeURL(scopes, state));
})

router.get('/authorize', function(req, res, next) {
  console.log("authorizing");
  var redirecting = '';
  const { code, state} = req.query;
  spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  res.redirect('http://localhost:3000/user');
});

router.get('/test', function(req, res, next) {
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20})
  .then(function(data) {
    res.json(data.body);
  }, function(err) {
    console.error(err);
  });
});

router.get('/api/user', function(req, res, next) {
  res.json(data);
});

router.get('/api/playlists', function(req, res, next) {
  spotifyApi.getUserPlaylists()
    .then(function(data) {
      res.json(data.body);
    },function(err) {
      console.log('Something went wrong with retrieving playlists!', err);
    });
});

router.get('/api/playlists/:id', function(req, res, next) {
  const id = req.params.id;
  spotifyApi.getPlaylistTracks('khuongtiet', id)
    .then(function(data) {
      res.json(data.body);
    },function(err) {
      console.log('Something went wrong with retrieving playlist tracks!', err);
    });
});

router.get('/api/albums/:id', function(req, res, next) {
  const id = req.params.id;
  spotifyApi.getAlbum(id)
    .then(function(data) {
      res.json(data.body);
    }, function(err) {
      console.log('Something went wrong with retrieving albums!', err);
    })
})

module.exports = router;

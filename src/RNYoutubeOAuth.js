var React = require('react-native');
var shittyQs = require('shitty-qs');

var {Linking} = React;

function RNYoutubeOAuth(opts) {
  Linking.addEventListener('url', handleUrl);

  function handleUrl(event) {}

  Linking.openURL(
    [
      `https://accounts.google.com/b/0/DelegateAccountSelector`,
      `?continue=https://accounts.google.com/o/oauth2/v2/auth`,
      `?redirect_uri%3D${opts.redirect_uri}`,
      `%26prompt%3Dconsent`,
      `%26response_type%3Dcode`,
      `%26client_id%3D${opts.client_id}`,
      `%26scope%3Dhttps://www.googleapis.com/auth/youtube`,
      `%26access_type%3Doffline`,
      `%26state%3D${opts.state}`,
    ].join(''),
  );
}

module.exports = RNYoutubeOAuth;

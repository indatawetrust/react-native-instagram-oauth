var React = require('react-native');
var shittyQs = require('shitty-qs');

var {Linking} = React;

function RNYoutubeOAuth(client_id, redirect_uri, callback) {
  Linking.addEventListener('url', handleUrl);

  function handleUrl(event) {
    var [, query_string] = event.url.match(/\#(.*)/);
    var query = shittyQs(query_string);
    if (query.access_token !== undefined) {
      callback(null, query.access_token);
    } else {
      callback(new Error('Oauth2 security error'));
    }
    Linking.removeEventListener('url', handleUrl);
  }

  Linking.openURL(
    [
      `https://accounts.google.com/b/0/DelegateAccountSelector`,
      `?continue=https://accounts.google.com/o/oauth2/v2/auth`,
      `?redirect_uri%3D${redirect_uri}`,
      `%26prompt%3Dconsent`,
      `%26response_type%3Dcode`,
      `%26client_id%3D${client_id}`,
      `%26scope%3Dhttps://www.googleapis.com/auth/youtube`,
      `%26access_type%3Doffline`,
    ].join(''),
  );
}

module.exports = RNYoutubeOAuth;

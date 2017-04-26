var React = require('react-native');
var shittyQs = require('shitty-qs');

var {Linking} = React;
import DeepLinking from 'react-native-deep-linking';

function RNYoutubeOAuth(opts, callback) {
  function handleUrl({url}) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  DeepLinking.addScheme(opts.scheme);

  Linking.addEventListener('url', handleUrl);

  DeepLinking.addRoute('/code/:code', ({code}) => {
    callback(code)
  });

  Linking.getInitialURL().then(url => {
    if (url) {
      Linking.openURL(url);
    }
  });

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

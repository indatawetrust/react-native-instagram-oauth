# react-native-youtube-oauth
react-native interface to login to youtube (iOS)

## Getting started

1. `npm install react-native-youtube-oauth@latest --save`
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. Go to `node_modules/react-native/Libraries/LinkingIOS/RCTLinking.xcodeproj` ➜ and add `RCTLinking.xcodeproj`
4. In XCode, in the project navigator, select your project. Add `libRCTLinking.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
5. Click `RCTLinking.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for `Header Search Paths` and make sure it contains both `$(SRCROOT)/../../react-native/React` and `$(SRCROOT)/../../../React` - mark both as `recursive`.
6. Run your project (`Cmd+R`)
7. Register a new client on youtube itself => https://console.developers.google.com/apis/credentials/oauthclient?project={project_name}
![Alt Text](http://i.imgur.com/LeyB4zO.png)


## Usage

```javascript
import RNYoutubeOAuth from 'react-native-youtube-oauth';

const youtubeConfig = {
 client_id: '<YOUR CLIENT ID>',
 redirect_url: '<YOUR REDIRECT URL>'
};

RNYoutubeOAuth(youtubeConfig, (err) => {

});
```

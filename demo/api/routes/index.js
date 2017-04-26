var router = require('koa-router')();

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URL,
);

var scopes = ['https://www.googleapis.com/auth/youtube'];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

router.get('handle_youtube_callback', async function(ctx, next) {
  ctx.redirect(`app://code/${encodeURIComponent(ctx.query.code)}`)
});

router.get('videos', async function(ctx, next) {
  ctx.body = await new Promise(resolve => {
    oauth2Client.getToken(ctx.query.code, function(err, tokens) {
      if (!err) {
        oauth2Client.setCredentials(tokens);

        var youtube = google.youtube({
          version: 'v3',
          auth: oauth2Client,
        });

        youtube.channels.list(
          {
            part: 'contentDetails',
            mine: true,
            maxResults: 50,
          },
          (err, response) => {
            var channelPlaylistId =
              response.items[0].contentDetails.relatedPlaylists.uploads;

            youtube.playlistItems.list(
              {
                part: 'snippet',
                playlistId: channelPlaylistId,
                maxResults: 50,
              },
              function(err, _response) {
                const videos = _response.items;

                resolve(videos)
              },
            );
          },
        );
      }
    });
  })
});

module.exports = router;

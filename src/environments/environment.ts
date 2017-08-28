// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  spotifyConfig : {
    clientId: '4591ffb8ffe34d61ad696a41881914c5',
	redirectUri: 'http://localhost:4200/callback',
	//authToken: localStorage.getItem('angular2-spotify-token'),
	scope: 'playlist-read-private playlist-read-collaborative user-library-read user-read-private'
  }
};

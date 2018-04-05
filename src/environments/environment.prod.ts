export const environment = {
  production: true,
  spotifyConfig : {
    clientId: '4591ffb8ffe34d61ad696a41881914c5',
	redirectUri: 'http//guess-the-song.madeby.crenzin.de/callback',
	//authToken: localStorage.getItem('angular2-spotify-token'),
	scope: 'playlist-read-private playlist-read-collaborative user-library-read user-read-private'
  }
};

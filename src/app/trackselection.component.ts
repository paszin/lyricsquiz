import { Component, OnInit } from '@angular/core';
import {SpotifyService} from './spotify.service';
import {Router} from '@angular/router';

import { Track } from './track';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'trackselection',
  templateUrl: './trackselection.html',
  providers: [  SpotifyService,{ 
				provide: "SpotifyConfig" , 
					useValue: {
						clientId: '4591ffb8ffe34d61ad696a41881914c5',
						redirectUri: 'http://localhost:4200/callback',
						authToken: localStorage.getItem('angular2-spotify-token'),
						scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private'
					}
				}]
})
export class TrackselectionComponent implements OnInit {
	aTrack: Track;
	tracks: Track[] = [];
    ngOnInit(): void {
        console.log("init trackselection");
		this.getTracks();
		
		
    }
	
	
	constructor(private spotifyService: SpotifyService, private router: Router) { }
	
	getTracks(): void {
		var self = this;
		this.spotifyService.getSavedUserTracks().toPromise()
			.then(function(resp) {
			resp.items.forEach(function(t) {
				var track = t.track;
				
				self.tracks.push({title: track.name, artist: track.artists[0].name, album: track.album.name, preview_url: track.preview_url, album_cover_url: track.album.images[0].url, checked: false});
			});
		});
		//this.spotifyService.getCurrentUserPlaylists().toPromise()
    	//	.then(function(resp) {debugger;});
	}
	
	next(): void {
		localStorage.setItem('tracks', JSON.stringify(this.tracks));
		this.router.navigateByUrl('/quiz');
	}
	
}

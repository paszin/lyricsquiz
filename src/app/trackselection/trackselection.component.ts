import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {Router} from '@angular/router';

import { environment } from '../../environments/environment';

import { Track } from '../track';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'trackselection',
  templateUrl: './trackselection.component.html',
  providers: [  SpotifyService,{ 
				provide: "SpotifyConfig" , 
					useValue: {
						clientId: environment.spotifyConfig.clientId,
						redirectUri: environment.spotifyConfig.redirectUri,
						authToken: localStorage.getItem('angular2-spotify-token'),
						scope: environment.spotifyConfig.scope
					}
				}]
})
export class TrackselectionComponent implements OnInit {
	aTrack: Track;
	tracks: Track[] = [];
    ngOnInit(): void {
        console.log("init trackselection");
		this.spotifyService.config.authToken = localStorage.getItem('angular2-spotify-token');
		this.getTracks();
		
		
    }
	
	
	constructor(private spotifyService: SpotifyService, private router: Router) { }
	
	getTracks(): void {
		var self = this;
		this.spotifyService.getSavedUserTracks({offset: this.tracks.length}).toPromise()
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
		localStorage.setItem('tracks', JSON.stringify(this.tracks.filter((t) => t.checked)));
		this.router.navigateByUrl('/quiz');
	}
	
	
	
}

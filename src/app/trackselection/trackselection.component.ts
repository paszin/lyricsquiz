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
	selectedTracks: number = 0;
	albums = [];
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
	
	getAlbums(): void {
		function mapTrack(track, album) {
	return {title: track.name, artist: track.artists[0].name, album: album, preview_url: track.preview_url, checked: true};
	
}
		var self = this;
		this.spotifyService.getSavedUserAlbums({offset: this.albums.length}).toPromise()
			.then(function(resp) {
			resp.items.forEach(function(a) {
				var album = a.album;
				self.albums.push({name: album.name, album_cover_url: album.images[0].url, artist: album.artists[0].name, tracks: album.tracks.items.map(mapTrack, {album: album.name}), checked: false});
			});
		});
	}
	
	updateCounter(checked) {
		//checked is not updated yet (checked=true --> -1)
		this.selectedTracks += checked ? -1 : 1;
	}
	
	updateCounterAlbum(album) {
		//checked is not updated yet (checked=true --> -1)
		//update checkmarks in album tab?
		this.selectedTracks += album.checked ? -1*album.tracks.length : 1*album.tracks.length;
	}
	
	next(): void {
		var selectedTracks = this.tracks.filter((t) => t.checked);
		this.albums.filter((a) => a.checked).forEach(function(album) {
			selectedTracks = selectedTracks.concat(album.tracks);
		});
		
		localStorage.setItem('tracks', JSON.stringify(selectedTracks));
		this.router.navigateByUrl('/quiz');
	}
	

}

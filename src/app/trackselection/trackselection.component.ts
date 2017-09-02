import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {Router} from '@angular/router';

import series from 'async/series';
import parallel from 'async/parallel';
import each from 'async/each';

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
	tracks: Track[] = [];
	albums = [];
	playlists = [];
	selectedTracks: number = 0;
	
    ngOnInit(): void {
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
		
	}
	
	getAlbums(): void {
		
		function mapTrack(track) {
			return {title: track.name, artist: track.artists[0].name, album: this.albumName, album_cover_url: this.album_cover_url, preview_url: track.preview_url, checked: true};
		}
		
		var self = this;
		this.spotifyService.getSavedUserAlbums({offset: this.albums.length}).toPromise()
			.then(function(resp) {
			resp.items.forEach(function(a) {
				var album = a.album;
				self.albums.push({name: album.name, album_cover_url: album.images[0].url, artist: album.artists[0].name, tracks: album.tracks.items.map(mapTrack, {albumName: album.name, album_cover_url: album.images[0].url}), checked: false});
			});
		});
	}
	
	getPlaylists() : void {
		var self = this;
		this.spotifyService.getCurrentUserPlaylists({offset: this.playlists.length}).toPromise()
			.then(function(resp) {
				resp.items.forEach(function(playlist) {
					self.playlists.push({name: playlist.name, cover_url: playlist.images[0].url, owner: playlist.owner.display_name || playlist.owner.id, track_count: playlist.tracks.total, tracks_url: playlist.tracks.href, checked: false, id: playlist.id, user_id : playlist.owner.id});
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
	
	updateCounterPlaylist(playlist) {
		//checked is not updated yet (checked=true --> -1)
		this.selectedTracks += playlist.checked ? -1*playlist.tracks_count : 1*playlist.track_count;
	}
	
	next(): void {
		var self = this;
		
		var selectedTracks = [];
		parallel([
			function addFromTracks(cb) {
				cb(null, self.tracks.filter((t) => t.checked));
			},
			function addFromAlbums(cb) {
				var selection = [];
				self.albums.filter((a) => a.checked).forEach(function(album) {
					selection = selection.concat(album.tracks);
				});
				cb(null, selection);
			},
			function addFromPlaylists(cb) {
				var selection = [];
				each(self.playlists.filter((p) => p.checked), 
						   function handlePlaylist(playlist, cb) {
								self.spotifyService.getPlaylistTracks(playlist.user_id, playlist.id, {limit: 50})
								.toPromise()
								.then(function(resp) {
									resp.items.forEach(function(t) {
										var track = t.track;
										selection.push({title: track.name, artist: track.artists[0].name, album: track.album.name, preview_url: track.preview_url, album_cover_url: track.album.images[0].url});
									});
									cb(null);
								});
							},
						  	function (err) {
					cb(null, selection);
				});
			}
		], function(err, result) {
			var tracks = result[0].concat(result[1]).concat(result[2]);
			localStorage.setItem('tracks', JSON.stringify(tracks));
			self.router.navigateByUrl('/quiz');
		});
		
		
		
		
		
		
	}
	

}

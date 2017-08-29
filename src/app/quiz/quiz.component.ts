import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';
import { LyricsService } from '../lyrics.service';

import { Track } from '../track';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'quiz',
  templateUrl: 'quiz.component.html',
  providers: [ LyricsService, SpotifyService,{ 
				provide: "SpotifyConfig" , 
					useValue: {
						clientId: environment.spotifyConfig.clientId,
						redirectUri: environment.spotifyConfig.redirectUri,
						authToken: localStorage.getItem('angular2-spotify-token'),
						scope: environment.spotifyConfig.scope
					}
				}]
})
export class QuizComponent implements OnInit {
	aTrack: Track;
	part: string;
	parts : string[] = [];
	startIndex: number;
	lines: string[];
	showSolution = false;
	tracks: Track[] = JSON.parse(localStorage.getItem('tracks'));
    ngOnInit(): void {
        console.log("init trackselection");
		this.next();
		
		
    }
	
	
	constructor(private spotifyService: SpotifyService, private lyricsService: LyricsService) { }
	
	
	next(): void {
		this.showSolution = false;
		this.parts = [];
		this.startIndex = null;
		this.lines = null;
		let self = this;
		var track = this.tracks.splice(Math.floor(Math.random()*this.tracks.length), 1)[0];
		this.aTrack = track;
		this.lyricsService.getServerLyrics(track.artist, track.title).then(function(text) {
			console.log(text);
			self.lines = text.split("\n").filter(l => (l.length > 1));
			var part : string = "";
			var retries : number = 0;
			while ((part.length <= 30) && retries < self.lines.length/2) {
				retries = retries + 1;
				self.startIndex = Math.trunc(Math.random()*self.lines.length);
				part = self.lines[self.startIndex];
				if (part.length > 30) {
					self.parts = [part];
					break;
				}
			}
			if (retries >= 5) {
				console.log("failed", track);
				this.next();
			}
		});
	}
	
	tipp() : void {
		this.parts.push(this.lines[this.startIndex+this.parts.length]);
	}
	
	solve() : void {
		this.showSolution = true;
	}
	
}

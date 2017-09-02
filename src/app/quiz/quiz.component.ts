import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';
import { LyricsService } from '../lyrics.service';

import { Track } from '../track';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: ['./quiz.component.css'],
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
	audio;
	part: string;
	parts : string[] = [];
	startIndex: number;
	lines: string[];
	showSolution = false;
	counter: number = 0;
	counterRemaining: number = 0;
	counterRight: number = 0;
	tracks: Track[] = JSON.parse(localStorage.getItem('tracks'));
    ngOnInit(): void {
        this.counterRemaining = this.tracks.length;
		this.next();

    }
	
	
	constructor(private spotifyService: SpotifyService, private lyricsService: LyricsService) { }
	
	
	next(): void {
		this.showSolution = false;
		
		this.parts = [];
		this.startIndex = null;
		this.lines = null;
		this.counter++;
		
		if (this.audio) {
			this.pauseSample();
		}
		let self = this;
		var track = this.tracks.splice(Math.floor(Math.random()*this.tracks.length), 1)[0];
		this.counterRemaining = this.tracks.length;
		this.aTrack = track;
		this.lyricsService.getServerLyrics(track.artist, track.title).then(function(text) {
			if (text == null) {
				console.log("now lyrics found for", track.title);
				self.counter--;
				self.next();
				return
			}
			self.lines = text.split("\n").filter(l => (l.length > 1));
			var part : string = "";
			var retries : number = 0;
			while ((part.length <= 20) && retries < self.lines.length/2) {
				retries = retries + 1;
				self.startIndex = Math.trunc(Math.random()*self.lines.length);
				part = self.lines[self.startIndex];
				if (part.length > 20) {
					self.parts = [part];
					break;
				}
			}
			if (retries >= self.lines.length/2) {
				console.log("failed to parse lyrics", track);
				self.counter--;
				self.next();
			}
		});
	}
	
	rightAnswerAndNext() : void {
		this.counterRight++;
		this.next();
	}
	
	notMyFaultAndNext() : void {
		this.counter--;
		this.next();
	}
	
	tipp() : void {
		this.parts.push(this.lines[this.startIndex+this.parts.length]);
	}
	
	solve() : void {
		this.showSolution = true;
	}
	
	playPauseSample() : void {
		if (this.audio) {
			this.pauseSample();
			return
		}
		this.playSample();
	}
	
	playSample() : void {
		
		this.audio = new Audio(this.aTrack.preview_url);
		this.audio.play();
	}
	
	pauseSample() : void {
		this.audio.pause();
		this.audio = null;
	}
	
}

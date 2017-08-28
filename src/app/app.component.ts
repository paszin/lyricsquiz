import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from './spotify.service';
import { LyricsService } from './lyrics.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LyricsService,
			 SpotifyService,{ 
				provide: "SpotifyConfig" , 
					useValue: {
						clientId: '4591ffb8ffe34d61ad696a41881914c5',
						redirectUri: 'http://localhost:4200/callback',
						authToken: localStorage.getItem('angular2-spotify-token'),
						scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private'
					}
				}]
})
export class AppComponent implements OnInit {
	loggedIn: boolean = !!localStorage.getItem('angular2-spotify-token');
	
    ngOnInit(): void {
		window.addEventListener('storage', this.storageChanged.bind(this), false);
		//this.lyricsService.getServerLyrics("Alligatoah", "Willst DU").then(function(text) {console.log(text);});
		
    }
	
	
	storageChanged(e): void {
        this.loggedIn = (e.key === 'angular2-spotify-token' && e.newValue);
		this.router.navigateByUrl('/trackselection');
      };
     
    constructor(private lyricsService: LyricsService, private spotifyService: SpotifyService, private router: Router) { }


}

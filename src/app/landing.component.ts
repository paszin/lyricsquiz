import { Component, OnInit } from '@angular/core';
import {SpotifyService} from './spotify.service';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'landing',
  templateUrl: './landing.html',
  providers: [ SpotifyService,{ 
				provide: "SpotifyConfig" , 
					useValue: {
						clientId: '4591ffb8ffe34d61ad696a41881914c5',
						redirectUri: 'http://localhost:4200/callback',
						authToken: localStorage.getItem('angular2-spotify-token'),
						scope: 'playlist-read-private playlist-read-collaborative user-library-read user-read-private'
					}
				}]
})
export class LandingComponent implements OnInit {
	
    ngOnInit(): void {
        console.log("init");
    }
	
	constructor(private spotifyService: SpotifyService) { }
	
	login(): void {
		this.spotifyService.login();
	}
	
}

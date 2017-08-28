import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ SpotifyService,{ 
				provide: "SpotifyConfig" , 
					useValue: {
						clientId: environment.spotifyConfig.clientId,
						redirectUri: environment.spotifyConfig.redirectUri,
						authToken: localStorage.getItem('angular2-spotify-token'),
						scope: environment.spotifyConfig.scope
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

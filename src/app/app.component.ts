import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
	loggedIn: boolean = !!localStorage.getItem('angular2-spotify-token');
	
    ngOnInit(): void {
		window.addEventListener('storage', this.storageChanged.bind(this), false);
		
    }
	
	
	storageChanged(e): void {
        this.loggedIn = (e.key === 'angular2-spotify-token' && e.newValue);
		this.router.navigateByUrl('/trackselection');
      };
     
    constructor(private router: Router) { }


}

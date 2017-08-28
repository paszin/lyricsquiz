import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'callbackpage',
  templateUrl: './callback.html',
  providers: []
})
export class CallbackComponent implements OnInit {
    ngOnInit(): void {
        console.log("callback");
		setTimeout(function() {
		var hash = window.location.hash;
      if (window.location.search.substring(1).indexOf("error") !== -1) {
        // login failure
        window.close();
      } else if (hash) {
        // login success
        var token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('angular2-spotify-token', token);
      }
			}, 1000);
    }
}

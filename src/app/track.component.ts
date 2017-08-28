import { Component, OnInit, Input } from '@angular/core';

import { Track } from './track';

@Component({
  selector: 'track',
  templateUrl: './track.html',
  providers: []
})
export class TrackComponent {
	 @Input() track: Track;
    
}

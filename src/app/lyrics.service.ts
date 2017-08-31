import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LyricsService {
    
    constructor(private http: Http) { }
    
    
    getServerLyrics(interpret: string, title: string) : Promise<string> {
        //
        const url = "https://api.lyrics.ovh/v1/" + interpret + "/" + title;
        return this.http.get(url)
             .toPromise()
             .then(this.extractLyrics)
             .catch(() => null); //return null if no lyrics found
        
    }
    
    extractLyrics(response): string {
        return JSON.parse(response._body).lyrics
    }
}

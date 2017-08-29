import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

const lyrics = `[Part 1]
Na, wie man eine Liebe maximal romantisch lebt, will jeder wissen, keiner hilft uns - Fairplay
Gott sei Dank gibt es Film und Fernseh'n - da, wo ich meine Bildung hernehm'
Glaub mir, das wird super für deine Story, habe schon den Grund
Weshalb du in deiner Jugendphase wutgeladen bist
Dein Papa kam nicht zu deinem Schultheaterstück
Bei mir finden wir schon was, wo der Schuh gerade drückt
Wir kennen uns seit x Jahren, du brauchst jetzt nix sagen
Ich wollt dich fragen: Wollen wir den nächsten Schritt wagen?

[Bridge]
Willst du mit mir Drogen nehmen?
Dann wird es rote Rosen regnen
Ich hab's in einer Soap gesehen
Willst du mit mir Drogen nehmen?

[Hook]
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Denn ein Wrack ist ein Ort, an dem ein Schatz schlummert

[Part 2]
Jetzt sind wir frei, chillen auf gigantischen Berggipfeln
Du musst dann sagen: „Keiner kann unsern Schmerz diggen.“
Wir sammeln erstmal fröhliche Kiffsonntage
Für die hituntermalte Schnittmontage
Komm schon, das wird romantisch
Wenn ich dich halte, damit du nicht auf den Klorand brichst
Dann verdienen wir ein Kerzenpaket
Für die erste WG auf 'nem Herren-WC
Eine herbstliche Szene, weil es passt
Und ich falle auf die Knie und hol' aus meiner Jacke eine kleine Schachtel - du weißt, was abgeht!

[Bridge]
Willst du mit mir Drogen nehmen?
Dann wird es rote Rosen regnen
Ich hab's in einer Soap gesehen
Willst du mit mir Drogen nehmen?

[Hook]
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Denn ein Wrack ist ein Ort, an dem ein Schatz schlummert

[Part 3]
Und dann brauchen wir epische Fights, wer das lausige H kriegt
Zuschauer: rauchende Babys
Sie werden nicht verwöhnt, die müssen Fertigsuppe löffeln
Und die spielen mit vom Körperbau entfernten Puppenköpfen
Du willst raus per klischeehafter Flucht in ein Landhaus
Ich brüll' dann sowas wie: „Gleich rutscht mir die Hand aus!
Du wirst mit den Kindern nirgendwo hinfahr'n!“
Ich werd' euch mit 'ner Axt durch ein Labyrinth jagen
Im Winter, weil ich das Bild feier
Mach unser Leben filmreifer als Til Schweiger
Es hat Action, Drama und Comedy
Also was sagst du, mon chéri?

[Bridge]
Willst du mit mir Drogen nehmen?
Dann wird es rote Rosen regnen
Um dem Kinofilm die Show zu stehlen
Willst du mit mir Drogen nehmen?

[Hook]
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter
Komm! Denn ein Wrack ist ein Ort, an dem ein Schatz schlummert

[Outro]
Komm, wir geeeh'n ... den Bach runter!
Komm, wir geeeh'n ... den Bach runter!
Komm, wir geeeh'n ... den Bach runter!
Komm, wir geh'n, komm, wir geh'n zusamm'n den Bach runter"
`;

@Injectable()
export class LyricsService {
    
    constructor(private http: Http) { }
    
    getLyrics(id): string {
        var title = "Willst du";
        //lyrics = lyrics.replace("\n\n", "\n");
        var lines = lyrics.split("\n");
        var part = lines[Math.trunc(Math.random()*lines.length)];

        return part;
    }
    
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

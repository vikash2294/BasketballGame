import { Injectable } from "@angular/core";
import { Observable, from, map } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NBATeamArray, Data } from "../interface";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private url: string = '';
    private httpOptions;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            })
        };
    }


    minusDays(days: number) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }
    getDate() {
        var s = "";
        var i;
        for (i = 1; i <= 12; i++) {
            s = s + "&dates[]=" + this.minusDays(i).toLocaleDateString("fr-CA");
        }
        return s;
    }

    getTeam(): Observable<NBATeamArray> {
        this.url = 'https://free-nba.p.rapidapi.com/teams';
        return this.http.get<NBATeamArray>(this.url, { headers: this.httpOptions.headers }).pipe(map(res => res));
    }
    getTeamDetails(teamId: number): Observable<Data> {
        this.url = `https://free-nba.p.rapidapi.com/games?page=0${this.getDate()}&per_page=12&team_ids[]=${teamId}`
        return this.http.get<Data>(this.url, { headers: this.httpOptions.headers }).pipe(map(res => res));
    }

}

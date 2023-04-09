import { Injectable } from "@angular/core";
import { Observable, from, map } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn:"root"  
})
export class ApiService {
    private url: string = '';
    private httpOptions;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers : new HttpHeaders({
                'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
              
            })
        };
    }

 getTeam(): Observable<any> {
        this.url = 'https://free-nba.p.rapidapi.com/teams';
        return this.http.get(this.url,{headers:this.httpOptions.headers}).pipe(map(res => res));
    }
getTeamDetails(teamId: number): Observable<any> {
    this.url = `https://free-nba.p.rapidapi.com/games?page=0&dates[]=2022-12-09&dates[]=2022-12-08&dates[]=2022-12-07&per_page=12&dates[]=2022-12-06&dates[]=2022-12-05&dates[]=2022-12-04&per_page=12&team_ids[]=${teamId}`
    return this.http.get(this.url,{headers: this.httpOptions.headers}).pipe(map(res => res));
}

getMatchDetails(teamId: number): Observable<any> {
    this.url = `https://free-nba.p.rapidapi.com/games?page=0&dates[]=2022-12-09&dates[]=2022-12-08&dates[]=2022-12-07&per_page=12&dates[]=2022-12-06&dates[]=2022-12-05&dates[]=2022-12-04&per_page=12&team_ids[]=${teamId}`
    return this.http.get(this.url,{headers: this.httpOptions.headers}).pipe(map(res => res));
}

}

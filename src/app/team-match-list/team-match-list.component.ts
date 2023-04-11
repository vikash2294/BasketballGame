import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';
import { ScoreTrackingService } from '../services/score.tracking.service';
import { NBADataArray, NBAGameData, NBAteam } from '../interface';

@Component({
  selector: 'team-match-list',
  templateUrl: './team-match-list.component.html',
  styleUrls: ['./team-match-list.component.css']
})
export class TeamMatchListComponent implements OnInit {

  constructor(private apiservice: ApiService, private scoreTrackingService: ScoreTrackingService) {}
 
  title = 'NBA Score Tracking App';
  selected: number = 0;
  teamData: string[] = [];
  wholeData: NBAteam[] = [];
  teamsMatchList: NBADataArray[] = [];
  averagevalue: number=0;

  ngOnInit(): void {
    this.apiservice.getTeam().subscribe(data => {
      if(data) {
        this.teamData = data.data.map((c: { name: string; }) => c.name);
        this.wholeData = data.data;
      }
    } );
    
  }
  
  teamWinLossDetail(res: NBADataArray): string[] {
    const winPoints = 'W';
    const lossPoints = 'L';
    const matchresult: string[]=[];
    res.data.forEach((ele: NBAGameData) => {
      
      if (ele.home_team_score > ele.visitor_team_score) {
        // If the team won at home
        matchresult.push(winPoints)
      } else {
        // If the team lost at home
        matchresult.push(lossPoints)
      }
    });
    return matchresult;
  }

  averageValue(res: NBADataArray): number {
    const homeTeamScores = res.data.map((ele: NBAGameData) => ele.home_team_score);
    const totalHomeTeamScores = homeTeamScores.reduce((sum: number, score: number) => sum + score, 0);
    return Math.floor(totalHomeTeamScores / homeTeamScores.length); 
  }
  averageConcededValue(res: NBADataArray): number {
    const visitorTeamScores = res.data.map((ele: NBAGameData) => ele.visitor_team_score);
    const totalVisitorTeamScores= visitorTeamScores.reduce((sum: number, score: number) => sum + score, 0);
    return Math.floor(totalVisitorTeamScores / visitorTeamScores.length); 
  }
  
  onChanged() {
    let isTrackexists;
    if (this.selected !== 0) {
      this.apiservice.getTeamDetails(this.selected).subscribe(response => {
        if (response) {
        let resData = response.data[0];
        resData.selectedTeam = this.scoreTrackingService.selectHomeTeam(response, this.selected);
        resData.matchresult = this.teamWinLossDetail(response);
        resData.averageValue = this.averageValue(response);
        resData.averageConcededValue = this.averageConcededValue(response);
          isTrackexists = this.teamsMatchList.findIndex(track => track.id === resData.id);
          if(isTrackexists === -1)
            this.teamsMatchList.push(resData);
        }
      });
    }
  }
  trackByFn(index:number) {
    return index; // or item.id
  }
  removeTeam(teamTrackId: number){

    this.teamsMatchList = this.teamsMatchList.filter( track => track.id != teamTrackId);
  }

  viewGameResults(teamTrackId: number){
    this.apiservice.getTeamDetails(teamTrackId).subscribe(data => {
    });
  }

}

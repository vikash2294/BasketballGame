import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';
import { ScoreTrackingService } from '../services/score.tracking.service';
import { Data, Result, Team } from '../interface';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'team-match-list',
  templateUrl: './team-match-list.component.html',
  styleUrls: ['./team-match-list.component.css']
})
export class TeamMatchListComponent implements OnInit {

  constructor(private apiservice: ApiService,
    private loader: LoadingService,
    private scoreTrackingService: ScoreTrackingService) {
      window.onbeforeunload = function() {
        localStorage.clear();
        return '';
      }
     }

  title = 'NBA Score Tracking App';
  selected: number = 0;
  teamData: string[] = [];
  wholeData: Team[] = [];
  teamsMatchList: Result[] = [];
  averagevalue: number = 0;

  ngOnInit(): void {
    let teamDetailsItem = localStorage.getItem('teamDetails');
    if (teamDetailsItem) {
      this.loader.requestStarted();
      this.teamsMatchList = JSON.parse(teamDetailsItem);
      this.loader.requestEnded();
    }
    this.apiservice.getTeam().subscribe(data => {
      if (data) {
        this.teamData = data.data.map((c: { name: string; }) => c.name);
        this.wholeData = data.data;
      }
    });

  }

  teamWinLossDetail(res: Data): string[] {
    const winPoints = 'W';
    const lossPoints = 'L';
    const matchresult: string[] = [];
    res.data.forEach((ele: Result) => {
      if (ele.home_team_score > ele.visitor_team_score) {
        matchresult.push(winPoints)
      } else {
        matchresult.push(lossPoints)
      }
    });
    return matchresult;
  }

  averageValue(res: Data): number {
    const homeTeamScores = res.data.map((ele: Result) => ele.home_team_score);
    const totalHomeTeamScores = homeTeamScores.reduce((sum: number, score: number) => sum + score, 0);
    return Math.floor(totalHomeTeamScores / homeTeamScores.length);
  }
  averageConcededValue(res: Data): number {
    const visitorTeamScores = res.data.map((ele: Result) => ele.visitor_team_score);
    const totalVisitorTeamScores = visitorTeamScores.reduce((sum: number, score: number) => sum + score, 0);
    return Math.floor(totalVisitorTeamScores / visitorTeamScores.length);
  }

  onChanged() {
    let isTrackexists;
    if (this.selected !== 0) {
      this.apiservice.getTeamDetails(this.selected).subscribe((response) => {
        if (response) {
          let resData = response.data[0];
          resData.selectedTeam = this.scoreTrackingService.selectHomeTeam(response, this.selected);
          resData.matchresult = this.teamWinLossDetail(response);
          resData.averageValue = this.averageValue(response);
          resData.averageConcededValue = this.averageConcededValue(response);
          isTrackexists = this.teamsMatchList.findIndex(track => track.id === resData.id);
          if (isTrackexists === -1)
            this.teamsMatchList.push(resData);
        }
        localStorage.setItem(
          'teamDetails',
          JSON.stringify(this.teamsMatchList)
        );
      });
    }
  }
  trackByFn(index: number) {
    return index;
  }
  removeTeam(teamTrackId: number) {

    this.teamsMatchList = this.teamsMatchList.filter(track => track.id != teamTrackId);
    localStorage.setItem(
      'teamDetails',
      JSON.stringify(this.teamsMatchList)
    );
  }

  viewGameResults(teamTrackId: number) {
    this.apiservice.getTeamDetails(teamTrackId).subscribe(data => {
    });
  }

}

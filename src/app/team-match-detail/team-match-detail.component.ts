import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.services';
import { ScoreTrackingService } from '../services/score.tracking.service';
import { Result } from '../interface';

@Component({
  selector: 'team-match-detail',
  templateUrl: './team-match-detail.component.html',
  styleUrls: ['./team-match-detail.component.css']
})
export class TeamMatchDetailComponent implements OnInit {
  teamCode: number = 0;
  teamResult: Result[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiservice: ApiService,
    private scoreTrackingService: ScoreTrackingService
  ) { }

  ngOnInit() {
    const teamCode = this.route.snapshot.paramMap.get('teamCode');

    this.apiservice.getTeamDetails(Number(teamCode)).subscribe(response => {
      if (response && response.data) {
        this.teamResult= response.data;
        let resData = response.data[0];
        resData.selectedTeam = this.scoreTrackingService.selectHomeTeam(response, Number(teamCode))
      }
    });

  }

  backTOMatchList() {
    this.router.navigate(['']);
  }

}
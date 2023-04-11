import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.services';
import { ScoreTrackingService } from '../services/score.tracking.service';
import { Result } from '../interface';
import { LoadingService } from '../services/loading.service';

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
    private loader: LoadingService,
    private scoreTrackingService: ScoreTrackingService
  ) { }

  // ngOnInit() {
  //   const teamCode = this.route.snapshot.paramMap.get('teamCode');

  //   this.apiservice.getTeamDetails(Number(teamCode)).subscribe(response => {
  //     if (response && response.data) {
  //       this.loader.requestStarted();
  //       this.teamResult= response.data;
  //       setTimeout(() => {
  //         this.loader.requestEnded();
  //       }, 400);
  //       let resData = response.data[0];
  //       resData.selectedTeam = this.scoreTrackingService.selectHomeTeam(response, Number(teamCode))
        
  //     }
  //   });

  // }
  ngOnInit() {
    const teamCode = this.route.snapshot.paramMap.get('teamCode');
  
    // Start the loader
    this.loader.requestStarted();
  
    this.apiservice.getTeamDetails(Number(teamCode)).subscribe(response => {
      if (response && response.data) {
        this.teamResult = response.data;
        let resData = response.data[0];
        resData.selectedTeam = this.scoreTrackingService.selectHomeTeam(response, Number(teamCode));
      }
      
      // End the loader after a delay of 400 milliseconds
      setTimeout(() => {
        this.loader.requestEnded();
      }, 400);
    }, error => {
      // Handle error in case of API call failure
      console.error('Failed to fetch team details:', error);
      // End the loader on error
      this.loader.requestEnded();
    });
  }
 
  backTOMatchList() {
    this.router.navigate(['']);
  }

}
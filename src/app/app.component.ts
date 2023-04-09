import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiservice: ApiService) { }
 
  title = 'NBA Score Tracking App';
  selected = 0;
  teamData: string[] = [];
  wholeData: any;
  teamsMatchList: any[] = [];
  averagevalue: number=0;
  ngOnInit(): void {
    this.apiservice.getTeam().subscribe(data => {
      if(data) {
        this.teamData = data.data.map((c: { name: string; }) => c.name);
        console.log(this.teamData);
        console.log(data);
        this.wholeData = data;
        console.log(this.wholeData.data);
      }
    } );
  }
  // getTeamData(): void {
  //   this.apiservice.getTeam().subscribe(data => {
  //     if(data) {
  //       //this.teamData = data;
  //       console.log(data);
  //     }
  //   } );
  // }

    
  // onChanged(){
  //   //alert(JSON.stringify(value//));
  //   const object =  this.wholeData.data.find((c: { name: string; }) => c.name === this.selected);
  //   console.log(this.selected);
  //   console.log(object.id);
  //   this.apiservice.getTeamresult(object.id).subscribe(data => {
  //     if(data) {
  //       // this.teamData = data.data.map((c: { name: string; }) => c.name);
  //       // console.log(this.teamData);
  //       console.log(data);
  //       // this.wholeData = data;
  //       // console.log(this.wholeData.data);
  //     }
  //   } );
  // }
  onChanged() {
    //alert(JSON.stringify(value//));
    let isTrackexists;
    console.log(this.selected);
    if (this.selected !== 0) {
      this.apiservice.getTeamDetails(this.selected).subscribe(data => {
        if (data) {
          //this.teamData = data;
          console.log(data);
          isTrackexists = this.teamsMatchList.findIndex(track => track.id === data.data[0].id);
          console.log("--->"+data.data[0].id);
          if(isTrackexists === -1)
            this.teamsMatchList.push(data.data[0]);
        }
      });
    }
  }

  removeTeam(teamTrackId: number){
    console.log(teamTrackId);

    this.teamsMatchList = this.teamsMatchList.filter( track => track.id != teamTrackId);
  }

  viewGameResults(teamTrackId: number){
    this.apiservice.getMatchDetails(teamTrackId).subscribe(data => {
      if (data) {
        //this.teamData = data;
        console.log(data);
      }
    });
  }
}


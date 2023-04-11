import { Injectable } from "@angular/core";
import { NBADataArray, NBAGameData, TeamDetail, Type } from "../interface";

@Injectable({
  providedIn:"root"  
})
export class ScoreTrackingService {
selectHomeTeam(response: NBADataArray, selected: number) {
    const selectedTeam: TeamDetail[]=[]
    response.data.forEach((data: NBAGameData)=>{
      const homeId = data.home_team.id
      if(Number(selected) === homeId){
        selectedTeam.push(data.home_team)
      }
  })
  return selectedTeam
  }
}

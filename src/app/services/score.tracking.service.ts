import { Injectable } from "@angular/core";
import { Data, Result, Team } from "../interface";

@Injectable({
  providedIn: "root"
})
export class ScoreTrackingService {
  selectHomeTeam(response: Data, selected: number) {
    const selectedTeam: Team[] = []
    response.data.forEach((data: Result) => {
      const homeId = data.home_team.id
      if (Number(selected) === homeId) {
        selectedTeam.push(data.home_team)
      }
    })
    return selectedTeam
  }
}

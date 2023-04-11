export interface Data {
  data: Result[];
  id?: number
}

export interface Result {
  id: number;
  data: [];
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
  selectedTeam: Team[];
  matchresult: Array<string>;
  averageValue: number;
  averageConcededValue: number;
}
export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface NBATeamArray {
  data: Team[];
}
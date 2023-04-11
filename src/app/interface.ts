export interface Data{
    data: Array<Type>
}

export interface Type {
    averageValue: number;
    averageConcededValue: number;
    date: Date;
    home_team: TeamDetail;
    home_team_score:number;
    id: number;
    matchresult: Array<string>;
    period: number;
    postseason: boolean;
    season: number;
    visitor_team:TeamDetail;
    status: string;
    time: string;
}

export interface TeamDetail{
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    id:number
    name: string
}

// export interface ScoringData {
//     abbreviation: string
//     city: string
//     conference:string
//     divisio: string
//     full_name: string
//     id: number
//     name: string
// }
export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  }
  
  export interface Result {
    id: number;
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
    selectedTeam?: Team[]; // Optional property
  }
  
  export interface NBADataArray {
    id: number;
    data: NBAGameData[];
    home_team: NBAteam;
    selectedTeam: NBAteam[];
    matchresult:  Array<string>;
    averageValue: number;
    averageConcededValue: number;
    visitor_team_score: number;
  }
  
  export interface NBAteam {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  }
  export interface NBAGameData {
    id: number;
    date: string;
    home_team: NBAteam;
    home_team_score: number;
    visitor_team_score: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: NBAteam;
    selectedTeam?: NBAteam[];
    matchresult?: string[];
    averageValue?: number;
    averageConcededValue?: number;
  }


  export interface NBATeamArray {
    data: NBAteam[];
  }
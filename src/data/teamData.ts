export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  portrait?: string;
  bio?: string;
  experienceYears?: number;
  languages?: string[];
  certificates?: string[];
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let TEAM_DATA: TeamMember[] = [];

export function syncTeamDataFromApi(liveTeam: TeamMember[]) {
  if (Array.isArray(liveTeam)) {
    TEAM_DATA.splice(0, TEAM_DATA.length, ...liveTeam);
  }
}

import Constructor from "./Constructor";

export interface ConstructorStandings {
    position: string; // TODO: number
    positionText: string; // TODO: number
    points: string; // TODO: number
    wins: string; // TODO: number
    Constructor: Constructor; // TODO: constructor
}

export interface ConstructorStandingsResponse {
    season: string; // TODO: number
    round: string; // TODO: number
    constructorStandings: ConstructorStandings[];
}

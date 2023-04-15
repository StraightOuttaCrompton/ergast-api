import Constructor from "./Constructor.dto";

export class ConstructorStandings {
    position: string; // TODO: number
    positionText: string; // TODO: number
    points: string; // TODO: number
    wins: string; // TODO: number
    Constructor: Constructor; // TODO: constructor

    constructor(constructorStandings: ConstructorStandings) {
        Object.assign(this, constructorStandings);
    }
}

export class ConstructorStandingsResponse {
    season: string; // TODO: number
    round: string; // TODO: number
    constructorStandings: ConstructorStandings[];

    constructor(constructorStandingsResponse: ConstructorStandingsResponse) {
        Object.assign(this, constructorStandingsResponse);
    }
}

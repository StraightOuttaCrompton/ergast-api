import Constructor from "./Constructor.dto";

export class ConstructorStandings {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Constructor: Constructor;

    constructor(constructorStandings: ConstructorStandings) {
        Object.assign(this, constructorStandings);
    }
}

export class ConstructorStandingsResponse {
    season: string;
    round: string;
    constructorStandings: ConstructorStandings[];

    constructor(constructorStandingsResponse: ConstructorStandingsResponse) {
        Object.assign(this, constructorStandingsResponse);
    }
}

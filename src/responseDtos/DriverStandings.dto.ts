import Driver from "./Driver.dto";

export class DriverStandings {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: Driver;

    constructor(driverStandings: DriverStandings) {
        Object.assign(this, driverStandings);
    }
}

export class DriverStandingsResponse {
    season: string;
    round: string;
    driverStandings: DriverStandings[];

    constructor(driverStandingsResponse: DriverStandingsResponse) {
        Object.assign(this, driverStandingsResponse);
    }
}

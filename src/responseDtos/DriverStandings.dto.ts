import Driver from "./Driver.dto";

export class DriverStandings {
    position: string; // TODO: number
    positionText: string; // TODO: number
    points: string; // TODO: number
    wins: string; // TODO: number
    Driver: Driver; // TODO: driver

    constructor(driverStandings: DriverStandings) {
        Object.assign(this, driverStandings);
    }
}

export class DriverStandingsResponse {
    season: string; // TODO: number
    round: string; // TODO: number
    driverStandings: DriverStandings[];

    constructor(driverStandingsResponse: DriverStandingsResponse) {
        Object.assign(this, driverStandingsResponse);
    }
}

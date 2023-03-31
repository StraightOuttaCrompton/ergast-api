import Driver from "./Driver";

export interface DriverStandings {
    position: string; // TODO: number
    positionText: string; // TODO: number
    points: string; // TODO: number
    wins: string; // TODO: number
    Driver: Driver; // TODO: driver
}

export interface DriverStandingsResponse {
    season: string; // TODO: number
    round: string; // TODO: number
    driverStandings: DriverStandings[];
}

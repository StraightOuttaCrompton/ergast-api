import { Circuit } from "./Circuit.dto";

export class PitstopsResponse {
    url: string;
    raceName: string;
    date: string; // TODO: Date
    time: string; // TODO: Date
    Circuit: Circuit;
    PitStops: Pitstop[];

    constructor(pitstopsResponse: PitstopsResponse) {
        Object.assign(this, pitstopsResponse);
    }
}

export class Pitstop {
    driverId: string;
    lap: string; // TODO: number
    stop: string; // TODO: number
    time: string; // TODO: Date
    duration: string; // TODO: number miliseconds

    constructor(pitstop: Pitstop) {
        Object.assign(this, pitstop);
    }
}

import { Circuit } from "./Circuit.dto";

export class PitstopsResponse {
    url: string;
    raceName: string;
    date: string;
    time: string;
    Circuit: Circuit;
    PitStops: Pitstop[];

    constructor(pitstopsResponse: PitstopsResponse) {
        Object.assign(this, pitstopsResponse);
    }
}

export class Pitstop {
    driverId: string;
    lap: string;
    stop: string;
    time: string;
    duration: string;

    constructor(pitstop: Pitstop) {
        Object.assign(this, pitstop);
    }
}
